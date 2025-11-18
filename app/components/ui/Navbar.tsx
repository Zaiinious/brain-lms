"use client";

import { ChevronRight, ChevronDown, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 10) setShow(true);
      else if (y > lastY) setShow(false);
      else setShow(true);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menu = [
    { label: "Home", href: "/" },
    { label: "Kelas", href: "/kelas" },
    { label: "Tugas", href: "/tugas" },
    { label: "Chat", href: "/chat" },
    { label: "Guru", href: "/guru" },
    { label: "Prestasi", href: "/prestasi" },
    { label: "Lainnya", href: null },
  ];

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300",
        show ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="bg-blue-700 text-white text-sm text-center py-1">
        PPDB Angkatan 6 2026/2027 Telah Dibuka Kunjungi{" "}
        <a
          href="https://www.smktibazma.sch.id/ppdb"
          target="_blank"
          className="underline font-semibold"
        >
          www.smktibazma.sch.id/ppdb
        </a>{" "}
        Untuk Informasi Lebih Lanjut{" "}
        <ChevronRight size={14} className="inline-block" />
      </div>

      <nav className="bg-white shadow-sm border-b border-gray-100 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center text-white font-bold">
              B
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-800 relative">
            {menu.map((item, i) => (
              <li
                key={i}
                className={clsx(
                  "relative flex items-center gap-1 px-4 py-1.5 rounded-md cursor-pointer transition-all duration-200 select-none",
                  item.label === "Home"
                    ? "bg-blue-700 text-white shadow-sm"
                    : "hover:bg-gray-100 hover:text-blue-700"
                )}
                onClick={() => {
                  if (item.href) return;
                  if (item.label === "Lainnya") setDropdownOpen(!dropdownOpen);
                }}
              >
                {item.href ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span>{item.label}</span>
                )}

                {item.label === "Lainnya" && (
                  <ChevronDown
                    size={16}
                    className={clsx(
                      "ml-1 transition-transform duration-200",
                      dropdownOpen && "rotate-180"
                    )}
                  />
                )}

                {item.label === "Lainnya" && dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-10 left-0 w-48 bg-white border border-gray-100 rounded-lg shadow-lg p-2 animate-fadeIn"
                  >
                    <Link href="/ekskul" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      Ekskul
                    </Link>
                    <Link href="/kegiatan" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      Kegiatan
                    </Link>
                    <Link href="/kontak" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      Kontak
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-1 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50">
              Sign Up
            </button>

            <button className="px-4 py-1 text-sm font-medium text-white bg-lime-600 hover:bg-lime-700 rounded-md">
              Login
            </button>
          </div>

          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <Menu size={22} />
          </button>
        </div>
      </nav>
    </header>
  );
}
