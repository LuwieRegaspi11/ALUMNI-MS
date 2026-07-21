import React, { createContext, useContext, useState } from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract' | 'Internship';
  department: string;
  description: string;
  requirements: string;
  postedBy: string;
  postedByRole: string;
  postedAt: string;
  active: boolean;
  suggestedBy?: string;
  status: 'Active' | 'Pending' | 'Closed';
}

interface JobCtx {
  jobs: Job[];
  addJob: (j: Omit<Job, 'id' | 'postedAt' | 'active'>) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  closeJob: (id: string) => void;
  approveJob: (id: string) => void;
}

const Ctx = createContext<JobCtx>({ jobs: [], addJob: () => {}, updateJob: () => {}, closeJob: () => {}, approveJob: () => {} });

const initialJobs: Job[] = [
  { id: '1', title: 'Software Engineer', company: 'TechCorp Philippines', location: 'Cebu City', type: 'Full-time', department: 'CSE', description: 'Develop and maintain web applications using React and Node.js.', requirements: 'BS Computer Science or IT, 1-2 years experience, React, Node.js', postedBy: 'Admin', postedByRole: 'admin', postedAt: '2026-06-10', active: true, status: 'Active' },
  { id: '2', title: 'Hotel Front Desk Officer', company: 'Grand Palms Hotel', location: 'Dumaguete City', type: 'Full-time', department: 'CTHM', description: 'Handle guest check-in/check-out and provide excellent customer service.', requirements: 'BSHM graduate, good communication skills, customer service oriented', postedBy: 'Prof. Ana Reyes', postedByRole: 'faculty', postedAt: '2026-06-09', active: true, status: 'Active' },
  { id: '3', title: 'Accounting Staff', company: 'SME Finance Corp', location: 'Dumaguete City', type: 'Full-time', department: 'BAA', description: 'Handle accounts payable/receivable and financial reporting.', requirements: 'BSA or BSBA graduate, CPA preferred, MS Excel proficient', postedBy: 'Admin', postedByRole: 'admin', postedAt: '2026-06-08', active: true, status: 'Active' },
  { id: '4', title: 'IT Support Specialist', company: 'Digital Solutions Inc.', location: 'Remote', type: 'Remote', department: 'CSE', description: 'Provide technical support and maintain IT infrastructure.', requirements: 'BSIT graduate, networking knowledge, troubleshooting skills', postedBy: 'Maria Santos', postedByRole: 'alumni', postedAt: '2026-06-07', active: false, suggestedBy: 'Maria Santos', status: 'Pending' },
];

export function JobBoardProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const addJob = (j: Omit<Job, 'id' | 'postedAt' | 'active'>) => {
    setJobs(prev => [...prev, { ...j, id: Date.now().toString(), postedAt: new Date().toLocaleDateString('en-CA'), active: j.status === 'Active' }]);
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, ...updates } : j));
  };

  const closeJob = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, active: false, status: 'Closed' } : j));
  };

  const approveJob = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, active: true, status: 'Active' } : j));
  };

  return <Ctx.Provider value={{ jobs, addJob, updateJob, closeJob, approveJob }}>{children}</Ctx.Provider>;
}

export const useJobBoard = () => useContext(Ctx);
