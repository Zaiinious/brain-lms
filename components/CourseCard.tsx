"use client";

import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  title: string;
  description: string;
  users: { name: string; avatar: string }[];
  illustration: string;
  gradient: string; // "from-purple-500 to-violet-600"
}

export default function CourseCard({
  title,
  description,
  users,
  illustration,
  gradient,
}: CourseCardProps) {
  return (
    <div
      className={cn(
        "w-full p-6 md:p-8 rounded-2xl text-white flex justify-between items-center relative overflow-hidden shadow-xl",
        "bg-gradient-to-br",
        gradient
      )}
    >
      {/* LEFT CONTENT */}
      <div className="w-2/3 flex flex-col gap-3">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        <p className="text-sm opacity-90 md:max-w-[85%]">{description}</p>

        {/* USERS */}
        <div className="flex items-center gap-2 mt-1">
          {users.slice(0, 5).map((u, i) => (
            <Avatar
              key={i}
              className={cn(
                "border-2 border-white w-8 h-8",
                i !== 0 && "-ml-2"
              )}
            >
              <AvatarImage src={u.avatar} alt={u.name} />
              <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}

          {users.length > 5 && (
            <span className="ml-1 text-sm font-semibold bg-white/20 px-2 py-0.5 rounded-full">
              +{users.length - 5}
            </span>
          )}
        </div>

        {/* BUTTON */}
        <button className="mt-3 bg-white text-black font-semibold text-sm px-4 py-2 rounded-xl hover:bg-white/80 transition">
          Gabung Kelas
        </button>
      </div>

      {/* ILLUSTRATION */}
      <div className="w-1/3 relative flex justify-end">
        <Image
          src={illustration}
          alt={title}
          width={180}
          height={180}
          className="object-contain drop-shadow-xl"
        />
      </div>
    </div>
  );
}
