const guru = [
  { nama: "Jamal", mapel: "RPL" },
  { nama: "Rina", mapel: "Desain Grafis" },
  { nama: "Dedi", mapel: "TKJ" },
  { nama: "Sari", mapel: "Matematika" },
];

export default function PendidikTerbaik() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-semibold mb-8 text-gray-800">Pendidik Terbaik</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {guru.map((g) => (
            <div
              key={g.nama}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full mb-3" />
              <h4 className="font-semibold">{g.nama}</h4>
              <p className="text-sm text-gray-500">{g.mapel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
