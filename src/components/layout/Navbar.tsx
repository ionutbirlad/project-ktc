import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <span className="text-xl font-bold tracking-tight">KTC</span>
        <nav className="space-x-6 text-sm font-medium">
          <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <a href="#about" className="hover:text-orange-600 transition-colors">About</a>
          <a href="#contact" className="hover:text-orange-600 transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
}
