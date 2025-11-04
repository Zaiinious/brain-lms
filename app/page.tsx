import HeroBanner from "./components/ui/HeroBanner";
import KompetensiKeahlian from "./components/ui/KompetensiKeahlian";
import PembelajaranPopuler from "./components/ui/PembelajaranPopuler";
import MataPelajaran from "./components/ui/MataPelajaran";
import PendidikTerbaik from "./components/ui/PendidikTerbaik";
import Testimoni from "./components/ui/Testimoni";

export default function Page() {
  return (
    <>
      <HeroBanner />
      <KompetensiKeahlian />
      <PembelajaranPopuler />
      <MataPelajaran />
      <PendidikTerbaik />
      <Testimoni />
    </>
  );
}
