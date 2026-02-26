"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/cards", label: "Cards" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="font-serif text-xl tracking-wide md:text-2xl">
          Park Bench Prints
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="group relative py-1 text-sm tracking-wide uppercase"
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-300 ${
                    href === "/"
                      ? pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
                      : pathname.startsWith(href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${
              mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${
              mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0 }}
        className="overflow-hidden md:hidden"
      >
        <ul className="flex flex-col gap-4 px-6 pb-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm tracking-wide uppercase ${
                  (href === "/" ? pathname === "/" : pathname.startsWith(href))
                    ? "text-accent"
                    : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.header>
  );
}
