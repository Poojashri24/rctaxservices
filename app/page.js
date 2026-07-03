'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLeads } from '../context/LeadContext';
import { 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  MessageSquare, 
  MessageCircle,
  ShieldCheck, 
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';

const SERVICES_OVERVIEW = [
  {
    title: 'GST Registration',
    desc: 'Get your Goods & Services Tax registration number quickly and seamlessly.',
    due: 'Mandatory if turnover exceeds ₹40L (goods) / ₹20L (services).',
    penalty: 'Fines up to ₹10,000 or 10% of tax evaded for operating without registration.',
    fact: 'Requires PAN, Aadhaar, Proof of Business Address, and Bank details.',
    color: 'bg-blue-50 border-blue-100 text-blue-600',
    link: '/services#gst-registration'
  },
  {
    title: 'GST Return Filing',
    desc: 'Regular filing of monthly or quarterly GSTR-1 & GSTR-3B compliance returns.',
    due: 'Monthly GSTR-1 by 11th; GSTR-3B by 20th of the following month.',
    penalty: 'Interest @ 18% p.a. on delayed payment; Late fee of ₹50/day (₹20/day for NIL returns).',
    fact: 'GSTR-3B cannot be filed without filing GSTR-1 first.',
    color: 'bg-indigo-50 border-indigo-100 text-indigo-600',
    link: '/services#gst-returns'
  },
  {
    title: 'FSSAI Registration',
    desc: 'Government food license/registration for restaurants, manufacturers, and small food vendors.',
    due: 'Must be obtained prior to commencing operations.',
    penalty: 'Running food operations without FSSAI can lead to up to 6 months jail & ₹5 Lakhs fine.',
    fact: 'Required even for home bakers and small street food stalls.',
    color: 'bg-emerald-50 border-emerald-100 text-emerald-600',
    link: '/services#fssai-registration'
  },
  {
    title: 'Income Tax Return (ITR)',
    desc: 'Accurate computation and filing of ITR-1, ITR-2, ITR-3, or ITR-4 (Presumptive Business).',
    due: 'Usually July 31st of the Assessment Year for individuals/non-audit clients.',
    penalty: 'Late filing fee of ₹5,000 under Sec 234F; Interest at 1%/month under 234A.',
    fact: 'Filing ITR creates a valid financial profile necessary for visa & loan approvals.',
    color: 'bg-cyan-50 border-cyan-100 text-cyan-600',
    link: '/services#income-tax'
  },
  {
    title: 'MSME Registration',
    desc: 'Get Udyam Registration to unlock special loans, subsidies, and payment protection schemes.',
    due: 'Voluntary but highly recommended for protection under MSMED Act.',
    penalty: 'No penalty, but delay causes loss of interest claims on late customer payments.',
    fact: 'Ensures buyers must pay you within 45 days, or pay penal interest @ 3x RBI rate.',
    color: 'bg-purple-50 border-purple-100 text-purple-600',
    link: '/services#msme-registration'
  },
  {
    title: 'Tally & Zoho Accounting',
    desc: 'Regular digital bookkeeping, reconciliations, invoice creation, and TDS calculations.',
    due: 'Monthly book closure should ideally be done by the 10th of next month.',
    penalty: 'Fines up to ₹25,000 under Sec 271A for failing to maintain statutory books of accounts.',
    fact: 'Systematic double-entry accounting helps catch leaks and ensures tax compliance.',
    color: 'bg-teal-50 border-teal-100 text-teal-600',
    link: '/services#tally-zoho'
  }
];

const FAQS = [
  {
    q: 'What documents are required to file GSTR-1 and GSTR-3B?',
    a: 'You will need sales registers (outward invoices), purchase registers (inward invoices), debit/credit notes, and bank statements showing transaction entries. Our service page provides a comprehensive documents checklist.'
  },
  {
    q: 'What is the penalty if I fail to file my ITR on time?',
    a: 'Under Section 234F of the Income Tax Act, a late fee of ₹5,000 is applicable. However, if your total taxable income is below ₹5 Lakhs, the late fee is restricted to ₹1,000. Additionally, interest is charged @ 1% per month on outstanding tax amounts.'
  },
  {
    q: 'Do home bakers and online cloud kitchens need FSSAI?',
    a: 'Yes, absolutely. In India, any Business Operator handling food (manufacturing, packing, storing, or selling)—including home bakers, street vendors, and online cloud kitchens—must hold at least an FSSAI Basic Registration.'
  },
  {
    q: 'How does the WhatsApp Lead system work?',
    a: 'When you submit an inquiry form on our website, the details (your name, number, service required) are formatted into a clean message. The system then opens WhatsApp on your phone or desktop, allowing you to send the details directly to our helpline in one tap.'
  }
];

export default function Home() {
  const { addLead, getWhatsAppUrl } = useLeads();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'GST Registration',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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
      message: formData.message || `Home page inquiry for ${formData.service}`
    });

    setSubmitted(true);
    const whatsappUrl = getWhatsAppUrl(newLead);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setFormData({ name: '', phone: '', service: 'GST Registration', message: '' });
      setSubmitted(false);
    }, 1200);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-gray-50/50 py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">
                ⚡ Reliable Finance & Taxation Support
              </span>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-gray-900 tracking-tight leading-tight">
                Tax Compliance & <span className="text-brand-600">Accounting</span> Services
              </h1>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                GST, FSSAI, Income Tax, Bookkeeping & Business Registration Support. Get expert compliance management tailored for Indian small businesses.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="#quote-form"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 transition-all duration-150 shadow-lg shadow-brand-200"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Free Consultation
                </Link>
                <button
                  onClick={() => window.open('https://wa.me/919080108358?text=Hello! I want to inquire about tax and accounting services.', '_blank')}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-all duration-150 shadow-sm"
                >
                  {/* WhatsApp SVG Icon */}
                  <svg className="w-5 h-5 mr-2 fill-emerald-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.031 2C6.49 2 2 6.47 2 12.01c0 1.91.53 3.69 1.45 5.22L2 22l4.95-1.3c1.5.82 3.2 1.3 5.08 1.3 5.54 0 10.03-4.47 10.03-10.01C22.06 6.47 17.57 2 12.03 2zm6.75 14.28c-.28.78-1.42 1.43-1.95 1.52-.49.08-1.12.15-2.88-.56-2.27-.92-3.7-3.23-3.81-3.38-.11-.15-.93-1.24-.93-2.36 0-1.12.58-1.68.8-1.91.22-.22.48-.28.64-.28.16 0 .32.01.46.01.15 0 .35-.06.55.42.2.49.69 1.7.75 1.82.06.12.1.27.02.43-.08.16-.12.26-.25.41-.12.14-.26.32-.37.43-.12.13-.25.27-.11.51.14.24.62 1.03 1.33 1.66.92.81 1.69 1.06 1.93 1.18.24.12.38.1.52-.06.14-.16.6-.7 0-.94-.21-.08-1.25-.52-1.5-.63-.26-.11-.45-.16-.64.12-.19.28-.75.94-.92 1.13-.17.19-.34.21-.62.07-.28-.14-1.2-.44-2.29-1.41-.85-.76-1.42-1.69-1.59-1.98-.17-.29-.02-.45.12-.59.13-.13.28-.33.42-.49.14-.16.19-.28.28-.46.09-.19.04-.35-.02-.47-.06-.12-.55-1.34-.76-1.84-.2-.5-.45-.42-.62-.43h-.53c-.19 0-.49.07-.75.36-.26.28-1 1.01-1 2.45s1.02 2.85 1.17 3.04c.15.19 2.01 3.07 4.87 4.31.68.29 1.21.47 1.62.6.69.22 1.32.19 1.81.12.55-.08 1.68-.69 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.11-.27-.18-.55-.32z"/>
                  </svg>
                  WhatsApp Now
                </button>
              </div>

              {/* Safety Badges */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 justify-center lg:justify-start border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 mr-1.5" />
                  <span>Confidential Data Guarantee</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 font-medium">
                  <CheckCircle className="w-4 h-4 text-brand-500 mr-1.5" />
                  <span>Zero Unsolicited Marketing Spam</span>
                </div>
              </div>
            </div>
            
            {/* Right Hero Card / Form */}
            <div className="lg:col-span-5">
              <div id="quote-form" className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 space-y-4">
                <div className="text-center md:text-left space-y-1">
                  <h3 className="font-display font-bold text-xl text-gray-900">Request Custom Quote</h3>
                  <p className="text-xs text-gray-500">Provide details and connect on WhatsApp instantly.</p>
                </div>
                
                {submitted ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900">Lead Saved!</h4>
                    <p className="text-xs text-gray-600 max-w-xs mx-auto">
                      Launching WhatsApp with your inquiry. Click Send to submit.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="hero-name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Your Name
                      </label>
                      <input
                        id="hero-name"
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Anil Kumar"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="hero-phone" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        id="hero-phone"
                        type="tel"
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="hero-service" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Service Needed
                      </label>
                      <select
                        id="hero-service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 border border-gray-200 bg-white rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:outline-none"
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
                      <label htmlFor="hero-msg" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Brief Requirements (Optional)
                      </label>
                      <textarea
                        id="hero-msg"
                        name="message"
                        rows="2"
                        placeholder="Describe your query or business type..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:outline-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 transition-colors shadow-md shadow-brand-100"
                    >
                      Connect & Submit on WhatsApp
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Services Grid Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900">
            Our Professional Services
          </h2>
          <p className="text-gray-500 text-base">
            Expert assistance for your business compliances. Click on any service card to view requirements, benefits, and due dates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_OVERVIEW.map((srv, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-gray-900">{srv.title}</h3>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${srv.color}`}>
                    Compliance
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{srv.desc}</p>
                
                {/* Due dates and delay warnings */}
                <div className="space-y-2 border-t border-gray-50 pt-4 mt-2">
                  <div className="text-xs">
                    <strong className="text-gray-700 font-semibold block">⏳ Primary Due Date:</strong>
                    <span className="text-gray-500">{srv.due}</span>
                  </div>
                  <div className="text-xs">
                    <strong className="text-amber-700 font-semibold block">⚠️ Penalty / Late Fee:</strong>
                    <span className="text-amber-600">{srv.penalty}</span>
                  </div>
                  <div className="text-xs">
                    <strong className="text-brand-700 font-semibold block">💡 Important Fact:</strong>
                    <span className="text-gray-500 italic">"{srv.fact}"</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-50">
                <Link 
                  href={srv.link}
                  className="inline-flex items-center text-xs font-semibold text-brand-600 hover:text-brand-700 group"
                >
                  View Details & Documents 
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="bg-gray-50/50 py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-display font-extrabold text-3xl text-gray-900">Why Partner With Us?</h2>
            <p className="text-gray-500 text-sm">
              We understand small businesses need timely tax support without heavy corporate prices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-brand-600 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-gray-950 text-base">Affordable Pricing</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Budget-friendly pricing with custom dealing. Perfect for retail shops and micro enterprises.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-brand-600 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-gray-950 text-base">Quick Turnaround</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Fast processing. GST returns, ITR filings, and licenses filed within agreed deadlines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-brand-600 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-gray-950 text-base">Online Support</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Send your bills over WhatsApp/Email. Document upload and filing done completely digitally.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-brand-600 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-gray-950 text-base">Personalized Service</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Get direct regular updates. No corporate chatbots. Speak directly to your tax planner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-display font-extrabold text-3xl text-gray-900">What Our Clients Say</h2>
          <p className="text-gray-500 text-sm">
            Trusted by micro-entrepreneurs, traders, and service providers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex text-amber-400">★★★★★</div>
            <p className="text-sm text-gray-600 italic">
              "RC Services helped me get my FSSAI basic registration in just 3 days for my kitchen. The process was completely online. Very professional!"
            </p>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Pooja Mishra</h4>
              <p className="text-xs text-gray-400">Home Baker, Lucknow</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex text-amber-400">★★★★★</div>
            <p className="text-sm text-gray-600 italic">
              "They handle my monthly GST filings and accounting on Zoho. They remind me of due dates 4 days in advance, preventing late fee penalties."
            </p>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Devendra Singh</h4>
              <p className="text-xs text-gray-400">Retail Trader, Jaipur</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex text-amber-400">★★★★★</div>
            <p className="text-sm text-gray-600 italic">
              "Filing ITR-4 used to be confusing for my freelance design work. They made it simple, calculated my presumptive tax deductions correctly, and filed it."
            </p>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Vikram Sen</h4>
              <p className="text-xs text-gray-400">Freelance Developer, Bengaluru</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="font-display font-extrabold text-3xl text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-sm">
            Answers to general tax rules, penalties, and registration inquiries.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-gray-800 hover:bg-gray-50 focus:outline-none"
              >
                <span className="flex items-center">
                  <HelpCircle className="w-4 h-4 text-brand-500 mr-2.5 shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? 'transform rotate-180' : ''}`} />
              </button>
              
              {openFaq === idx && (
                <div className="p-5 border-t border-gray-100 text-xs text-gray-600 leading-relaxed bg-gray-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
