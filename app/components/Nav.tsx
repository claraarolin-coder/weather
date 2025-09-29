"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const path = usePathname();
  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={`px-3 py-2 rounded hover:underline ${path === href ? "font-semibold underline" : ""}`}
    >
      {label}
    </Link>
  );
  return (
    <nav className="flex gap-2 border-b mb-4 pb-3">
      {link("/", "Inicio")}
      {link("/favoritos", "Favoritos")}
      {link("/sobre", "Sobre la app")}
    </nav>
  );
}
