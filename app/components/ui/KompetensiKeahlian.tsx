import Image from "next/image";

const items = [
  {
    src: "/icons/cloud.png",
    title: "Cloud Computing",
    subtitle: "(IaaS, SaaS, PaaS)",
  },
  {
    src: "/icons/iot.png",
    title: "Sistem Internet of Things (IoT)",
  },
  {
    src: "/icons/security.png",
    title: "Sistem Keamanan Jaringan (SKJ)",
  },
  {
    src: "/icons/creative.png",
    title: "Proyek Kreatif & Kewirausahaan",
  },
];

export default function KompetensiKeahlian() {
  return (
    <section className="-mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-stretch justify-between gap-4">
          {items.map(({ src, title, subtitle }) => (
            <div
              key={title}
              className="flex-1 flex items-center gap-3 bg-gradient-to-b from-white to-gray-50 rounded-xl border p-4 hover:shadow-md transition"
            >
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                <Image src={src} width={30} height={30} alt={title} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  {title}
                </h4>
                {subtitle && (
                  <p className="text-xs text-gray-500">{subtitle}</p>
                )}
              </div>
            </div>
          ))}
              </div>
            <div className="flex justify-center -mt-3 ">
                <button className="bg-blue-700 text-white text-sm px-4 py-1 rounded-md shadow"> Kompetensi Keahlian </button>
            </div>
      </div>
    </section>
  );
}
