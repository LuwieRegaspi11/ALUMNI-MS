import React, { createContext, useContext, useState } from 'react';

export interface AppEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  department: string; // 'All' | 'CSE' | 'CTHM' | 'BAA'
  createdBy: string;  // role: 'admin' | 'faculty'
  registeredCount: number;
  maxCapacity?: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  imageUrl?: string;
}

interface EventsCtx {
  events: AppEvent[];
  addEvent: (e: Omit<AppEvent, 'id' | 'registeredCount' | 'status'>) => void;
}

const Ctx = createContext<EventsCtx>({ events: [], addEvent: () => {} });

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<AppEvent[]>([]);

  const addEvent = (e: Omit<AppEvent, 'id' | 'registeredCount' | 'status'>) => {
    setEvents(prev => [
      ...prev,
      { ...e, id: Date.now().toString(), registeredCount: 0, status: 'Upcoming' },
    ]);
  };

  return <Ctx.Provider value={{ events, addEvent }}>{children}</Ctx.Provider>;
}

export const useEvents = () => useContext(Ctx);
