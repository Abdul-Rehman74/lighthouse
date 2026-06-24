"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  Submission,
  SubmissionStatus,
  Photo,
  PhotoCategory,
  Testimonial,
  AdminSettings,
  Package,
} from "@/lib/admin-data";
import { type VideoRef, parseVideoLink } from "@/lib/video";
import { LighthouseMark, Icons, KPI_ICONS, PlayIcon, StarIcon, HomeIcon } from "./icons";
import * as actions from "./actions";

const CLOUDINARY_ENABLED = !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/** Upload a video file straight to Cloudinary using a server-signed request. */
async function uploadVideoToCloudinary(file: File, onProgress: (pct: number) => void): Promise<VideoRef> {
  const sig = await actions.getUploadSignature();
  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", sig.apiKey);
  fd.append("timestamp", String(sig.timestamp));
  fd.append("folder", sig.folder);
  fd.append("signature", sig.signature);

  const json = await new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${sig.cloudName}/video/upload`);
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve(res);
        else reject(new Error(res?.error?.message || "Upload failed"));
      } catch {
        reject(new Error("Upload failed"));
      }
    };
    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.send(fd);
  });

  return {
    type: "cloudinary",
    url: json.secure_url,
    posterUrl: typeof json.secure_url === "string" ? json.secure_url.replace(/\.[a-z0-9]+$/i, ".jpg") : undefined,
    publicId: json.public_id,
  };
}

/* ----------------------------- constants & helpers ----------------------------- */

const AV = ["#FFD23F", "#FF9E7B", "#8FD4AC", "#5FB3F0", "#FFB3A6", "#CDE8FB", "#FBE08A"];
const avColor = (s: string) => AV[[...(s || "?")].reduce((a, c) => a + c.charCodeAt(0), 0) % AV.length];
const initials = (n: string) =>
  (n || "?").trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

const STATUSES: Record<SubmissionStatus, { label: string; dot: string; cls: string }> = {
  new: { label: "New", dot: "#1769a8", cls: "st-new" },
  contacted: { label: "Contacted", dot: "#8a6a00", cls: "st-contacted" },
  booked: { label: "Booked", dot: "#1f7a52", cls: "st-booked" },
  closed: { label: "Closed", dot: "#76716a", cls: "st-closed" },
};
const STATUS_KEYS = Object.keys(STATUSES) as SubmissionStatus[];

const CATS: Record<PhotoCategory, string> = {
  Play: "#FFD23F",
  Learning: "#5FB3F0",
  Outdoor: "#8FD4AC",
  Meals: "#FF9E7B",
  Art: "#F0514F",
  Naps: "#B8A6E8",
};
const CAT_KEYS = Object.keys(CATS) as PhotoCategory[];

const DAY_MS = 864e5;
const daysAgo = (n: number) => Date.now() - n * DAY_MS;
const timeAgo = (ts: number) => {
  const d = Math.floor((Date.now() - ts) / DAY_MS);
  if (d <= 0) return "Today";
  if (d === 1) return "Yesterday";
  return d + "d ago";
};
const waLink = (phone: string) => `https://wa.me/${phone.replace(/[^0-9]/g, "")}`;

type View = "dashboard" | "submissions" | "gallery" | "testimonials" | "packages" | "settings";
const NAV: { v: View; label: string; hand: string; icon: React.ReactNode }[] = [
  { v: "dashboard", label: "Dashboard", hand: "welcome back ✿", icon: Icons.dashboard },
  { v: "submissions", label: "Submissions", hand: "trial bookings", icon: Icons.submissions },
  { v: "gallery", label: "Gallery", hand: "photo manager", icon: Icons.gallery },
  { v: "testimonials", label: "Testimonials", hand: "parents say", icon: Icons.testimonials },
  { v: "packages", label: "Packages", hand: "pricing", icon: Icons.packages },
  { v: "settings", label: "Settings", hand: "preferences", icon: Icons.settings },
];

const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2MB per photo (stored as base64 in MongoDB)

interface Props {
  initialSubmissions: Submission[];
  initialPhotos: Photo[];
  initialTestimonials: Testimonial[];
  initialSettings: AdminSettings;
}

type DrawerState =
  | { kind: "submission"; id: string }
  | { kind: "testimonial"; id: string | null }
  | null;

export function AdminApp({ initialSubmissions, initialPhotos, initialTestimonials, initialSettings }: Props) {
  const router = useRouter();
  const [subs, setSubs] = useState(initialSubmissions);
  const [photos, setPhotos] = useState(initialPhotos);
  const [testis, setTestis] = useState(initialTestimonials);
  const [settings, setSettings] = useState(initialSettings);

  const [view, setView] = useState<View>("dashboard");
  const [layout, setLayoutState] = useState<"sidebar" | "topnav">(initialSettings.layout);
  const [navOpen, setNavOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [drawer, setDrawer] = useState<DrawerState>(null);

  const [subFilter, setSubFilter] = useState<"all" | SubmissionStatus>("all");
  const [subQuery, setSubQuery] = useState("");
  const [galFilter, setGalFilter] = useState<"All" | PhotoCategory>("All");

  const toastTimer = useRef<ReturnType<typeof setTimeout>>();
  const showToast = (msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  // grow-in animation for charts
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (view === "dashboard") {
      setAnimate(false);
      const r = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(r);
    }
  }, [view, subs, photos]);

  const goto = (v: View) => {
    setView(v);
    setNavOpen(false);
    window.scrollTo(0, 0);
  };

  const setLayout = (l: "sidebar" | "topnav") => {
    setLayoutState(l);
    setSettings((s) => ({ ...s, layout: l }));
    actions.saveSettings({ layout: l }).catch(() => showToast("Couldn't save layout"));
  };

  const newCount = subs.filter((s) => s.status === "new").length;
  const meta = NAV.find((n) => n.v === view)!;

  /* ----------------------------- submissions ----------------------------- */

  const changeStatus = (id: string, status: SubmissionStatus) => {
    setSubs((arr) => arr.map((s) => (s.id === id ? { ...s, status } : s)));
    actions.saveSubmission(id, { status }).catch(() => showToast("Couldn't update status"));
  };

  const exportCsv = () => {
    const head = ["Parent", "Child", "Age", "Preferred date", "WhatsApp", "Package", "Status", "Notes", "Received"];
    const esc = (v: unknown) => '"' + String(v ?? "").replace(/"/g, '""') + '"';
    const rows = subs.map((s) =>
      [s.parent, s.child, s.age, s.date, s.phone, s.package, STATUSES[s.status].label, s.notes, new Date(s.ts).toLocaleDateString("en-GB")]
        .map(esc)
        .join(","),
    );
    const csv = head.map(esc).join(",") + "\n" + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "lighthouse-submissions.csv";
    a.click();
    URL.revokeObjectURL(a.href);
    showToast("CSV exported");
  };

  /* ----------------------------- gallery ----------------------------- */

  const fileInput = useRef<HTMLInputElement>(null);
  const [dragOverDrop, setDragOverDrop] = useState(false);
  const dragId = useRef<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const addFiles = (files: FileList | File[]) => {
    const imgs = [...files].filter((f) => f.type.startsWith("image/"));
    if (!imgs.length) return;
    let tooBig = 0;
    imgs.forEach((f) => {
      if (f.size > MAX_IMAGE_BYTES) {
        tooBig++;
        return;
      }
      const r = new FileReader();
      r.onload = async (e) => {
        const src = String(e.target?.result || "");
        const cap = f.name.replace(/\.[^.]+$/, "").slice(0, 40);
        try {
          const id = await actions.createPhoto({ src, cat: "Play", cap });
          setPhotos((arr) => [{ id, src, cat: "Play", cap, featured: false, home: false, order: -Date.now(), ts: Date.now() }, ...arr]);
        } catch {
          showToast("Upload failed");
        }
      };
      r.readAsDataURL(f);
    });
    const ok = imgs.length - tooBig;
    if (ok > 0) showToast(`${ok} photo${ok > 1 ? "s" : ""} uploaded`);
    if (tooBig > 0) showToast(`${tooBig} file${tooBig > 1 ? "s" : ""} skipped (over 2MB)`);
  };

  const toggleFeatured = (id: string) => {
    let next = false;
    setPhotos((arr) => arr.map((p) => (p.id === id ? ((next = !p.featured), { ...p, featured: next }) : p)));
    actions.savePhoto(id, { featured: next }).catch(() => showToast("Couldn't update"));
  };
  const toggleHome = (id: string) => {
    let next = false;
    setPhotos((arr) => arr.map((p) => (p.id === id ? ((next = !p.home), { ...p, home: next }) : p)));
    actions.savePhoto(id, { home: next }).catch(() => showToast("Couldn't update"));
    showToast(next ? "Added to home page" : "Removed from home page");
  };
  const editCaption = (id: string, cap: string) => {
    setPhotos((arr) => arr.map((p) => (p.id === id ? { ...p, cap } : p)));
  };
  const commitCaption = (id: string, cap: string) => {
    actions.savePhoto(id, { cap }).catch(() => showToast("Couldn't save caption"));
  };
  const changeCat = (id: string, cat: PhotoCategory) => {
    setPhotos((arr) => arr.map((p) => (p.id === id ? { ...p, cat } : p)));
    actions.savePhoto(id, { cat }).catch(() => showToast("Couldn't update"));
  };
  const deletePhoto = (id: string) => {
    setPhotos((arr) => arr.filter((p) => p.id !== id));
    actions.removePhoto(id).catch(() => showToast("Couldn't delete"));
    showToast("Photo deleted");
  };
  const onDrop = (targetId: string) => {
    const from = photos.findIndex((p) => p.id === dragId.current);
    const to = photos.findIndex((p) => p.id === targetId);
    setOverId(null);
    setDragging(null);
    if (from < 0 || to < 0 || from === to) return;
    const next = [...photos];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    setPhotos(next);
    actions.savePhotoOrder(next.map((p) => p.id)).catch(() => showToast("Couldn't save order"));
    showToast("Order updated");
  };

  /* ----------------------------- testimonials ----------------------------- */

  const deleteTesti = (id: string) => {
    setTestis((arr) => arr.filter((t) => t.id !== id));
    actions.removeTestimonial(id).catch(() => showToast("Couldn't remove"));
    showToast("Removed");
  };

  /* ----------------------------- settings ----------------------------- */

  const [newPw, setNewPw] = useState("");
  const [setName, setSetName] = useState(initialSettings.name);
  const [setPhone, setSetPhone] = useState(initialSettings.phone);
  const [emails, setEmails] = useState<string[]>(
    initialSettings.notifyEmails?.length ? initialSettings.notifyEmails : [""],
  );
  const [setIg, setSetIg] = useState(initialSettings.social?.instagram ?? "");
  const [setFb, setSetFb] = useState(initialSettings.social?.facebook ?? "");
  const [pkgs, setPkgs] = useState<Package[]>(initialSettings.packages ?? []);
  const [pkgNote, setPkgNote] = useState(initialSettings.packagesNote ?? "");

  const updatePkg = (i: number, patch: Partial<Package>) =>
    setPkgs((arr) => arr.map((p, j) => (j === i ? { ...p, ...patch } : p)));
  const addPkg = () =>
    setPkgs((arr) => [
      ...arr,
      { id: `pkg-${Date.now()}`, label: "New package", hours: "8 — 3", sub: "", price: "0", features: [], highlight: false },
    ]);
  const removePkg = (i: number) => setPkgs((arr) => arr.filter((_, j) => j !== i));
  const movePkg = (i: number, dir: -1 | 1) =>
    setPkgs((arr) => {
      const j = i + dir;
      if (j < 0 || j >= arr.length) return arr;
      const next = [...arr];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  const savePackages = () => {
    setSettings((s) => ({ ...s, packages: pkgs, packagesNote: pkgNote }));
    actions
      .saveSettings({ packages: pkgs, packagesNote: pkgNote })
      .then(() => showToast("Packages saved"))
      .catch(() => showToast("Couldn't save"));
  };

  const saveInfo = () => {
    setSettings((s) => ({ ...s, name: setName, phone: setPhone }));
    actions.saveSettings({ name: setName, phone: setPhone }).then(() => showToast("Details saved")).catch(() => showToast("Couldn't save"));
  };

  const saveSocial = () => {
    const social = { instagram: setIg.trim(), facebook: setFb.trim() };
    setSettings((s) => ({ ...s, social }));
    actions.saveSettings({ social }).then(() => showToast("Social links saved")).catch(() => showToast("Couldn't save"));
  };

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const setEmailAt = (i: number, v: string) => setEmails((arr) => arr.map((e, j) => (j === i ? v : e)));
  const addEmail = () => setEmails((arr) => (arr.length >= 5 ? arr : [...arr, ""]));
  const removeEmail = (i: number) => setEmails((arr) => (arr.length <= 1 ? [""] : arr.filter((_, j) => j !== i)));
  const saveEmails = () => {
    const cleaned = Array.from(
      new Set(emails.map((e) => e.trim().toLowerCase()).filter((e) => EMAIL_RE.test(e))),
    );
    setEmails(cleaned.length ? cleaned : [""]);
    setSettings((s) => ({ ...s, notifyEmails: cleaned }));
    actions
      .saveSettings({ notifyEmails: cleaned })
      .then(() => showToast(cleaned.length ? "Notification emails saved" : "Cleared — using server default"))
      .catch(() => showToast("Couldn't save"));
  };
  const savePw = async () => {
    const res = await actions.changePassword(newPw);
    if (res.ok) {
      setNewPw("");
      showToast("Password updated");
    } else showToast(res.error || "Couldn't update");
  };

  const doLogout = async () => {
    await actions.logout();
    router.replace("/admin/login");
    router.refresh();
  };

  /* ----------------------------- dashboard derived ----------------------------- */

  const booked = subs.filter((s) => s.status === "booked").length;
  const weekCount = subs.filter((s) => s.ts > daysAgo(7)).length;
  const kpis = [
    { v: subs.length, l: "Total requests", tr: "+" + weekCount + " this week", cls: "up", bg: "#FFF3CC", fg: "#a8860f", ic: KPI_ICONS.total },
    { v: newCount, l: "New & unhandled", tr: "needs reply", cls: "flat", bg: "#D3E9FB", fg: "#1769a8", ic: KPI_ICONS.pulse },
    { v: booked, l: "Trials booked", tr: "confirmed", cls: "up", bg: "#D6EFDF", fg: "#1f7a52", ic: KPI_ICONS.booked },
    { v: photos.length, l: "Gallery photos", tr: photos.filter((p) => p.featured).length + " featured", cls: "flat", bg: "#FFE0D6", fg: "#c2502f", ic: KPI_ICONS.photos },
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekBars: { c: number; lab: string }[] = [];
  for (let i = 6; i >= 0; i--) {
    const t = new Date(daysAgo(i)).toDateString();
    const c = subs.filter((s) => new Date(s.ts).toDateString() === t).length;
    weekBars.push({ c, lab: dayNames[new Date(daysAgo(i)).getDay()] });
  }
  const barMax = Math.max(1, ...weekBars.map((b) => b.c));

  const donutTotal = subs.length || 1;
  const R = 54;
  const C = 2 * Math.PI * R;
  let acc = 0;
  const donutSegs = STATUS_KEYS.map((k) => {
    const n = subs.filter((s) => s.status === k).length;
    const dash = (n / donutTotal) * C;
    const seg = { k, n, dash, offset: -acc };
    acc += dash;
    return seg;
  });

  const galMax = Math.max(1, ...CAT_KEYS.map((c) => photos.filter((p) => p.cat === c).length));

  const recent = [...subs].sort((a, b) => b.ts - a.ts).slice(0, 5);

  /* ----------------------------- nav rendering ----------------------------- */

  const NavButtons = ({ top }: { top: boolean }) => (
    <>
      {NAV.map((n) => (
        <button key={n.v} className={`navitem${n.v === view ? " on" : ""}`} onClick={() => goto(n.v)}>
          {n.icon}
          {n.label}
          {n.v === "submissions" && newCount > 0 && <span className="badge">{newCount}</span>}
        </button>
      ))}
    </>
  );

  /* ----------------------------- views ----------------------------- */

  const filteredSubs = subs
    .filter((s) => subFilter === "all" || s.status === subFilter)
    .filter((s) => {
      if (!subQuery) return true;
      const q = subQuery.toLowerCase();
      return (s.parent + s.child + s.phone).toLowerCase().includes(q);
    })
    .sort((a, b) => b.ts - a.ts);

  const subChipCounts: Record<string, number> = { all: subs.length };
  STATUS_KEYS.forEach((k) => (subChipCounts[k] = subs.filter((s) => s.status === k).length));

  const visiblePhotos = galFilter === "All" ? photos : photos.filter((p) => p.cat === galFilter);

  return (
    <div id="app" data-layout={layout} className={navOpen ? "navopen" : undefined}>
      <div id="scrim" onClick={() => setNavOpen(false)} />

      <aside id="sidebar">
        <div className="sb-brand">
          <LighthouseMark width={34} height={40} id="lgSide" />
          <div className="wm">
            Lighthouse<small>Admin Panel</small>
          </div>
        </div>
        <div className="sb-sec">Manage</div>
        <nav>
          <NavButtons top={false} />
        </nav>
        <div className="sb-foot">
          <div className="sb-user">
            <div className="av">AD</div>
            <div className="nm">
              Admin<small>{settings.name}</small>
            </div>
          </div>
          <button className="navitem" onClick={doLogout}>
            {Icons.logout}Log out
          </button>
        </div>
      </aside>

      <div id="main">
        <header id="topbar">
          <button className="menu iconbtn" style={{ border: 0, background: "transparent" }} onClick={() => setNavOpen((o) => !o)}>
            {Icons.menu}
          </button>
          <div className="tb-title">
            <span className="hand">{meta.hand}</span>
            <h1>{meta.label}</h1>
          </div>
          <nav id="topnav">
            <NavButtons top />
          </nav>
          <div className="tb-right">
            <a className="iconbtn" href="/" target="_blank" title="View live site">
              {Icons.external}
            </a>
            <button className="iconbtn" title="Switch layout" onClick={() => setLayout(layout === "sidebar" ? "topnav" : "sidebar")}>
              {Icons.layout}
            </button>
            <div className="tb-av">AD</div>
          </div>
        </header>

        <main id="content">
          {/* ---------------- DASHBOARD ---------------- */}
          {view === "dashboard" && (
            <section>
              <div className="kpis">
                {kpis.map((k, i) => (
                  <div className="card kpi" key={i}>
                    <div className="ic" style={{ background: k.bg, color: k.fg }}>
                      {k.ic}
                    </div>
                    <div className="v">{k.v}</div>
                    <div className="l">{k.l}</div>
                    <div className={`tr ${k.cls}`}>{k.tr}</div>
                  </div>
                ))}
              </div>

              <div className="dash-grid">
                <div className="card">
                  <div className="panel-h">
                    <div>
                      <h3>Trial requests</h3>
                      <div className="sub">Submissions over the last 7 days</div>
                    </div>
                  </div>
                  <div className="bars">
                    {weekBars.map((b, i) => (
                      <div className="col" key={i}>
                        <div className="bar" style={{ height: animate ? `${Math.max(4, (b.c / barMax) * 100)}%` : 0 }}>
                          {b.c > 0 && <b>{b.c}</b>}
                        </div>
                        <div className="lab">{b.lab}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <div className="panel-h">
                    <div>
                      <h3>By status</h3>
                      <div className="sub">Where every lead stands</div>
                    </div>
                  </div>
                  <div className="donut-wrap">
                    <div className="donut">
                      <svg width="132" height="132" viewBox="0 0 132 132">
                        <circle cx="66" cy="66" r={R} fill="none" stroke="#F0EADB" strokeWidth="16" />
                        {donutSegs.map((s) => (
                          <circle
                            key={s.k}
                            cx="66"
                            cy="66"
                            r={R}
                            fill="none"
                            stroke={STATUSES[s.k].dot}
                            strokeWidth="16"
                            strokeDasharray={`${s.dash} ${C - s.dash}`}
                            strokeDashoffset={s.offset}
                            transform="rotate(-90 66 66)"
                            strokeLinecap="butt"
                          />
                        ))}
                      </svg>
                      <div className="ctr">
                        <b>{subs.length}</b>
                        <span>requests</span>
                      </div>
                    </div>
                    <div className="legend">
                      {donutSegs.map((s) => (
                        <div className="li" key={s.k}>
                          <span className="dot" style={{ background: STATUSES[s.k].dot }} />
                          {STATUSES[s.k].label}
                          <span className="n">{s.n}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="dash-grid">
                <div className="card">
                  <div className="panel-h">
                    <div>
                      <h3>Recent requests</h3>
                      <div className="sub">Latest parents who reached out</div>
                    </div>
                    <button className="btn-s bs-ghost" onClick={() => goto("submissions")}>
                      View all
                    </button>
                  </div>
                  <div className="recent">
                    {recent.map((s) => (
                      <div className="r" key={s.id} onClick={() => setDrawer({ kind: "submission", id: s.id })}>
                        <div className="av" style={{ background: avColor(s.parent) }}>
                          {initials(s.parent)}
                        </div>
                        <div className="nm">
                          {s.parent}
                          <small>
                            {s.child || "—"} · {s.age}
                          </small>
                        </div>
                        <span className={`pill ${STATUSES[s.status].cls}`}>
                          <span className="pd" style={{ background: STATUSES[s.status].dot }} />
                          {STATUSES[s.status].label}
                        </span>
                        <span className="t">{timeAgo(s.ts)}</span>
                      </div>
                    ))}
                    {!recent.length && <div className="empty" style={{ padding: "30px 20px" }}>No requests yet.</div>}
                  </div>
                </div>

                <div className="card">
                  <div className="panel-h">
                    <div>
                      <h3>Gallery mix</h3>
                      <div className="sub">Photos by category</div>
                    </div>
                  </div>
                  <div className="mini">
                    {CAT_KEYS.map((c) => {
                      const n = photos.filter((p) => p.cat === c).length;
                      return (
                        <div className="m" key={c}>
                          <span className="ml">{c}</span>
                          <div className="track">
                            <div className="fill" style={{ width: animate ? `${(n / galMax) * 100}%` : 0, background: CATS[c] }} />
                          </div>
                          <span className="mv">{n}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ---------------- SUBMISSIONS ---------------- */}
          {view === "submissions" && (
            <section>
              <div className="sect-head">
                <div>
                  <span className="hand" style={{ color: "var(--coral)", fontSize: 15 }}>
                    trial bookings
                  </span>
                  <h2>Form submissions</h2>
                </div>
                <button className="btn-s bs-ink" onClick={exportCsv}>
                  {Icons.download}Export CSV
                </button>
              </div>
              <div className="filterbar">
                <div className="search">
                  {Icons.search}
                  <input placeholder="Search parent, child or phone…" value={subQuery} onChange={(e) => setSubQuery(e.target.value)} />
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button className={`chip${subFilter === "all" ? " on" : ""}`} onClick={() => setSubFilter("all")}>
                    All <b style={{ opacity: 0.6 }}>{subChipCounts.all}</b>
                  </button>
                  {STATUS_KEYS.map((k) => (
                    <button key={k} className={`chip${subFilter === k ? " on" : ""}`} onClick={() => setSubFilter(k)}>
                      <span className="c" style={{ background: STATUSES[k].dot }} />
                      {STATUSES[k].label} <b style={{ opacity: 0.6 }}>{subChipCounts[k]}</b>
                    </button>
                  ))}
                </div>
              </div>
              <div className="card tbl-wrap">
                <table className="subtbl">
                  <thead>
                    <tr>
                      <th>Parent / Child</th>
                      <th>Child&apos;s age</th>
                      <th>Preferred date</th>
                      <th>WhatsApp</th>
                      <th>Status</th>
                      <th>Received</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubs.map((s) => (
                      <tr key={s.id} onClick={() => setDrawer({ kind: "submission", id: s.id })}>
                        <td>
                          <div className="who">
                            <div className="av" style={{ background: avColor(s.parent) }}>
                              {initials(s.parent)}
                            </div>
                            <div>
                              <b>{s.parent}</b>
                              <small>{s.child || "—"}</small>
                            </div>
                          </div>
                        </td>
                        <td>{s.age}</td>
                        <td>{s.date}</td>
                        <td>{s.phone}</td>
                        <td>
                          <select
                            className={`selstatus ${STATUSES[s.status].cls}`}
                            value={s.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => changeStatus(s.id, e.target.value as SubmissionStatus)}
                          >
                            {STATUS_KEYS.map((k) => (
                              <option key={k} value={k}>
                                {STATUSES[k].label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <span style={{ color: "var(--ink-500)", fontSize: 13 }}>{timeAgo(s.ts)}</span>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                            <a className="rowbtn" href={waLink(s.phone)} target="_blank" title="WhatsApp" onClick={(e) => e.stopPropagation()}>
                              {Icons.whatsapp}
                            </a>
                            <button
                              className="rowbtn"
                              title="Details"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDrawer({ kind: "submission", id: s.id });
                              }}
                            >
                              {Icons.dots}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {!filteredSubs.length && (
                      <tr>
                        <td colSpan={7}>
                          <div className="empty">
                            <div className="ei">🔎</div>
                            <b>No matching requests</b>
                            Try a different filter or search.
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ---------------- GALLERY ---------------- */}
          {view === "gallery" && (
            <section>
              <div className="sect-head">
                <div>
                  <span className="hand" style={{ color: "var(--coral)", fontSize: 15 }}>
                    photo manager
                  </span>
                  <h2>Gallery</h2>
                </div>
                <button className="btn-s bs-sun" onClick={() => fileInput.current?.click()}>
                  {Icons.upload}Upload photos
                </button>
              </div>
              <div
                className={`dropzone${dragOverDrop ? " drag" : ""}`}
                onClick={() => fileInput.current?.click()}
                onDragEnter={(e) => {
                  e.preventDefault();
                  setDragOverDrop(true);
                }}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={(e) => {
                  if (e.target === e.currentTarget) setDragOverDrop(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverDrop(false);
                  addFiles(e.dataTransfer.files);
                }}
              >
                <div className="di">{Icons.image}</div>
                <h3>Drag &amp; drop photos here</h3>
                <p>or click to browse — JPG / PNG up to 2MB, added straight to the live gallery</p>
                <button className="btn-s bs-ghost" onClick={(e) => { e.stopPropagation(); fileInput.current?.click(); }}>
                  Browse files
                </button>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  ref={fileInput}
                  onChange={(e) => {
                    if (e.target.files) addFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
              </div>
              <div className="filterbar">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button className={`chip${galFilter === "All" ? " on" : ""}`} onClick={() => setGalFilter("All")}>
                    All <b style={{ opacity: 0.6 }}>{photos.length}</b>
                  </button>
                  {CAT_KEYS.map((c) => (
                    <button key={c} className={`chip${galFilter === c ? " on" : ""}`} onClick={() => setGalFilter(c)}>
                      <span className="c" style={{ background: CATS[c] }} />
                      {c} <b style={{ opacity: 0.6 }}>{photos.filter((p) => p.cat === c).length}</b>
                    </button>
                  ))}
                </div>
              </div>
              <div className="photogrid">
                {visiblePhotos.map((p) => (
                  <div
                    key={p.id}
                    className={`pcardx${dragging === p.id ? " dragging" : ""}${overId === p.id ? " over" : ""}`}
                    draggable
                    onDragStart={() => {
                      dragId.current = p.id;
                      setDragging(p.id);
                    }}
                    onDragEnd={() => {
                      setDragging(null);
                      setOverId(null);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (p.id !== dragId.current) setOverId(p.id);
                    }}
                    onDragLeave={() => setOverId((o) => (o === p.id ? null : o))}
                    onDrop={(e) => {
                      e.preventDefault();
                      onDrop(p.id);
                    }}
                  >
                    <div className="ph">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.src} alt={p.cap} />
                      <div className="grip" title="Drag to reorder">
                        {Icons.grip}
                      </div>
                      <button
                        className={`homebtn${p.home ? " on" : ""}`}
                        title={p.home ? "Showing on home page" : "Show on home page"}
                        onClick={() => toggleHome(p.id)}
                      >
                        <HomeIcon filled={p.home} />
                      </button>
                      <button className={`star${p.featured ? " on" : ""}`} title="Feature on site" onClick={() => toggleFeatured(p.id)}>
                        <StarIcon filled={p.featured} />
                      </button>
                      {p.featured && <span className="feat-tag">★ Featured</span>}
                      {p.home && <span className="home-tag">⌂ Home</span>}
                    </div>
                    <div className="body">
                      <input
                        className="cap"
                        value={p.cap}
                        placeholder="Add a caption…"
                        onChange={(e) => editCaption(p.id, e.target.value)}
                        onBlur={(e) => commitCaption(p.id, e.target.value)}
                      />
                      <div className="row2">
                        <select className="selcat" value={p.cat} onChange={(e) => changeCat(p.id, e.target.value as PhotoCategory)}>
                          {CAT_KEYS.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                        <button className="delbtn" title="Delete" onClick={() => deletePhoto(p.id)}>
                          {Icons.trash}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {!visiblePhotos.length && (
                  <div className="empty" style={{ gridColumn: "1/-1" }}>
                    <div className="ei">📷</div>
                    <b>No photos here yet</b>
                    Upload some above to fill the gallery.
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ---------------- TESTIMONIALS ---------------- */}
          {view === "testimonials" && (
            <section>
              <div className="sect-head">
                <div>
                  <span className="hand" style={{ color: "var(--coral)", fontSize: 15 }}>
                    parents say
                  </span>
                  <h2>Video testimonials</h2>
                </div>
                <button className="btn-s bs-sun" onClick={() => setDrawer({ kind: "testimonial", id: null })}>
                  {Icons.plus}Add testimonial
                </button>
              </div>
              <div className="testgrid">
                {testis.map((t) => (
                  <div className="tcard" key={t.id}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-500)", fontSize: 12, fontWeight: 700, marginBottom: 10 }}>
                      <span style={{ background: "var(--ink-900)", color: "#fff", borderRadius: 6, padding: "3px 8px", display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <PlayIcon />
                        {t.duration}
                      </span>{" "}
                      video clip
                    </div>
                    <div className="q">“{t.quote}”</div>
                    <div className="meta">
                      <div className="av">{initials(t.name)}</div>
                      <div className="who2">
                        <b>{t.name}</b>
                        <small>{t.child}</small>
                      </div>
                    </div>
                    <div className="acts">
                      <button className="btn-s bs-ghost" style={{ flex: 1, justifyContent: "center", padding: 9 }} onClick={() => setDrawer({ kind: "testimonial", id: t.id })}>
                        {Icons.edit}Edit
                      </button>
                      <button className="delbtn" onClick={() => deleteTesti(t.id)}>
                        {Icons.trash}
                      </button>
                    </div>
                  </div>
                ))}
                {!testis.length && (
                  <div className="empty" style={{ gridColumn: "1/-1" }}>
                    <div className="ei">💬</div>
                    <b>No testimonials yet</b>
                    Add one with the button above.
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ---------------- PACKAGES ---------------- */}
          {view === "packages" && (
            <section>
              <div className="sect-head">
                <div>
                  <span className="hand" style={{ color: "var(--coral)", fontSize: 15 }}>
                    pricing
                  </span>
                  <h2>Packages</h2>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn-s bs-ghost" onClick={addPkg}>
                    {Icons.plus}Add package
                  </button>
                  <button className="btn-s bs-ink" onClick={savePackages}>
                    Save packages
                  </button>
                </div>
              </div>
              <p className="d" style={{ color: "var(--ink-500)", fontSize: 13, marginBottom: 18 }}>
                These show on the public Packages page and the home page preview. Card colours and the
                tilt are styled automatically; mark one tier as “most popular”.
              </p>
              <div className="set-grid">
                {pkgs.map((p, i) => (
                  <div className="card set-card" key={p.id}>
                    <div className="pkg-head">
                      <div className="t">{Icons.packages}{p.label || "Untitled"}</div>
                      <div className="pkg-actions">
                        <button className="rowbtn" title="Move up" onClick={() => movePkg(i, -1)} disabled={i === 0}>
                          ↑
                        </button>
                        <button className="rowbtn" title="Move down" onClick={() => movePkg(i, 1)} disabled={i === pkgs.length - 1}>
                          ↓
                        </button>
                        <button className="delbtn" title="Delete package" onClick={() => removePkg(i)}>
                          {Icons.trash}
                        </button>
                      </div>
                    </div>
                    <div className="field">
                      <label>Heading</label>
                      <input value={p.label} placeholder="Half day" onChange={(e) => updatePkg(i, { label: e.target.value })} />
                    </div>
                    <div className="field">
                      <label>Timing</label>
                      <input value={p.hours} placeholder="8 — 12" onChange={(e) => updatePkg(i, { hours: e.target.value })} />
                    </div>
                    <div className="field">
                      <label>Subtitle</label>
                      <input value={p.sub} placeholder="Mornings + lunch" onChange={(e) => updatePkg(i, { sub: e.target.value })} />
                    </div>
                    <div className="field">
                      <label>Price (Rs. / month)</label>
                      <input value={p.price} placeholder="22,000" onChange={(e) => updatePkg(i, { price: e.target.value })} />
                    </div>
                    <div className="field">
                      <label>Features (one per line)</label>
                      <textarea
                        rows={4}
                        value={p.features.join("\n")}
                        placeholder={"Breakfast & morning snack\nHot lunch supervised"}
                        onChange={(e) => updatePkg(i, { features: e.target.value.split("\n") })}
                      />
                    </div>
                    <label className="pkg-check">
                      <input
                        type="checkbox"
                        checked={p.highlight}
                        onChange={(e) => updatePkg(i, { highlight: e.target.checked })}
                      />
                      Mark as “most popular”
                    </label>
                  </div>
                ))}
                <div className="card set-card" style={{ gridColumn: "1 / -1" }}>
                  <h3>Discount note</h3>
                  <p className="d">Small print shown under the package cards.</p>
                  <div className="field">
                    <input value={pkgNote} onChange={(e) => setPkgNote(e.target.value)} />
                  </div>
                </div>
                {!pkgs.length && (
                  <div className="empty" style={{ gridColumn: "1/-1" }}>
                    <div className="ei">🏷️</div>
                    <b>No packages yet</b>
                    Add one above to fill the pricing page.
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ---------------- SETTINGS ---------------- */}
          {view === "settings" && (
            <section>
              <div className="sect-head">
                <div>
                  <span className="hand" style={{ color: "var(--coral)", fontSize: 15 }}>
                    preferences
                  </span>
                  <h2>Settings</h2>
                </div>
              </div>
              <div className="set-grid">
                <div className="card set-card">
                  <h3>Panel layout</h3>
                  <p className="d">Pick how you&apos;d like to navigate the admin.</p>
                  <div className="seg">
                    <button className={layout === "sidebar" ? "on" : ""} onClick={() => setLayout("sidebar")}>
                      Sidebar
                    </button>
                    <button className={layout === "topnav" ? "on" : ""} onClick={() => setLayout("topnav")}>
                      Top tabs
                    </button>
                  </div>
                </div>
                <div className="card set-card">
                  <h3>Change password</h3>
                  <p className="d">Used on the sign-in screen.</p>
                  <div className="field">
                    <label>New password</label>
                    <input type="text" placeholder="New password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
                  </div>
                  <button className="btn-s bs-ink" onClick={savePw}>
                    Update password
                  </button>
                </div>
                <div className="card set-card">
                  <h3>Daycare details</h3>
                  <p className="d">Shown across the admin header.</p>
                  <div className="field">
                    <label>Name</label>
                    <input value={setName} onChange={(e) => setSetName(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>WhatsApp number</label>
                    <input value={setPhone} onChange={(e) => setSetPhone(e.target.value)} />
                  </div>
                  <button className="btn-s bs-ink" onClick={saveInfo}>
                    Save details
                  </button>
                </div>
                <div className="card set-card">
                  <h3>Social links</h3>
                  <p className="d">Used in the footer and contact page across the site.</p>
                  <div className="field">
                    <label>Instagram URL</label>
                    <input
                      value={setIg}
                      placeholder="https://instagram.com/yourpage"
                      onChange={(e) => setSetIg(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Facebook URL</label>
                    <input
                      value={setFb}
                      placeholder="https://facebook.com/yourpage"
                      onChange={(e) => setSetFb(e.target.value)}
                    />
                  </div>
                  <button className="btn-s bs-ink" onClick={saveSocial}>
                    Save links
                  </button>
                </div>
                <div className="card set-card" style={{ gridColumn: "1 / -1" }}>
                  <h3>Notification emails</h3>
                  <p className="d">
                    Where new trial-booking submissions are emailed. Add up to 5. Leave empty to use the
                    server default.
                  </p>
                  {emails.map((em, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={em}
                        onChange={(e) => setEmailAt(i, e.target.value)}
                        style={{
                          flex: 1,
                          border: "1.5px solid var(--cream-200)",
                          background: "var(--cream-50)",
                          borderRadius: 11,
                          padding: "12px 14px",
                          fontSize: 14,
                          outline: "none",
                          color: "var(--ink-900)",
                        }}
                      />
                      <button
                        className="delbtn"
                        title="Remove"
                        onClick={() => removeEmail(i)}
                        type="button"
                      >
                        {Icons.trash}
                      </button>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                    <button className="btn-s bs-ghost" onClick={addEmail} type="button" disabled={emails.length >= 5}>
                      {Icons.plus}Add email
                    </button>
                    <button className="btn-s bs-ink" onClick={saveEmails} type="button">
                      Save recipients
                    </button>
                  </div>
                </div>
                <div className="card set-card">
                  <h3>Sign out</h3>
                  <p className="d">End your admin session on this device.</p>
                  <button className="btn-s bs-ghost" onClick={doLogout}>
                    Log out
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* ---------------- DRAWER ---------------- */}
      <Drawer
        drawer={drawer}
        subs={subs}
        testis={testis}
        onClose={() => setDrawer(null)}
        onSaveSubmission={(id, status, notes) => {
          setSubs((arr) => arr.map((s) => (s.id === id ? { ...s, status, notes } : s)));
          actions.saveSubmission(id, { status, notes }).catch(() => showToast("Couldn't save"));
          setDrawer(null);
          showToast("Saved");
        }}
        onSaveTestimonial={async (id, data) => {
          if (id) {
            setTestis((arr) => arr.map((t) => (t.id === id ? { ...t, ...data } : t)));
            actions.saveTestimonial(id, data).catch(() => showToast("Couldn't save"));
            showToast("Saved");
          } else {
            const newId = await actions.createTestimonial(data);
            setTestis((arr) => [{ id: newId, ts: Date.now(), ...data }, ...arr]);
            showToast("Testimonial added");
          }
          setDrawer(null);
        }}
      />

      {/* ---------------- TOAST ---------------- */}
      <div id="toast" className={toast ? "show" : undefined}>
        {Icons.check}
        {toast}
      </div>
    </div>
  );
}

/* ----------------------------- Drawer component ----------------------------- */

function Drawer({
  drawer,
  subs,
  testis,
  onClose,
  onSaveSubmission,
  onSaveTestimonial,
}: {
  drawer: DrawerState;
  subs: Submission[];
  testis: Testimonial[];
  onClose: () => void;
  onSaveSubmission: (id: string, status: SubmissionStatus, notes: string) => void;
  onSaveTestimonial: (
    id: string | null,
    data: { name: string; child: string; quote: string; duration: string; video: VideoRef | null },
  ) => void;
}) {
  const sub = drawer?.kind === "submission" ? subs.find((s) => s.id === drawer.id) : undefined;
  const testi = drawer?.kind === "testimonial" && drawer.id ? testis.find((t) => t.id === drawer.id) : undefined;

  const [status, setStatus] = useState<SubmissionStatus>("new");
  const [notes, setNotes] = useState("");
  const [tName, setTName] = useState("");
  const [tChild, setTChild] = useState("");
  const [tQuote, setTQuote] = useState("");
  const [tDur, setTDur] = useState("1:00");
  const [video, setVideo] = useState<VideoRef | null>(null);
  const [linkInput, setLinkInput] = useState("");
  const [linkError, setLinkError] = useState("");
  const [uploadPct, setUploadPct] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState("");
  const videoFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sub) {
      setStatus(sub.status);
      setNotes(sub.notes || "");
    }
    if (drawer?.kind === "testimonial") {
      setTName(testi?.name || "");
      setTChild(testi?.child || "");
      setTQuote(testi?.quote || "");
      setTDur(testi?.duration || "1:00");
      setVideo(testi?.video || null);
      setLinkInput(testi?.video && testi.video.type !== "cloudinary" ? testi.video.url : "");
      setLinkError("");
      setUploadError("");
      setUploadPct(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawer?.kind, sub?.id, testi?.id]);

  const applyLink = (value: string) => {
    setLinkInput(value);
    setLinkError("");
    if (!value.trim()) {
      if (video?.type !== "cloudinary") setVideo(null);
      return;
    }
    const parsed = parseVideoLink(value);
    if (parsed) setVideo(parsed);
    else setLinkError("Paste a valid YouTube or Vimeo link.");
  };

  const onPickVideo = async (file: File) => {
    setUploadError("");
    if (!file.type.startsWith("video/")) {
      setUploadError("Please choose a video file.");
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      setUploadError("Video must be under 100 MB (Cloudinary free tier).");
      return;
    }
    setUploadPct(0);
    try {
      const ref = await uploadVideoToCloudinary(file, setUploadPct);
      setVideo(ref);
      setLinkInput("");
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploadPct(null);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const open = drawer !== null;

  return (
    <div id="drawer" className={open ? "open" : undefined}>
      <div className="ov" onClick={onClose} />
      <div className="dpanel">
        {sub && (
          <>
            <div className="dhead">
              <div className="av" style={{ background: avColor(sub.parent) }}>
                {initials(sub.parent)}
              </div>
              <div style={{ flex: 1 }}>
                <div className="fd" style={{ fontWeight: 900, fontSize: 20, lineHeight: 1 }}>
                  {sub.parent}
                </div>
                <div style={{ color: "var(--ink-500)", fontSize: 13, marginTop: 3 }}>
                  {sub.child || "—"} · {sub.age}
                </div>
              </div>
              <button className="iconbtn" onClick={onClose}>
                {Icons.close}
              </button>
            </div>
            <div className="dbody">
              <div>
                <div className="drow">
                  <span className="k">Preferred date</span>
                  <span className="v">{sub.date}</span>
                </div>
                <div className="drow">
                  <span className="k">WhatsApp</span>
                  <span className="v">{sub.phone}</span>
                </div>
                {sub.package && (
                  <div className="drow">
                    <span className="k">Package</span>
                    <span className="v">{sub.package}</span>
                  </div>
                )}
                <div className="drow">
                  <span className="k">Received</span>
                  <span className="v">{new Date(sub.ts).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
                <div className="drow" style={{ borderBottom: 0 }}>
                  <span className="k">Status</span>
                  <span className="v">
                    <select className={`selstatus ${STATUSES[status].cls}`} style={{ backgroundImage: "none", paddingRight: 11 }} value={status} onChange={(e) => setStatus(e.target.value as SubmissionStatus)}>
                      {STATUS_KEYS.map((k) => (
                        <option key={k} value={k}>
                          {STATUSES[k].label}
                        </option>
                      ))}
                    </select>
                  </span>
                </div>
              </div>
              {sub.msg && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--ink-700)", marginBottom: 6 }}>
                    Their message
                  </div>
                  <div style={{ background: "#fff", border: "1.5px solid var(--cream-200)", borderRadius: 12, padding: 13, fontSize: 14, lineHeight: 1.5 }}>{sub.msg}</div>
                </div>
              )}
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--ink-700)", marginBottom: 6 }}>
                  Private notes
                </div>
                <textarea placeholder="Add a note — visiting time, follow-up, package…" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </div>
            <div className="dfoot">
              <a className="btn-s bs-wa" style={{ flex: 1, justifyContent: "center" }} href={waLink(sub.phone)} target="_blank">
                {Icons.whatsapp}WhatsApp
              </a>
              <button className="btn-s bs-ink" style={{ flex: 1, justifyContent: "center" }} onClick={() => onSaveSubmission(sub.id, status, notes)}>
                Save
              </button>
            </div>
          </>
        )}

        {drawer?.kind === "testimonial" && (
          <>
            <div className="dhead">
              <div style={{ flex: 1 }}>
                <div className="fd" style={{ fontWeight: 900, fontSize: 20 }}>
                  {drawer.id ? "Edit testimonial" : "New testimonial"}
                </div>
              </div>
              <button className="iconbtn" onClick={onClose}>
                {Icons.close}
              </button>
            </div>
            <div className="dbody">
              <div className="field">
                <label>Parent name</label>
                <input value={tName} onChange={(e) => setTName(e.target.value)} placeholder="e.g. Ayesha" />
              </div>
              <div className="field">
                <label>Relation / child</label>
                <input value={tChild} onChange={(e) => setTChild(e.target.value)} placeholder="e.g. mother of Zara (2y)" />
              </div>
              <div className="field">
                <label>Clip length</label>
                <input value={tDur} onChange={(e) => setTDur(e.target.value)} placeholder="1:24" />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--ink-700)", marginBottom: 6 }}>
                  Quote
                </div>
                <textarea value={tQuote} onChange={(e) => setTQuote(e.target.value)} placeholder="What did they say?" />
              </div>

              {/* ---- Video ---- */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--ink-700)", marginBottom: 6 }}>
                  Video (optional)
                </div>

                {video ? (
                  <div style={{ border: "1.5px solid var(--cream-200)", borderRadius: 12, padding: 12, background: "#fff" }}>
                    {video.type === "cloudinary" ? (
                      // eslint-disable-next-line jsx-a11y/media-has-caption
                      <video src={video.url} poster={video.posterUrl} controls style={{ width: "100%", borderRadius: 8, maxHeight: 180, background: "#000" }} />
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {video.posterUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={video.posterUrl} alt="" style={{ width: 96, height: 56, objectFit: "cover", borderRadius: 8, flex: "none" }} />
                        )}
                        <div style={{ fontSize: 13, fontWeight: 700 }}>
                          {video.type === "youtube" ? "YouTube" : "Vimeo"} linked
                          <div style={{ fontSize: 11, color: "var(--ink-500)", fontWeight: 600, wordBreak: "break-all" }}>{video.url}</div>
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      className="btn-s bs-ghost"
                      style={{ marginTop: 10, color: "var(--red)", borderColor: "#f3d3d2" }}
                      onClick={() => {
                        setVideo(null);
                        setLinkInput("");
                      }}
                    >
                      Remove video
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="url"
                      placeholder="Paste a YouTube or Vimeo link…"
                      value={linkInput}
                      onChange={(e) => applyLink(e.target.value)}
                      style={{ width: "100%", border: "1.5px solid var(--cream-200)", background: "var(--cream-50)", borderRadius: 11, padding: "12px 14px", fontSize: 14, outline: "none", color: "var(--ink-900)" }}
                    />
                    {linkError && <div style={{ color: "var(--red)", fontSize: 12, fontWeight: 700, marginTop: 6 }}>{linkError}</div>}

                    {CLOUDINARY_ENABLED && (
                      <div style={{ marginTop: 10 }}>
                        <div style={{ fontSize: 12, color: "var(--ink-500)", fontWeight: 600, margin: "6px 0" }}>— or upload a file —</div>
                        {uploadPct !== null ? (
                          <div style={{ fontSize: 13, fontWeight: 700 }}>
                            Uploading… {uploadPct}%
                            <div style={{ height: 8, background: "var(--cream-100)", borderRadius: 999, overflow: "hidden", marginTop: 6 }}>
                              <div style={{ height: "100%", width: `${uploadPct}%`, background: "var(--sun)", transition: "width .2s" }} />
                            </div>
                          </div>
                        ) : (
                          <button type="button" className="btn-s bs-ghost" onClick={() => videoFileRef.current?.click()}>
                            {Icons.upload}Upload video
                          </button>
                        )}
                        <input
                          ref={videoFileRef}
                          type="file"
                          accept="video/*"
                          hidden
                          onChange={(e) => {
                            if (e.target.files?.[0]) onPickVideo(e.target.files[0]);
                            e.target.value = "";
                          }}
                        />
                        {uploadError && <div style={{ color: "var(--red)", fontSize: 12, fontWeight: 700, marginTop: 6 }}>{uploadError}</div>}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="dfoot">
              <button
                className="btn-s bs-sun"
                style={{ flex: 1, justifyContent: "center" }}
                disabled={uploadPct !== null}
                onClick={() =>
                  onSaveTestimonial(drawer.id, {
                    name: tName.trim() || "Parent",
                    child: tChild.trim(),
                    quote: tQuote.trim(),
                    duration: tDur.trim() || "1:00",
                    video,
                  })
                }
              >
                {drawer.id ? "Save changes" : "Add testimonial"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
