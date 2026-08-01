import { MongoClient, type Db } from "mongodb";

/**
 * Serverless-safe MongoDB connection.
 *
 * On Vercel every request can spin up a fresh function instance. Without
 * caching the client on the global object, each invocation would open a new
 * connection and quickly exhaust Atlas's connection limit (M0 caps at ~500).
 * We cache the *promise* so concurrent cold-start requests share one connect.
 */
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "lighthouse";

if (!uri) {
  // Don't throw at import time — let the route surface a clean error instead,
  // so `next build` (which evaluates modules) doesn't hard-fail without env.
  console.warn("[db] MONGODB_URI is not set — database calls will fail until it is configured.");
}

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function clientPromise(): Promise<MongoClient> {
  if (!uri) throw new Error("MONGODB_URI is not configured.");
  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      // Fail fast instead of hanging. The driver defaults to a 30s server
      // selection window, and a stalled SRV/DNS lookup stacks on top of that —
      // which turns a brief network blip into multi-minute page loads while
      // every server component waits its turn. Callers already fall back to
      // static content on error, so a quick failure renders far better than a hang.
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    // Never cache a *rejected* connection promise. Caching the promise is what
    // lets concurrent cold-start requests share one connect, but if that first
    // connect fails (DNS blip, Atlas briefly unreachable) the rejection would
    // otherwise be replayed to every later request until the process restarts.
    // Clearing it here lets the next request retry a fresh connection.
    const pending: Promise<MongoClient> = client.connect().catch((err) => {
      if (globalForMongo._mongoClientPromise === pending) {
        globalForMongo._mongoClientPromise = undefined;
      }
      throw err;
    });
    globalForMongo._mongoClientPromise = pending;
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise();
  return client.db(dbName);
}
