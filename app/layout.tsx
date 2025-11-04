import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

export const metadata = {
  title: "BRAIN - Belajar & Berkarya",
  description: "Sistem pembelajaran interaktif berbasis web",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-800">
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
