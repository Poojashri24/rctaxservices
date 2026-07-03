'use client';

import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { 
  Lock, 
  Search, 
  Download, 
  Trash2, 
  Users, 
  Briefcase, 
  CheckSquare, 
  Clock, 
  FileSpreadsheet,
  FileText,
  Filter,
  CheckCircle,
  Eye,
  LogOut
} from 'lucide-react';

export default function AdminDashboard() {
  const { leads, updateLeadStatus, deleteLead, exportLeadsToCSV } = useLeads();
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');

  // Hardcoded passcode for demo security gate
  const DEMO_PASSCODE = 'deivam';

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === DEMO_PASSCODE) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
  };

  // Filter leads based on inputs
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.phone.includes(searchTerm) || 
                          (lead.message || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesService = serviceFilter === 'All' || lead.service === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  // Calculate status statistics
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const inProgressLeads = leads.filter(l => l.status === 'In-Progress').length;
  const completedLeads = leads.filter(l => l.status === 'Completed').length;

  // Extract unique service list for filtering dropdown
  const uniqueServices = Array.from(new Set(leads.map(l => l.service)));

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-24">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl space-y-6 text-center">
          <div className="w-14 h-14 bg-blue-50 text-brand-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          
          <div className="space-y-1">
            <h1 className="font-display font-extrabold text-2xl text-gray-900">Admin Portal Gate</h1>
            <p className="text-xs text-gray-500">Security check required. Please enter your passcode.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Enter admin passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center text-sm tracking-widest focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              {authError && <p className="text-xs text-red-500 font-medium mt-2">{authError}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 transition-colors shadow-md shadow-brand-100"
            >
              Sign In to Dashboard
            </button>
          </form>

          <p className="text-[10px] text-gray-400">
            Authorized access only. Actions are logged and data is encrypted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-slide-in">
      
      {/* Header and Download Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-gray-900 flex items-center">
            Lead Tracking Dashboard
            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-600 border border-brand-100">
              Live State
            </span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Review inquiries, check client documents, and manage compliance statuses.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={exportLeadsToCSV}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm"
            title="Download Excel Worksheet"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export Worksheet (CSV)
          </button>
          
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center px-3.5 py-2.5 rounded-lg text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-50 text-brand-600 rounded-lg flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Leads</p>
            <p className="text-2xl font-extrabold text-gray-900 mt-0.5">{totalLeads}</p>
          </div>
        </div>

        {/* New Leads */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Pending/New</p>
            <p className="text-2xl font-extrabold text-gray-900 mt-0.5">{newLeads}</p>
          </div>
        </div>

        {/* In-Progress Leads */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">In Progress</p>
            <p className="text-2xl font-extrabold text-gray-900 mt-0.5">{inProgressLeads}</p>
          </div>
        </div>

        {/* Completed Leads */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Completed</p>
            <p className="text-2xl font-extrabold text-gray-900 mt-0.5">{completedLeads}</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads by name, phone, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        {/* Service Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="w-full px-2 py-2 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none"
          >
            <option value="All">All Services</option>
            {uniqueServices.map((srv, i) => (
              <option key={i} value={srv}>{srv}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <CheckSquare className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-2 py-2 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Leads Table Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-gray-400 space-y-2">
              <Users className="w-8 h-8 mx-auto" />
              <p className="font-semibold text-sm">No leads found matching your criteria.</p>
              <p className="text-xs">Try clearing search text or resetting service filters.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 text-left text-xs">
              <thead className="bg-gray-50/70 text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Client Detail</th>
                  <th className="px-6 py-4">Requested Service</th>
                  <th className="px-6 py-4">Submitted Date</th>
                  <th className="px-6 py-4">Compliance Message</th>
                  <th className="px-6 py-4">Files</th>
                  <th className="px-6 py-4">Lead Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100 bg-white text-gray-600">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Client Name & Phone */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900">{lead.name}</div>
                      <a 
                        href={`https://wa.me/91${lead.phone}`} 
                        target="_blank" 
                        className="text-[11px] text-emerald-600 hover:underline font-semibold flex items-center mt-1"
                      >
                        WhatsApp: {lead.phone}
                      </a>
                    </td>

                    {/* Requested Service */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                        {lead.service}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {new Date(lead.date).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </td>

                    {/* Description message */}
                    <td className="px-6 py-4 max-w-xs truncate" title={lead.message}>
                      {lead.message || <span className="text-gray-300 italic">No description given</span>}
                    </td>

                    {/* Uploaded Files */}
                    <td className="px-6 py-4">
                      {lead.documents && lead.documents.length > 0 ? (
                        <div className="flex flex-col space-y-1">
                          {lead.documents.map((doc, idx) => (
                            <button
                              key={idx}
                              onClick={() => alert(`Reviewing file: ${doc.name}. Download capability simulated locally.`)}
                              className="inline-flex items-center text-[10px] text-brand-600 hover:underline font-medium text-left truncate max-w-[120px]"
                              title={doc.name}
                            >
                              <FileText className="w-3 h-3 text-gray-400 mr-1 shrink-0" />
                              {doc.name}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[10px] text-gray-300">None</span>
                      )}
                    </td>

                    {/* Status dropdown selector */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`font-semibold rounded-md border-0 text-[11px] px-2.5 py-1.5 focus:ring-1 focus:ring-brand-500 focus:outline-none cursor-pointer ${
                          lead.status === 'New' 
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : lead.status === 'In-Progress'
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    {/* Delete button */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete lead for ${lead.name}?`)) {
                            deleteLead(lead.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors inline-flex"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
    </div>
  );
}
