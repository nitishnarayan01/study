"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { ThemeToggle } from "@/lib/theme";

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "?";
}

export default function TopBar() {
  const { user, logout } = useAuth();
  const path = usePathname();
  if (!user) return null;
  const links = [
    { href: "/dashboard", label: "My learning", match: ["/dashboard", "/phases", "/topics"], show: true },
    { href: "/browse", label: "All topics", match: ["/browse"], show: true },
    { href: "/team", label: "Team", match: ["/team"], show: user.role !== "learner" },
    { href: "/admin", label: "Admin", match: ["/admin"], show: user.role === "admin" },
  ];
  return (
    <header className="topbar">
      <div className="inner">
        <Link href="/dashboard" className="brand" aria-label="TPM Learning Hub home">
          <span className="logo" aria-hidden="true">TL</span>
          <span className="brand-t">TPM Learning Hub</span>
        </Link>
        <nav aria-label="Main">
          {links.filter((l) => l.show).map((l) => (
            <Link key={l.href} href={l.href}
              aria-current={l.match.some((m) => path.startsWith(m)) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="who">
          <ThemeToggle />
          <Link href="/account" className="avatar" title={`${user.name} · Account settings`}
            aria-current={path.startsWith("/account") ? "page" : undefined}>
            {initials(user.name)}
          </Link>
          <button className="btn ghost sm" onClick={logout}>Log out</button>
        </div>
      </div>
    </header>
  );
}
