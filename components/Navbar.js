'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';

const links = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog',     label: 'Blog' },
  { href: '/contact',  label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-display font-bold text-sm">
            RC
          </div>
          <span className="font-display font-bold text-gray-900">RC Services</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname === l.href
                  ? 'text-brand-600 bg-brand-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/919080108358?text=Hello! I want to inquire about tax and accounting services."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4 mr-1.5" /> WhatsApp Us
        </a>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-gray-700" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-semibold ${
                pathname === l.href ? 'text-brand-600 bg-brand-50' : 'text-gray-600'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/919080108358?text=Hello! I want to inquire about tax and accounting services."
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-center px-3 py-2.5 rounded-lg text-sm font-bold text-white bg-emerald-500"
          >
            WhatsApp Us
          </a>
        </div>
      )}
    </header>
  );
}
