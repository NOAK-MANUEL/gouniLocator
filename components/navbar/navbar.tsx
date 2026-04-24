"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Suggest", href: "/suggest" },
  { name: "Admin", href: "/auth/admin" },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {}, [pathname]);

  return (
    <header className="sticky top-0 bg-white border-b z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* LOGO */}
        <Link
          href={"/"}
          className="font-bold text-emerald-700 text-lg flex items-center gap-2"
        >
          GoLocator
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex gap-2 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1 rounded transition ${
                  isActive ? "bg-emerald-700 text-white" : "hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* MOBILE BUTTON */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 pb-4">
          <div className="flex flex-col gap-2 mt-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={`px-3 py-2 rounded ${
                    isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
