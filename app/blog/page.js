'use client';

import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { BookOpen, Calendar, Clock, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 'gst-thresholds',
    title: 'Understanding GST Registration Thresholds for Small Businesses',
    excerpt: 'Is your retail shop or service startup required to register for GST? We break down the current turnover limits (₹40 Lakhs vs ₹20 Lakhs) and explain volunteer registration rules.',
    date: 'June 18, 2026',
    readTime: '3 min read',
    category: 'GST Updates'
  },
  {
    id: 'itr-late-fees',
    title: 'ITR Delay Consequences: What is Section 234F Late Fee?',
    excerpt: 'Failing to file your Income Tax Return before the July 31st deadline attracts statutory penalties. Learn about the ₹5,000 late fees and how interest accumulates on outstanding taxes.',
    date: 'June 15, 2026',
    readTime: '4 min read',
    category: 'Income Tax'
  },
  {
    id: 'bookkeeping-benefits',
    title: 'Why Double-Entry Bookkeeping Saves Money for Retail Outlets',
    excerpt: 'Many retail shops maintain simple single-entry ledger books, missing out on crucial tax deductions and ledger checks. Discover why digital accounting on Tally or Zoho pays off.',
    date: 'June 10, 2026',
    readTime: '5 min read',
    category: 'Accounting'
  },
  {
    id: 'fssai-classification',
    title: 'Do I Need an FSSAI Registration or a License? A Quick Guide',
    excerpt: 'Depending on your yearly turnover (under or over ₹12 Lakhs), the government classifies food operators into basic registration, state license, or central license. Check where your business fits.',
    date: 'June 05, 2026',
    readTime: '3 min read',
    category: 'FSSAI Rules'
  }
];

export default function Blog() {
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
      message: formData.message || `Blog page inquiry regarding ${formData.service}`
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
        <h1 className="font-display font-extrabold text-4xl text-gray-900">Compliance & Tax Blog</h1>
        <p className="text-gray-500 text-base">
          Informative articles explaining GST rules, tax saving tips, FSSAI laws, and standard accounting guidelines.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Blog Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <h3 className="font-display font-bold text-base text-gray-950 leading-snug">
                  {post.title}
                </h3>
                
                <p className="text-xs text-gray-500 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-5 mt-4 border-t border-gray-50 text-[11px] text-gray-400">
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {post.readTime}
                </span>
                
                <button 
                  onClick={() => alert(`Full article viewing is coming soon! For direct query on this topic, please use the WhatsApp inquiry form.`)}
                  className="flex items-center text-brand-600 hover:text-brand-700 font-semibold group"
                >
                  Read Article
                  <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Lead Capture Form */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="text-center lg:text-left space-y-1">
            <h3 className="font-display font-bold text-lg text-gray-900">Have a Question?</h3>
            <p className="text-xs text-gray-500">Ask us directly and connect on WhatsApp.</p>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-1">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Lead Form Submitted!</h4>
              <p className="text-xs text-gray-500">Opening WhatsApp app...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="blog-name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  id="blog-name"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Anand Sen"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label htmlFor="blog-phone" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  id="blog-phone"
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
                <label htmlFor="blog-service" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Topic of Interest
                </label>
                <select
                  id="blog-service"
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
                Inquire via WhatsApp
              </button>

              <div className="flex items-start space-x-2 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 text-xs text-gray-600 mt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Privacy:</strong> Data remains private. We never share your contact or spam you.
                </span>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
