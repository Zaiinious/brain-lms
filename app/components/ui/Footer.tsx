import Image from "next/image";
import {
  Instagram,
  Youtube,
  Linkedin,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#005BBB] text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 border-b border-white/40 pb-8">
        {/* Kiri - Logo dan deskripsi */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo/logo-smk-white.png"
              alt="SMK TI Bazma Logo"
              width={250}
              height={250}
              className="object-contain -ml-6 -my-4"
            />
          </div>
          <p className="text-lg font-bold uppercase tracking-wide">
            Energi Masa<br /> Depan Indonesia
          </p>
        </div>

        {/* Tengah 1 - Tentang Kami */}
        <div>
          <h3 className="font-semibold mb-3">Tentang Kami</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li><a href="#" className="hover:text-white">Beranda</a></li>
            <li><a href="#" className="hover:text-white">Kelas & Materi</a></li>
            <li><a href="#" className="hover:text-white">Login</a></li>
          </ul>
        </div>

        {/* Tengah 2 - Portofolio */}
        <div>
          <h3 className="font-semibold mb-3">Portofolio</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li><a href="#" className="hover:text-white">SISMAKO</a></li>
            <li><a href="https://best.smktibazma.com/" className="hover:text-white">BEST</a></li>
            <li><a href="https://www.smktibazma.sch.id/" className="hover:text-white">Website Sekolah</a></li>
          </ul>
        </div>

        {/* Kanan - Social Profiles */}
        <div>
          <h3 className="font-semibold mb-3">Social Profiles</h3>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/smktibazma/" className="bg-white p-2 rounded-lg hover:opacity-90 transition">
              <Instagram className="text-black w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@smktibazma2025" className="bg-white p-2 rounded-lg hover:opacity-90 transition">
              <Youtube className="text-black w-5 h-5" />
            </a>
            <a href="https://id.linkedin.com/company/smk-ti-bazma" className="bg-white p-2 rounded-lg hover:opacity-90 transition">
              <Linkedin className="text-black w-5 h-5" />
            </a>
            <a href="#" className="bg-white p-2 rounded-lg hover:opacity-90 transition">
              <MessageCircle className="text-black w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-6 text-center text-sm text-white/80">
        © 2025 Bazma Resourceful Academic & Interactive Network. All rights reserved.
      </div>
    </footer>
  );
}
