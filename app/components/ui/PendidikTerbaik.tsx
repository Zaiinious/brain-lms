const guru = [
  { nama: "Jamal", mapel: "RPL" },
  { nama: "Rina", mapel: "Desain Grafis" },
  { nama: "Dedi", mapel: "TKJ" },
  { nama: "Sari", mapel: "Matematika" },
];

export default function PendidikTerbaik() {
  return (
    <div className="w-full max-w-7xl flex items-center justify-between relative">
      <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold leading-tight text-gray-800">
            Pembelajaran
            <br />
            <span className="text-blue-600">Terpopuler</span>
          </h2>
        </div>
    </div>
       );
}
