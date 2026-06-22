import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Customization', href: '#customization' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-black/90 backdrop-blur-md shadow-lg shadow-black/30 py-2'
        : 'bg-transparent py-4'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* ── Logo ── */}
        <a href="#home" className="flex items-center gap-2 group">
          <img
            src="/assets/BB-Logo.png"
            alt="BitByte Logo"
            className="h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-200 drop-shadow-lg sm:h-16"
            onError={(e) => {
              // Fallback if image not placed yet
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback icon shown only if logo.png is missing */}
          <div
            style={{ display: 'none' }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-green-400 items-center justify-center shadow-lg"
          >
            <span className="text-white font-black text-base">B</span>
          </div>

          {/* Company name */}
          <div className="flex flex-col justify-center leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <span className="font-extrabold text-sm sm:text-lg bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent tracking-wide">
              Bit Byte
            </span>
            <span className="font-bold text-[8px] sm:text-[11px] text-white uppercase tracking-widest mt-0.5">
              Technologies
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="px-5 py-2 text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200"
          >
            Contact
          </a>
          <a
            href="#showcase"
            className="px-5 py-2 text-sm font-semibold text-black bg-gradient-to-r from-blue-400 to-green-400 rounded-xl hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-500/20"
          >
            View Designs
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden max-h-[calc(100vh-4.5rem)] overflow-y-auto bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 text-gray-300 hover:text-white font-medium border-b border-white/5"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#showcase"
            className="block mt-4 text-center py-3 font-bold text-black bg-gradient-to-r from-blue-400 to-green-400 rounded-xl"
            onClick={() => setMenuOpen(false)}
          >
            View Designs →
          </a>
        </div>
      )}
    </header>
  );
}
