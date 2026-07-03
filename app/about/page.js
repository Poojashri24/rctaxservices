'use client';

import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { ShieldCheck, Target, Award, Users, CheckCircle } from 'lucide-react';

export default function About() {
  const { addLead, getWhatsAppUrl } = useLeads();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'GST Registration',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const newLead = addLead({
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      message: formData.message || `About page inquiry regarding ${formData.service}`
    });

    setSubmitted(true);
    const whatsappUrl = getWhatsAppUrl(newLead);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setFormData({ name: '', phone: '', service: 'GST Registration', message: '' });
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-display font-extrabold text-4xl text-gray-900">About RC Services</h1>
        <p className="text-gray-500 text-base">
          Professional compliance & accounting support tailored for retailers, startups, and self-employed professionals.
        </p>
      </div>

      {/* Founder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Founder Bio */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block">Our Founder</span>
            <h2 className="font-display font-bold text-3xl text-gray-900">Dedicated Compliance Partner</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            RC Services was founded by an aspiring Chartered Accountancy (CA Articleship) student with deep practical experience in Indian taxation, corporate bookkeeping, and small-business registrations.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Having worked directly on numerous client books in accounting software (Tally ERP, Zoho Books, QuickBooks, Xero), preparing audit-ready schedules, resolving GSTR reconciliations, and filing Income Tax returns, we bridge the gap between expensive audit firms and local micro-businesses.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            We focus on digital convenience, meaning you don&apos;t have to carry heavy files or visit offices. Simply share your documents securely via WhatsApp or our web portal, and we handle the heavy compliance lifting.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-50 text-brand-600 rounded-lg flex items-center justify-center shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Our Mission</h4>
                <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                  To provide accurate, prompt, and affordable tax compliance support to Indian small traders.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-50 text-brand-600 rounded-lg flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Professional Values</h4>
                <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                  Honesty, error-free compliance computation, client data security, and absolute transparency.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Capture Form */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="text-center lg:text-left space-y-1">
            <h3 className="font-display font-bold text-lg text-gray-900">Request a Free Consultation</h3>
            <p className="text-xs text-gray-500">Provide details and connect directly via WhatsApp.</p>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-1">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Submitted Successfully</h4>
              <p className="text-xs text-gray-500">Opening WhatsApp helper app...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="about-name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  id="about-name"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Sanjay Verma"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label htmlFor="about-phone" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  id="about-phone"
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label htmlFor="about-service" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Service Needed
                </label>
                <select
                  id="about-service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 border border-gray-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                >
                  <option value="GST Registration">GST Registration</option>
                  <option value="GST Return Filing">GST Return Filing</option>
                  <option value="FSSAI Registration">FSSAI Registration</option>
                  <option value="Income Tax Return Filing">Income Tax Return Filing</option>
                  <option value="MSME Registration">MSME Registration</option>
                  <option value="Tally Accounting">Tally Accounting</option>
                  <option value="Zoho Books Setup">Zoho Books Setup</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow"
              >
                Submit & Connect WhatsApp
              </button>

              <div className="flex items-start space-x-2 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 text-xs text-gray-600 mt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Privacy:</strong> Your data is strictly safe, encrypted, and never sold for marketing.
                </span>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
