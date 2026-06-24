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
    const client = new MongoClient(uri, { maxPoolSize: 10 });
    globalForMongo._mongoClientPromise = client.connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise();
  return client.db(dbName);
}
