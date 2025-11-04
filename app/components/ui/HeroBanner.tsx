export default function HeroBanner() {
  return (
    <section className="relative bg-blue-700 text-white pt-28 pb-32 rounded-b-[60px] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-orange-300 text-sm font-medium mb-2">
          ✨ Unlock Your Potential with
        </p>
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-3">
          BRAIN
        </h1>
        <h2 className="text-lg md:text-xl font-light text-blue-100 mb-6">
          Bazma Resourceful Academic <br className="hidden md:block" />
          & Interactive Network
        </h2>
        <p className="text-blue-100 max-w-md mb-8">
          Learn from Industry Experts and Enhance Your Skills.
        </p>
        <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:shadow-md transition">
          Lihat Kelas dan Materi
        </button>
      </div>
    </section>
  );
}
