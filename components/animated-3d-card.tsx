"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface Card3DProps {
  title: string;
  icon?: ReactNode;
  theme?: "blue" | "green" | "yellow" | "purple";
  hoverAnimation?: boolean;
  onClick?: () => void;
}

export default function Card3D({
  title,
  icon,
  theme = "blue",
  hoverAnimation = true,
  onClick,
}: Card3DProps) {
  const themeClass = {
    blue: "bg-blue-50 border-blue-200 hover:shadow-blue-200/60",
    green: "bg-green-50 border-green-200 hover:shadow-green-200/60",
    yellow: "bg-yellow-50 border-yellow-200 hover:shadow-yellow-200/60",
    purple: "bg-purple-50 border-purple-200 hover:shadow-purple-200/60",
  }[theme];

  return (
    <div
      className={clsx(
        "p-6 rounded-2xl border cursor-pointer transition-all",
        "shadow-sm hover:shadow-lg",
        themeClass,
        hoverAnimation && "hover:scale-[1.03]"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {/* ICON */}
        {icon && <div className="text-4xl">{icon}</div>}

        {/* TITLE BESAR (DESKRIPSI DIHAPUS) */}
        <h2 className="text-4xl font-bold align-middle">
          {title}
        </h2>
      </div>
    </div>
  );
}
