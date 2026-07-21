import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  targetRole?: string; // undefined = all
  targetDept?: string;
  read: boolean;
  createdAt: string;
}

interface NotificationCtx {
  notifications: Notification[];
  unreadCount: (role: string, dept?: string) => number;
  trigger: (n: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markRead: (id: string) => void;
  markAllRead: (role: string, dept?: string) => void;
  getFor: (role: string, dept?: string) => Notification[];
}

const Ctx = createContext<NotificationCtx>({
  notifications: [], unreadCount: () => 0,
  trigger: () => {}, markRead: () => {}, markAllRead: () => {}, getFor: () => [],
});

const initNotifications: Notification[] = [
  { id: '1', title: 'Donation Verified', message: 'Your donation of ₱5,000 to Scholarship Fund has been verified.', type: 'success', targetRole: 'alumni', read: false, createdAt: '2026-06-10' },
  { id: '2', title: 'New Event Published', message: 'Alumni Homecoming 2026 has been scheduled for June 25.', type: 'info', read: false, createdAt: '2026-06-09' },
  { id: '3', title: 'Survey Deadline Reminder', message: 'The tracer survey closes on July 15. Please complete it soon.', type: 'warning', targetRole: 'alumni', read: false, createdAt: '2026-06-08' },
  { id: '4', title: 'Pending Registration', message: '2 new alumni registrations need your approval.', type: 'warning', targetRole: 'admin', read: false, createdAt: '2026-06-10' },
  { id: '5', title: 'Donation Submitted', message: 'A new donation from Juan Dela Cruz is pending verification.', type: 'info', targetRole: 'admin', read: false, createdAt: '2026-06-10' },
  { id: '6', title: 'New Batch Member Registered', message: 'A member of your batch has registered and needs verification.', type: 'info', targetRole: 'representative', read: false, createdAt: '2026-06-09' },
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initNotifications);

  const getFor = useCallback((role: string, dept?: string) =>
    notifications.filter(n =>
      (!n.targetRole || n.targetRole === role) &&
      (!n.targetDept || !dept || n.targetDept === dept)
    ).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [notifications]
  );

  const unreadCount = useCallback((role: string, dept?: string) =>
    getFor(role, dept).filter(n => !n.read).length,
    [getFor]
  );

  const trigger = useCallback((n: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
    setNotifications(prev => [{
      ...n, id: Date.now().toString(), read: false,
      createdAt: new Date().toLocaleDateString('en-CA'),
    }, ...prev]);
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllRead = useCallback((role: string, dept?: string) => {
    setNotifications(prev => prev.map(n =>
      (!n.targetRole || n.targetRole === role) && (!n.targetDept || !dept || n.targetDept === dept)
        ? { ...n, read: true } : n
    ));
  }, []);

  return <Ctx.Provider value={{ notifications, unreadCount, trigger, markRead, markAllRead, getFor }}>{children}</Ctx.Provider>;
}

export const useNotifications = () => useContext(Ctx);
