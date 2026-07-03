'use client';

import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { Mail, MessageCircle, ShieldCheck, CheckCircle } from 'lucide-react';

export default function Contact() {
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
      message: formData.message || `Contact page inquiry for ${formData.service}`
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
        <h1 className="font-display font-extrabold text-4xl text-gray-900">Contact Us</h1>
        <p className="text-gray-500 text-base">
          Get in touch for a free business compliance health check. Speak directly to our specialist.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact Cards & Map */}
        <div className="lg:col-span-6 space-y-8">
          
          <div className="space-y-4">
            <h2 className="font-display font-bold text-2xl text-gray-900">Direct Contacts</h2>
            <p className="text-gray-500 text-sm">
              We respond fastest over WhatsApp. Send your queries anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-36">
              <div>
                <MessageCircle className="w-5 h-5 text-brand-600 mb-2" />
                <h4 className="font-bold text-gray-950 text-sm">WhatsApp</h4>
                <p className="text-xs text-gray-500 mt-1">Mon-Sat (9 AM - 7 PM)</p>
              </div>
              <a
                href="https://wa.me/919080108358?text=Hello! I want to inquire about tax and accounting services."
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-brand-600 hover:underline"
              >
                Chat with us on WhatsApp
              </a>
            </div>

            {/* Email */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-36">
              <div>
                <Mail className="w-5 h-5 text-brand-600 mb-2" />
                <h4 className="font-bold text-gray-950 text-sm">Email Support</h4>
                <p className="text-xs text-gray-500 mt-1">For documents and quotes</p>
              </div>
              <a href="mailto:rcservices147@gmail.com" className="text-sm font-semibold text-brand-600 hover:underline">
                rcservices147@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Right Side: Inquiry Form */}
        <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-5">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-xl text-gray-900">Send an Inquiry</h3>
            <p className="text-xs text-gray-500">Provide details below to format your WhatsApp query.</p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg">Inquiry Recorded</h4>
              <p className="text-xs text-gray-500">Opening WhatsApp link...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  id="contact-phone"
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
                <label htmlFor="contact-service" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Service Required
                </label>
                <select
                  id="contact-service"
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

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Describe Your Query
                </label>
                <textarea
                  id="contact-msg"
                  name="message"
                  rows="3"
                  placeholder="Tell us about your business, turnover, or specific tax filings required..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow"
              >
                Submit Form & Connect on WhatsApp
              </button>

              <div className="flex items-start space-x-2 bg-emerald-50/50 p-3.5 rounded-lg border border-emerald-100 text-xs text-gray-600 mt-4">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Privacy Promise:</strong> Your financial and personal details are strictly safe and confidential. No marketing spam, no sales sharing.
                </span>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
