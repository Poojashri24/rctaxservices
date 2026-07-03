import Link from 'next/link';
import { MessageCircle, Mail } from 'lucide-react';

const links = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog',     label: 'Blog' },
  { href: '/contact',  label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">

        <div className="space-y-2">
          <div className="font-display font-bold text-white text-lg">RC Services</div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Affordable GST, FSSAI, ITR & bookkeeping support for Indian small businesses — entirely online.
          </p>
        </div>

        <div className="space-y-2 text-xs">
          <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-2">Quick Links</div>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block text-gray-400 hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="space-y-2 text-xs">
          <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-2">Reach Us</div>
          <a
            href="https://wa.me/919080108358?text=Hello! I want to inquire about tax and accounting services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-400 hover:text-white"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
          </a>
          <a href="mailto:rcservices147@gmail.com" className="flex items-center gap-1.5 text-gray-400 hover:text-white">
            <Mail className="w-3.5 h-3.5" /> rcservices147@gmail.com
          </a>
          <Link href="/admin" className="text-gray-600 hover:text-gray-400 text-[11px] mt-3 block">
            Admin Login
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-[11px] text-gray-500">
        © {new Date().getFullYear()} RC Services. All rights reserved.
      </div>
    </footer>
  );
}
