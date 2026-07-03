'use client';

import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919080108358?text=Hello! I want to inquire about tax and accounting services."
      target="_blank"
      rel="noopener noreferrer"
      title="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
