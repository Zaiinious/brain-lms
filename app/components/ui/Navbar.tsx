"use client";

import { ChevronRight, ChevronDown, Menu } from "lucide-react";
import { useLayoutEffect, useRef, useState, useMemo } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const menuRef = useRef<(HTMLLIElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ width: 0, left: 0 });
  const [openDropdown, setOpenDropdown] = useState(false);

  const menu = useMemo(() => [
    { label: "Home", href: "/" },
    { label: "Kelas", href: "/kelas" },
    { label: "Tugas", href: "/tugas" },
    { label: "Chat", href: "/chat" },
    { label: "Guru", href: "/guru" },
    { label: "Prestasi", href: "/prestasi" },
    { label: "Lainnya", href: null, dropdown: [
      { label: "Kalender", href: "/kalender" },
      { label: "Pengaturan", href: "/pengaturan" },
      { label: "Bantuan", href: "/bantuan" },
    ]},
  ], []);

  useLayoutEffect(() => {
    // compute active element and indicator on client only to avoid SSR/CSR mismatch
    const index = menu.findIndex((m) => m.href === pathname);

    // update DOM classes directly to avoid extra React state updates during hydration
    menuRef.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === index) {
        el.classList.add("text-white");
      } else {
        el.classList.remove("text-white");
      }
    });

    const el = menuRef.current[index];
    if (el) {
      setIndicator({
        width: el.offsetWidth,
        left: el.offsetLeft,
      });
    } else {
      // reset indicator when no match
      setIndicator({ width: 0, left: 0 });
    }
  }, [pathname, menu]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top banner */}
      <div className="bg-blue-700 text-white text-sm text-center py-1">
        PPDB Angkatan 6 2026/2027 Telah Dibuka Kunjungi{" "}
        <a
          href="https://www.smktibazma.sch.id/ppdb"
          target="_blank"
          className="underline font-semibold"
        >
          www.smktibazma.sch.id/ppdb
        </a>{" "}
        Untuk Informasi Lebih Lanjut <ChevronRight size={14} className="inline-block" />
      </div>

      <nav className="bg-white shadow-sm border-b border-gray-100 backdrop-blur-md relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center text-white font-bold">
              B
            </div>
          </Link>

          {/* MENU */}
          <div className="relative hidden md:flex items-center">
            <ul className="flex items-center gap-8 text-[15px] font-medium text-gray-800 relative">
              {menu.map((item, i) => {
                return (
                  <li
                    key={i}
                    ref={(el) => {
                      menuRef.current[i] = el;
                    }}
                    className={clsx(
                      "relative px-4 py-1.5 rounded-md cursor-pointer select-none group",
                      "hover:text-blue-700"
                    )}
                  >
                    {item.href ? (
                      <Link href={item.href}>{item.label}</Link>
                    ) : (
                      <div className="relative">
                        <button
                          onClick={() => setOpenDropdown(!openDropdown)}
                          className="flex items-center gap-1.5"
                        >
                          {item.label}
                          <motion.div
                            animate={{ rotate: openDropdown ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={16} />
                          </motion.div>
                        </button>
                        
                        {/* Dropdown */}
                        {item.dropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={openDropdown ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className={clsx(
                              "absolute top-full left-0 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-100 z-50",
                              !openDropdown && "pointer-events-none"
                            )}
                          >
                            {item.dropdown.map((dropItem, j) => (
                              <Link
                                key={j}
                                href={dropItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 first:rounded-t-md last:rounded-b-md"
                                onClick={() => setOpenDropdown(false)}
                              >
                                {dropItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* Hover underline */}
                    <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-blue-700 transition-all duration-300"></span>
                  </li>
                );
              })}
            </ul>

            {/* SLIDING INDICATOR */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              style={{
                width: indicator.width,
                left: indicator.left,
              }}
              className="absolute top-0 bottom-0 bg-blue-700 rounded-md z-[-1]"
            />
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-1 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50">
              Sign Up
            </button>
            <button className="px-4 py-1 text-sm font-medium text-white bg-lime-600 hover:bg-lime-700 rounded-md">
              Login
            </button>
          </div>

          {/* Mobile */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <Menu size={22} />
          </button>
        </div>
      </nav>
    </header>
  );
}
