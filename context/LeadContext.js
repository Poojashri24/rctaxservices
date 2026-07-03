'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LeadContext = createContext(null);

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rc_leads');
      if (saved) setLeads(JSON.parse(saved));
    } catch (e) {}
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('rc_leads', JSON.stringify(leads));
    } catch (e) {}
  }, [leads]);

  const addLead = (data) => {
    const newLead = {
      id: Date.now(),
      status: 'New',
      date: new Date().toISOString(),
      documents: [],
      ...data,
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (id, status) =>
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));

  const deleteLead = (id) =>
    setLeads((prev) => prev.filter((l) => l.id !== id));

  const getWhatsAppUrl = (lead) => {
    const text = `Hello! I'm ${lead.name}. I'm interested in ${lead.service}. ${lead.message || ''}`;
    return `https://wa.me/919080108358?text=${encodeURIComponent(text)}`;
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLeadStatus, deleteLead, getWhatsAppUrl }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error('useLeads must be used inside LeadProvider');
  return ctx;
}
