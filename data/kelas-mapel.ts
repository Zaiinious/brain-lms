// Shared data for Kelas and Mapel across the application
export const kelasList = [
  { id: 10, name: "Kelas 10", description: "Tahun pertama jenjang SMK dengan fondasi ilmu yang kuat" },
  { id: 11, name: "Kelas 11", description: "Pendalaman materi dan skill khusus sesuai kompetensi keahlian" },
  { id: 12, name: "Kelas 12", description: "Persiapan menghadapi uji kompetensi dan dunia kerja" },
  { id: 13, name: "Kelas 13", description: "Program akselerator karir dan pengembangan profesional" },
];

export const mapelByKelas: Record<
  number,
  { name: string; img: string; slug: string; icon?: string }[]
> = {
  10: [
    { name: "PWPB", icon: "https://img.icons8.com/color/96/code.png", slug: "pwpb", img: "https://picsum.photos/400/300?random=1" },
    { name: "PBO", icon: "https://img.icons8.com/color/96/code-file.png", slug: "pbo", img: "https://picsum.photos/400/300?random=2" },
    { name: "Matematika", icon: "https://img.icons8.com/color/96/calculator.png", slug: "matematika", img: "https://picsum.photos/400/300?random=3" },
    { name: "Basis Data", icon: "https://img.icons8.com/color/96/database.png", slug: "basis-data", img: "https://picsum.photos/400/300?random=4" },
    { name: "RPL", icon: "https://img.icons8.com/color/96/software.png", slug: "rpl", img: "https://picsum.photos/400/300?random=5" },
    { name: "PKK", icon: "https://img.icons8.com/color/96/cooking.png", slug: "pkk", img: "https://picsum.photos/400/300?random=6" },
    { name: "Bahasa Inggris", icon: "https://img.icons8.com/color/96/english.png", slug: "bahasa-inggris", img: "https://picsum.photos/400/300?random=7" },
    { name: "P5", icon: "https://img.icons8.com/color/96/education.png", slug: "p5", img: "https://picsum.photos/400/300?random=8" },
  ],
  11: [
    { name: "UI/UX", icon: "https://img.icons8.com/color/96/design.png", slug: "ui-ux", img: "https://picsum.photos/400/300?random=9" },
    { name: "Animasi 2D", icon: "https://img.icons8.com/color/96/animation.png", slug: "animasi-2d", img: "https://picsum.photos/400/300?random=10" },
    { name: "Jaringan Lanjut", icon: "https://img.icons8.com/color/96/network.png", slug: "jaringan-lanjut", img: "https://picsum.photos/400/300?random=11" },
  ],
  12: [
    { name: "Desain 3D", icon: "https://img.icons8.com/color/96/3d-print.png", slug: "desain-3d", img: "https://picsum.photos/400/300?random=12" },
    { name: "IoT", icon: "https://img.icons8.com/color/96/iot.png", slug: "iot", img: "https://picsum.photos/400/300?random=13" },
    { name: "Keamanan Jaringan", icon: "https://img.icons8.com/color/96/security-checked.png", slug: "keamanan-jaringan", img: "https://picsum.photos/400/300?random=14" },
  ],
  13: [
    { name: "Proyek Akhir", icon: "https://img.icons8.com/color/96/project.png", slug: "proyek-akhir", img: "https://picsum.photos/400/300?random=15" },
    { name: "Kewirausahaan", icon: "https://img.icons8.com/color/96/business.png", slug: "kewirausahaan", img: "https://picsum.photos/400/300?random=16" },
    { name: "Pengembangan Produk", icon: "https://img.icons8.com/color/96/product.png", slug: "pengembangan-produk", img: "https://picsum.photos/400/300?random=17" },
  ],
};
