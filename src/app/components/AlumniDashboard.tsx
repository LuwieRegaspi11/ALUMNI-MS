import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { useAuth } from './AuthContext';
import { Tabs, Tab, Box, Avatar } from '@mui/material';
import { User, Briefcase, DollarSign, Calendar, LogOut, Bell } from 'lucide-react';
import AlumniProfile from './alumni/AlumniProfile';
import EmploymentTracking from './alumni/EmploymentTracking';
import DonationPortal from './alumni/DonationPortal';
import EventsView from './alumni/EventsView';

export default function AlumniDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { label: 'My Profile', icon: <User className="w-4 h-4" />, path: '' },
    { label: 'Employment Status', icon: <Briefcase className="w-4 h-4" />, path: 'employment' },
    { label: 'Donations', icon: <DollarSign className="w-4 h-4" />, path: 'donations' },
    { label: 'Events & Calendar', icon: <Calendar className="w-4 h-4" />, path: 'events' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-transparent bg-gradient-to-r from-white to-purple-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="px-6 py-4 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-25 group-hover:opacity-40 transition"></div>
              <Avatar
                src={user?.profileImage}
                alt={user?.name}
                sx={{ width: 48, height: 48 }}
                className="relative ring-2 ring-purple-200"
              />
            </div>
            <div>
              <h1 className="text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Asian College - Alumni Portal
              </h1>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Welcome back, {user?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl relative group transition-all duration-300 hover:shadow-md">
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-in">
                3
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-xl hover:from-red-100 hover:to-pink-100 transition-all duration-300 hover:shadow-md border border-red-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => {
              setCurrentTab(newValue);
              navigate(`/alumni/${tabs[newValue].path}`);
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
                sx={{ minHeight: 48 }}
              />
            ))}
          </Tabs>
        </Box>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Routes>
          <Route index element={<AlumniProfile />} />
          <Route path="employment" element={<EmploymentTracking />} />
          <Route path="donations" element={<DonationPortal />} />
          <Route path="events" element={<EventsView />} />
        </Routes>
      </main>
    </div>
  );
}
