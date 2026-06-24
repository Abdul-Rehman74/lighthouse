"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/app/admin/actions";
import { LighthouseMark, Icons } from "@/app/admin/icons";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const res = await login(pw);
      if (res.ok) {
        const next = params.get("next") || "/admin";
        router.replace(next);
        router.refresh();
      } else {
        setError(res.error || "Incorrect password.");
        setShake(false);
        requestAnimationFrame(() => setShake(true));
      }
    });
  };

  return (
    <div id="auth">
      <div className="blob ab1" />
      <div className="blob ab2" />
      <form className={`authcard${shake ? " shake" : ""}`} onSubmit={onSubmit} autoComplete="off">
        <div className="beam">
          <LighthouseMark width={40} height={48} id="lgAuth" />
        </div>
        <div className="fd" style={{ fontWeight: 900, fontSize: 24, marginTop: 26, lineHeight: 1 }}>
          Lighthouse Admin
        </div>
        <p style={{ color: "var(--ink-500)", fontSize: 13.5, margin: "7px 0 22px" }}>
          Sign in to manage bookings &amp; gallery
        </p>
        <div className="authrow">
          {Icons.lock}
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoFocus
          />
          <button type="button" className="eye" aria-label="Show password" onClick={() => setShow((s) => !s)}>
            {Icons.eye}
          </button>
        </div>
        <button className="authbtn" type="submit" disabled={pending}>
          {pending ? "Signing in…" : "Sign in →"}
        </button>
        <div className="autherr">{error}</div>
      </form>
    </div>
  );
}
