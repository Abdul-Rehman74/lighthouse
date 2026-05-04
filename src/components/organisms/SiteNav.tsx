"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/atoms/Logo";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full bg-ink-900 text-cream-50",
        "transition-shadow duration-300",
        scrolled && "shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
      )}
    >
      <Container className="flex items-center justify-between py-4 md:py-5">
        <Link href="/" aria-label="Lighthouse home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden md:flex gap-6 lg:gap-8 text-sm font-semibold">
          {siteConfig.nav.map((it) => {
            const active = isActive(it.href);
            return (
              <Link
                key={it.id}
                href={it.href}
                className={cn(
                  "pb-1 border-b-2 transition-colors",
                  active
                    ? "text-sun-300 border-sun-300"
                    : "text-cream-50/80 border-transparent hover:text-cream-50"
                )}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="sun" size="sm">
            <Link href="/contact">Book trial →</Link>
          </Button>
        </div>

        <button
          className="md:hidden text-cream-50 p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-cream-50/10 animate-fade-up">
          <Container className="py-4 flex flex-col gap-1">
            {siteConfig.nav.map((it) => {
              const active = isActive(it.href);
              return (
                <Link
                  key={it.id}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "py-3 text-base font-semibold border-b border-cream-50/10",
                    active ? "text-sun-300" : "text-cream-50/80"
                  )}
                >
                  {it.label}
                </Link>
              );
            })}
            <Button asChild variant="sun" size="sm" className="mt-3 self-start">
              <Link href="/contact" onClick={() => setOpen(false)}>
                Book trial →
              </Link>
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
