"use client";

import { Cloud, Shield, Lightbulb, Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function KompetensiKeahlian() {
  const skills = [
    {
      icon: <Cloud className="w-8 h-8 text-blue-600" />,
      title: "Cloud Computing",
      desc: "(IaaS, SaaS, PaaS)",
    },
    {
      icon: <Bot className="w-8 h-8 text-blue-600" />,
      title: "Sistem Internet of Things (IoT)",
      desc: "",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Sistem Keamanan Jaringan (SKJ)",
      desc: "",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-blue-600" />,
      title: "Proyek Kreatif & Kewirausahaan",
      desc: "",
    },
  ];
  
  return (
    <section className="-mt-20 relative z-10">
      {/* --- Kompetensi Cards (horizontal align) --- */}
      <div className="relative z-10 -mt-20 flex flex-col items-center">
      {/* Kontainer utama */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] max-w-6xl flex justify-between items-stretch gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center gap-3 bg-gray-50 hover:bg-gray-100 transition rounded-xl p-4 flex-1 border border-gray-100 shadow-sm"
          >
            <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-md">
              {skill.icon}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-gray-800 text-sm leading-tight">{skill.title}</h3>
              <p className="text-xs text-gray-500">{skill.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="-mt-3 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-1.5 rounded-md shadow-md">
        Kompetensi Keahlian
      </button>
</div>


    </section>
  );
}
