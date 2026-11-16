"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function TopBar() {
  const { user, logout } = useAuth();
  const path = usePathname();
  if (!user) return null;
  const links = [
    { href: "/dashboard", label: "Learning path", show: true },
    { href: "/team", label: "Team progress", show: user.role !== "learner" },
    { href: "/admin", label: "Admin", show: user.role === "admin" },
    { href: "/account", label: "Account", show: true },
  ];
  return (
    <header className="topbar">
      <div className="inner">
        <Link href="/dashboard" className="brand">TPM Learning Hub</Link>
        <nav aria-label="Main">
          {links.filter((l) => l.show).map((l) => (
            <Link key={l.href} href={l.href} aria-current={path.startsWith(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="who">
          <span>{user.name} · {user.role}</span>
          <button className="btn" onClick={logout}>Log out</button>
        </div>
      </div>
    </header>
  );
}
