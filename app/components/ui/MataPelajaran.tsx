const mapel = ["PWPB", "PBO", "Matematika", "Basis Data", "RPL", "PKK", "Bahasa Inggris", "P5"];

export default function MataPelajaran() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Mata Pelajaran</h3>
        <div className="flex flex-wrap gap-3">
          {mapel.map((m) => (
            <span
              key={m}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 cursor-pointer"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
