"use client";
import { useEffect, useState } from "react";
import { ChevronRight, Menu } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);

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

  const menu = ["Home", "Kelas", "Tugas", "Chat", "Guru", "Prestasi", "Lainnya"];

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300",
        show ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* Top announcement */}
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

      {/* Main navbar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center font-bold text-white">
              <span>B</span>
            </div>
          </div>

          {/* Menu desktop */}
          <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-700">
            {menu.map((item, i) => (
              <li
                key={i}
                className={clsx(
                  "relative cursor-pointer hover:text-blue-600 transition-colors",
                  item === "Home" ? "text-blue-600" : ""
                )}
              >
                {item}
                <span
                  className={clsx(
                    "absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300",
                    "group-hover:w-full",
                    item === "Home" ? "w-full" : ""
                  )}
                />
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-1 text-sm font-medium border rounded-md hover:bg-gray-50">
              Sign Up
            </button>
            <button className="px-4 py-1 text-sm font-medium text-white bg-lime-600 hover:bg-lime-700 rounded-md">
              Login
            </button>
          </div>

          {/* Mobile menu icon */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}
