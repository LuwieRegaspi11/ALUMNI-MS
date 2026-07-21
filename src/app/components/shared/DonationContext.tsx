import React, { createContext, useContext, useState } from 'react';

export interface DonationRecord {
  id: string;
  alumniName: string;
  alumniEmail: string;
  department: string;
  campaign: string;
  amount: number;
  type: 'Cash' | 'In-Kind';
  description: string;
  proofUrl: string | null;
  status: 'Pending' | 'Verified' | 'Rejected';
  submittedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  target: number;
  current: number;
  department: string;
  active: boolean;
  deadline?: string;
}

interface DonationCtx {
  donations: DonationRecord[];
  campaigns: Campaign[];
  submitDonation: (d: Omit<DonationRecord, 'id' | 'status' | 'submittedAt'>) => void;
  verifyDonation: (id: string, verifiedBy: string) => void;
  rejectDonation: (id: string, reason: string, verifiedBy: string) => void;
  addCampaign: (c: Omit<Campaign, 'id' | 'current'>) => void;
}

const Ctx = createContext<DonationCtx>({
  donations: [], campaigns: [],
  submitDonation: () => {}, verifyDonation: () => {}, rejectDonation: () => {}, addCampaign: () => {},
});

const initialCampaigns: Campaign[] = [
  { id: '1', name: 'Scholarship Fund', description: 'Support financially challenged students', target: 200000, current: 145000, department: 'All', active: true, deadline: '2026-08-31' },
  { id: '2', name: 'Lab Upgrade 2026', description: 'Modernize computer labs with new equipment', target: 500000, current: 325000, department: 'CSE', active: true, deadline: '2026-09-30' },
  { id: '3', name: 'Library Books', description: 'Expand library collection with latest textbooks', target: 100000, current: 78000, department: 'All', active: true },
  { id: '4', name: 'Sports Equipment', description: 'Purchase new sports equipment for student athletes', target: 150000, current: 52000, department: 'All', active: true },
];

const initialDonations: DonationRecord[] = [
  { id: '1', alumniName: 'Juan Dela Cruz', alumniEmail: 'juan@gmail.com', department: 'CSE', campaign: 'Scholarship Fund', amount: 5000, type: 'Cash', description: '', proofUrl: 'https://placehold.co/400x300', status: 'Pending', submittedAt: '2026-06-10' },
  { id: '2', alumniName: 'Maria Santos', alumniEmail: 'maria@gmail.com', department: 'CSE', campaign: 'Lab Upgrade 2026', amount: 2500, type: 'Cash', description: '', proofUrl: 'https://placehold.co/400x300', status: 'Verified', submittedAt: '2026-06-09', verifiedAt: '2026-06-10', verifiedBy: 'Admin' },
  { id: '3', alumniName: 'Pedro Reyes', alumniEmail: 'pedro@gmail.com', department: 'CTHM', campaign: 'Library Books', amount: 10000, type: 'Cash', description: '', proofUrl: 'https://placehold.co/400x300', status: 'Verified', submittedAt: '2026-06-08', verifiedAt: '2026-06-09', verifiedBy: 'Admin' },
  { id: '4', alumniName: 'Lisa Chen', alumniEmail: 'lisa@gmail.com', department: 'BAA', campaign: 'Scholarship Fund', amount: 0, type: 'In-Kind', description: '10 STEM textbooks donated to the library', proofUrl: null, status: 'Pending', submittedAt: '2026-06-07' },
];

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [donations, setDonations] = useState<DonationRecord[]>(initialDonations);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const submitDonation = (d: Omit<DonationRecord, 'id' | 'status' | 'submittedAt'>) => {
    const rec: DonationRecord = { ...d, id: Date.now().toString(), status: 'Pending', submittedAt: new Date().toLocaleDateString('en-CA') };
    setDonations(prev => [rec, ...prev]);
    setCampaigns(prev => prev.map(c => c.name === d.campaign ? { ...c, current: c.current + d.amount } : c));
  };

  const verifyDonation = (id: string, verifiedBy: string) => {
    setDonations(prev => prev.map(d =>
      d.id === id ? { ...d, status: 'Verified', verifiedAt: new Date().toLocaleDateString('en-CA'), verifiedBy } : d
    ));
  };

  const rejectDonation = (id: string, reason: string, verifiedBy: string) => {
    setDonations(prev => prev.map(d =>
      d.id === id ? { ...d, status: 'Rejected', rejectionReason: reason, verifiedBy, verifiedAt: new Date().toLocaleDateString('en-CA') } : d
    ));
  };

  const addCampaign = (c: Omit<Campaign, 'id' | 'current'>) => {
    setCampaigns(prev => [...prev, { ...c, id: Date.now().toString(), current: 0 }]);
  };

  return <Ctx.Provider value={{ donations, campaigns, submitDonation, verifyDonation, rejectDonation, addCampaign }}>{children}</Ctx.Provider>;
}

export const useDonations = () => useContext(Ctx);
