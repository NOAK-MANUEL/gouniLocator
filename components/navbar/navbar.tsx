"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Suggest", href: "/suggest" },
    { name: "Admin", href: "/auth/admin" },
  ];

  return (
    <header className="sticky top-0 bg-white border-b z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* LOGO */}
        <div className="font-bold text-emerald-700 text-lg flex items-center gap-2">
          <span>📍</span>
          goLocator
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex gap-2 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setActive(link.name.toLowerCase())}
              className={`px-3 py-1 rounded transition ${
                active === link.name.toLowerCase()
                  ? "bg-emerald-100 text-emerald-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActive(link.name.toLowerCase());
                  setOpen(false);
                }}
                className={`px-3 py-2 rounded ${
                  active === link.name.toLowerCase()
                    ? "bg-emerald-100 text-emerald-700"
                    : "hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
