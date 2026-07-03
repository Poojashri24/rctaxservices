'use client';

import { useState, useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useLeads } from '../context/LeadContext';

const SERVICE_OPTIONS = [
  'GST Registration',
  'GST Return Filing',
  'FSSAI Registration',
  'Income Tax Return Filing',
  'MSME Registration',
  'Tally Accounting',
  'Zoho Books Setup',
];

export default function LeadPopup() {
  const { addLead, getWhatsAppUrl } = useLeads();
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'GST Registration' });

  // Show popup after 12 seconds, only once per session
  useEffect(() => {
    const shown = sessionStorage.getItem('rc_popup_shown');
    if (shown) return;
    const t = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem('rc_popup_shown', '1');
    }, 12000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    const lead = addLead({ ...formData, message: 'Popup inquiry' });
    setSubmitted(true);
    setTimeout(() => {
      window.open(getWhatsAppUrl(lead), '_blank');
      setVisible(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-7 space-y-5 relative">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto">✓</div>
            <h4 className="font-bold text-gray-900">Opening WhatsApp...</h4>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-gray-900">Get a Free Consultation</h3>
              <p className="text-xs text-gray-500">Fill in your details and connect with us instantly on WhatsApp.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Your Name</label>
                <input type="text" name="name" required placeholder="e.g. Anil Kumar" value={formData.name} onChange={handleChange}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Phone Number</label>
                <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="10-digit mobile number" value={formData.phone} onChange={handleChange}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Service Required</label>
                <select name="service" value={formData.service} onChange={handleChange}
                  className="w-full px-3.5 py-2 border border-gray-200 bg-white rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none">
                  {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button type="submit"
                className="w-full py-3 rounded-lg text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-md">
                Connect on WhatsApp
              </button>
              <div className="flex items-start gap-2 bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-xs text-gray-600">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Strict Privacy:</strong> Your data is never shared or sold.</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
