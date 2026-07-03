'use client';

import React, { useState, useEffect } from 'react';
import { useLeads } from '../../context/LeadContext';
import { 
  FileText, 
  UploadCloud, 
  Check, 
  Clock, 
  HelpCircle, 
  AlertTriangle,
  FolderOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';

const SERVICES_DETAILS = [
  {
    id: 'gst-registration',
    title: 'GST Registration',
    desc: 'Mandatory registration for business operators with turnovers exceeding statutory thresholds, or conducting inter-state transactions. We handle everything from document gathering to drafting application forms and addressing queries.',
    docs: [
      'PAN Card of the Business / Partner / Director',
      'Aadhaar Card of the Applicant',
      'Proof of Business Premises (Electricity bill, Rent agreement, or Consent letter)',
      'Bank Statement or Cancelled Cheque',
      'Authorized Signatory Details & Passport Photo'
    ],
    time: '3 to 5 Working Days',
    benefits: [
      'Legally carry out business and collect GST from customers.',
      'Claim Input Tax Credit (ITC) on your business purchases.',
      'Simple online verification and hassle-free registration.',
      'Eligible to sell goods on e-commerce platforms (Amazon, Flipkart).'
    ],
    startPrice: 'Deal Custom'
  },
  {
    id: 'gst-returns',
    title: 'GST Return Filing',
    desc: 'Periodic returns detailing sales, purchases, and tax collected. We compile invoices, perform GSTR-2B reconciliation to maximize Input Tax Credit, and prepare GSTR-1 and GSTR-3B summaries to keep you penalty-free.',
    docs: [
      'Monthly/Quarterly Sales Register (Invoices)',
      'Purchase Register (Purchase bills)',
      'E-way bills generated (if applicable)',
      'GSTR-2B details from GST Portal'
    ],
    time: 'Monthly or Quarterly (Before 11th & 20th)',
    benefits: [
      'Avoid heavy late fees (₹50/day) and interest penalty (18% p.a.).',
      'Smooth compliance rating on the GST portal to maintain buyer trust.',
      'Accurate GSTR-2B matching to prevent ITC blockages.',
      'Quick preparation for yearly annual returns (GSTR-9).'
    ],
    startPrice: 'Deal Custom'
  },
  {
    id: 'fssai-registration',
    title: 'FSSAI License / Registration',
    desc: 'Every Food Business Operator (FBO), from street food vendors to major food packagers, must obtain FSSAI certification. We guide you through Basic Registration, State, or Central Licensing depending on your business turnover.',
    docs: [
      'Passport size photograph of the food business operator',
      'ID proof (Aadhaar, Voter ID, or PAN)',
      'Proof of business address (Electricity bill, etc.)',
      'List of food categories to be handled',
      'Layout plan of the kitchen/premises (for State/Central licensing)'
    ],
    time: '5 to 7 Working Days (Basic)',
    benefits: [
      'Ensures statutory compliance under Food Safety & Standards Act.',
      'Builds safety trust and brand value among consumers.',
      'Enables registration on food delivery apps (Zomato, Swiggy).',
      'Protects business from heavy penalties and closure notices.'
    ],
    startPrice: 'Deal Custom'
  },
  {
    id: 'income-tax',
    title: 'Income Tax Return (ITR)',
    desc: 'Personal or business income tax computation. We specialize in salary income, capital gains from shares/property, and presumptive business taxation (ITR-4 under Sec 44AD/44ADA) for freelancers, shops, and consultants.',
    docs: [
      'PAN Card and Aadhaar Card',
      'Form 16 (for salaried individuals)',
      'Form 26AS & AIS/TIS summary',
      'Bank Statements for the entire financial year',
      'Proof of tax-saving investments (80C, 80D, etc.)'
    ],
    time: '2 to 3 Working Days',
    benefits: [
      'Filing before July 31st saves you from a ₹5,000 late fee.',
      'Enables hassle-free visa applications and home loan approvals.',
      'Safeguards you from Income Tax scrutiny notices.',
      'Carry forward business losses to offset future income taxes.'
    ],
    startPrice: 'Deal Custom'
  },
  {
    id: 'msme-registration',
    title: 'MSME / Udyam Registration',
    desc: 'Udyam Registration is the government portal for micro, small, and medium enterprise recognition. It grants access to banking subsidies, MSME loan portals, and statutory payment protection rules.',
    docs: [
      'Aadhaar Card of the Proprietor / Partner / Director',
      'PAN Card of the Enterprise',
      'Business Bank Account Details',
      'Turnover and investment details of the business'
    ],
    time: '2 Working Days',
    benefits: [
      'Protects against delayed payments (Mandatory payment within 45 days).',
      'Collateral-free business loans from banks with interest rate concessions.',
      'Electricity bill concessions and ISO certification cost refunds.',
      'Preferences in government tenders.'
    ],
    startPrice: 'Deal Custom'
  },
  {
    id: 'tally-zoho',
    title: 'Tally & Zoho Books Setup',
    desc: 'Complete digital bookkeeping. We configure chart of accounts, set up professional invoicing templates, link bank feeds, classify transactions, calculate monthly TDS on rentals/services, and prepare reconciliations.',
    docs: [
      'Monthly Bank Statements (Excel or PDF)',
      'All Purchase and Sales invoices',
      'Detail of cash transactions / expenses ledger',
      'Previous year balance sheet (for opening entries)'
    ],
    time: 'Ongoing / Monthly Closing',
    benefits: [
      'Accurate monthly profit/loss reports to track cash flows.',
      'Complete readiness for GST audits and direct tax returns.',
      'Avoid year-end compliance scrambles and missing bill errors.',
      'Clean bank reconciliation reports for banking audits.'
    ],
    startPrice: 'Deal Custom'
  }
];

export default function Services() {
  const { addLead, getWhatsAppUrl, addDocumentsToLead } = useLeads();
  const [selectedService, setSelectedService] = useState('gst-registration');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [submittedLeadId, setSubmittedLeadId] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Sync state to pre-populate message
  const activeService = SERVICES_DETAILS.find(s => s.id === selectedService) || SERVICES_DETAILS[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Compile files before adding lead
    const filesToAttach = uploadedFiles.map(f => ({
      name: f.name,
      size: f.size,
      dataUrl: '#'
    }));

    const newLead = addLead({
      name: formData.name,
      phone: formData.phone,
      service: activeService.title,
      message: formData.message || `Inquiry for ${activeService.title}.`,
      documents: filesToAttach
    });

    setSubmittedLeadId(newLead.id);
    const whatsappUrl = getWhatsAppUrl(newLead);
    
    // Redirect to WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setFormData({ name: '', phone: '', message: '' });
      setUploadedFiles([]);
      setSubmittedLeadId(null);
    }, 1500);
  };

  // Mock File Upload Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files) => {
    const arr = Array.from(files).map(file => ({
      name: file.name,
      size: formatFileSize(file.size),
      rawFile: file
    }));
    setUploadedFiles(prev => [...prev, ...arr]);
  };

  const removeFile = (idx) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-display font-extrabold text-4xl text-gray-900">Services Catalog</h1>
        <p className="text-gray-500 text-base">
          Review documents checklist, turnaround times, and statutory details. Send your details directly to get started.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Services Tabs Navigation */}
        <div className="lg:col-span-4 space-y-2.5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Select compliance area</h2>
          {SERVICES_DETAILS.map((srv) => (
            <button
              key={srv.id}
              onClick={() => {
                setSelectedService(srv.id);
                setSubmittedLeadId(null);
              }}
              className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all ${
                selectedService === srv.id
                  ? 'bg-brand-600 border-brand-600 text-white font-semibold shadow-md shadow-brand-100'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm font-medium">{srv.title}</span>
              <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${selectedService === srv.id ? 'translate-x-1' : 'opacity-40'}`} />
            </button>
          ))}

          {/* Centralized Upload Reminder Banner */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 space-y-2 mt-6">
            <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Data Protection Promise</span>
            </div>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              All documents uploaded are handled on secure local storage. They are never sent to marketing companies or third parties. Safe, clean, and confidential accounting support.
            </p>
          </div>
        </div>

        {/* Right Side: Active Service Details & Lead forms */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Service Details Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <h2 className="font-display font-extrabold text-2xl text-gray-900">{activeService.title}</h2>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="w-3.5 h-3.5 text-brand-500 mr-1 shrink-0" />
                  <span>Processing Turnaround: <strong>{activeService.time}</strong></span>
                </div>
              </div>
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                Rate: Custom Quoted
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed font-sans">{activeService.desc}</p>

            {/* Grid for Docs & Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              {/* Documents Needed */}
              <div className="space-y-3 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
                <h3 className="font-display font-bold text-sm text-gray-950 flex items-center">
                  <FileText className="w-4 h-4 text-brand-500 mr-2 shrink-0" />
                  Required Documents Checklist
                </h3>
                <ul className="space-y-2 text-xs text-gray-600">
                  {activeService.docs.map((doc, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-3.5 h-3.5 text-brand-600 mr-2 mt-0.5 shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="space-y-3 bg-brand-50/20 p-5 rounded-xl border border-brand-100/30">
                <h3 className="font-display font-bold text-sm text-gray-950 flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                  Key Benefits & Importance
                </h3>
                <ul className="space-y-2 text-xs text-gray-600">
                  {activeService.benefits.map((b, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Custom Interactive Uploader */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-sm text-gray-900 flex items-center">
                <UploadCloud className="w-4 h-4 text-brand-500 mr-2 shrink-0" />
                Upload Documents Securely (Optional)
              </h3>
              
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  isDragOver 
                    ? 'border-brand-600 bg-brand-50/50' 
                    : 'border-gray-300 hover:border-brand-400 bg-gray-50/20'
                }`}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-selector"
                />
                <label htmlFor="file-selector" className="cursor-pointer space-y-2 block">
                  <UploadCloud className="w-8 h-8 text-gray-400 mx-auto" />
                  <div className="text-xs text-gray-600">
                    <span className="text-brand-600 font-semibold underline">Click to upload</span> or drag and drop files here
                  </div>
                  <p className="text-[10px] text-gray-400">PDF, JPG, PNG files accepted. Maximum 10MB per file.</p>
                </label>
              </div>

              {/* Uploaded file indicators */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <p className="text-xs font-semibold text-gray-700">Files selected to submit ({uploadedFiles.length}):</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg bg-white text-xs">
                        <span className="truncate max-w-[180px] font-medium text-gray-600" title={file.name}>{file.name}</span>
                        <div className="flex items-center space-x-2 text-[10px] text-gray-400 shrink-0">
                          <span>{file.size}</span>
                          <button 
                            type="button"
                            onClick={() => removeFile(index)} 
                            className="text-red-500 hover:text-red-700 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Consultation Form */}
            <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 space-y-4">
              <h3 className="font-display font-bold text-sm text-gray-950">
                Inquire About {activeService.title}
              </h3>
              
              {submittedLeadId ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">Lead Form Submitted!</h4>
                  <p className="text-xs text-gray-500">Connecting you to our WhatsApp helper...</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="service-name" className="block text-[11px] font-semibold text-gray-700 uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      id="service-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ritesh Sen"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="service-phone" className="block text-[11px] font-semibold text-gray-700 uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      id="service-phone"
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="service-message" className="block text-[11px] font-semibold text-gray-700 uppercase mb-1">
                      Brief Requirements
                    </label>
                    <textarea
                      id="service-message"
                      name="message"
                      rows="2"
                      placeholder={`e.g. I want to register a retail shop under ${activeService.title}...`}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-brand-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow"
                    >
                      Submit Details & Connect via WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
