export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 text-sm flex flex-col md:flex-row justify-between">
        <p>© {new Date().getFullYear()} BRAIN Indonesia. All rights reserved.</p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
