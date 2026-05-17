import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { useAuth } from './AuthContext';
import {
  Users,
  TrendingUp,
  DollarSign,
  FileText,
  Calendar,
  Settings,
  LogOut,
  BarChart3,
  Shield,
  Bell,
  UserCheck,
  UserCog
} from 'lucide-react';
import { Tabs, Tab, Box, Avatar } from '@mui/material';
import AlumniDatabase from './admin/AlumniDatabase';
import TracerSurveys from './admin/TracerSurveys';
import DonationMonitoring from './admin/DonationMonitoring';
import EventManagement from './admin/EventManagement';
import Reports from './admin/Reports';
import AuditLogs from './admin/AuditLogs';
import PendingRegistrations from './admin/PendingRegistrations';
import BatchRepresentatives from './admin/BatchRepresentatives';
import PopulationAnalytics from './admin/PopulationAnalytics';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const pendingRegistrationsCount = 2; // This would come from actual data

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" />, path: '' },
    { label: 'Pending Registrations', icon: <UserCheck className="w-4 h-4" />, path: 'registrations' },
    { label: 'Batch Representatives', icon: <UserCog className="w-4 h-4" />, path: 'representatives' },
    { label: 'Population Analytics', icon: <TrendingUp className="w-4 h-4" />, path: 'analytics' },
    { label: 'Alumni Database', icon: <Users className="w-4 h-4" />, path: 'alumni' },
    { label: 'Tracer Surveys', icon: <FileText className="w-4 h-4" />, path: 'surveys' },
    { label: 'Donations', icon: <DollarSign className="w-4 h-4" />, path: 'donations' },
    { label: 'Events', icon: <Calendar className="w-4 h-4" />, path: 'events' },
    { label: 'Reports', icon: <TrendingUp className="w-4 h-4" />, path: 'reports' },
    { label: 'Audit Logs', icon: <Shield className="w-4 h-4" />, path: 'audit' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-transparent bg-gradient-to-r from-white to-orange-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-purple-500"></div>
        <div className="px-6 py-4 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur opacity-25 group-hover:opacity-40 transition"></div>
              <Avatar
                src={user?.profileImage}
                alt={user?.name}
                sx={{ width: 48, height: 48 }}
                className="relative ring-2 ring-orange-200"
              />
            </div>
            <div>
              <h1 className="text-xl bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent">
                Asian College - Admin Portal
              </h1>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Welcome, {user?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="p-2.5 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 rounded-xl relative group transition-all duration-300 hover:shadow-md"
              onClick={() => {
                setCurrentTab(1);
                navigate('/admin/registrations');
              }}
            >
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" />
              {pendingRegistrationsCount > 0 && (
                <>
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse"></span>
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-in">
                    {pendingRegistrationsCount}
                  </span>
                </>
              )}
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
              navigate(`/admin/${tabs[newValue].path}`);
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                iconPosition="start"
                label={
                  <div className="flex items-center gap-2">
                    {tab.label}
                    {tab.path === 'registrations' && pendingRegistrationsCount > 0 && (
                      <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">
                        {pendingRegistrationsCount}
                      </span>
                    )}
                  </div>
                }
                sx={{ minHeight: 48 }}
              />
            ))}
          </Tabs>
        </Box>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="registrations" element={<PendingRegistrations />} />
          <Route path="representatives" element={<BatchRepresentatives />} />
          <Route path="analytics" element={<PopulationAnalytics />} />
          <Route path="alumni" element={<AlumniDatabase />} />
          <Route path="surveys" element={<TracerSurveys />} />
          <Route path="donations" element={<DonationMonitoring />} />
          <Route path="events" element={<EventManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="audit" element={<AuditLogs />} />
        </Routes>
      </main>
    </div>
  );
}

function DashboardOverview() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Alumni', value: '1,247', change: '+12%', icon: <Users className="w-6 h-6" />, color: 'bg-blue-500' },
    { label: 'Pending Registrations', value: '2', change: 'Needs review', icon: <UserCheck className="w-6 h-6" />, color: 'bg-orange-500', clickable: true, path: '/admin/registrations' },
    { label: 'Active Donors', value: '389', change: '+8%', icon: <DollarSign className="w-6 h-6" />, color: 'bg-green-500' },
    { label: 'Survey Responses', value: '856', change: '+15%', icon: <FileText className="w-6 h-6" />, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
              stat.clickable ? 'cursor-pointer hover:shadow-2xl hover:-translate-y-1' : 'hover:shadow-xl'
            } transition-all duration-300 relative overflow-hidden group animate-slide-up`}
            style={{
              borderLeftColor: stat.color.replace('bg-', '#').replace('blue-500', '#3b82f6').replace('orange-500', '#f97316').replace('green-500', '#22c55e').replace('purple-500', '#a855f7'),
              animationDelay: `${index * 100}ms`
            }}
            onClick={() => stat.clickable && stat.path && navigate(stat.path)}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between mb-4 relative">
              <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg transform group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${stat.clickable ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl mb-1 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{stat.value}</h3>
            <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
          <h2 className="text-lg mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Recent Activities</span>
          </h2>
          <div className="space-y-3">
            <ActivityItem
              action="New alumni registered"
              user="Rui Delmo (CTHM 2019)"
              time="2 hours ago"
            />
            <ActivityItem
              action="Donation verified"
              user="₱5,000 from Rui Elmido"
              time="4 hours ago"
            />
            <ActivityItem
              action="Survey completed"
              user="15 new responses received"
              time="6 hours ago"
            />
            <ActivityItem
              action="Event published"
              user="Alumni Homecoming 2026"
              time="1 day ago"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
          <h2 className="text-lg mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Department Distribution</span>
          </h2>
          <div className="space-y-3">
            <DeptBar dept="CSE" count={456} total={1247} color="bg-purple-500" />
            <DeptBar dept="CTHM" count={398} total={1247} color="bg-red-500" />
            <DeptBar dept="BAA" count={289} total={1247} color="bg-yellow-500" />
            <DeptBar dept="Others" count={104} total={1247} color="bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ action, user, time }: { action: string; user: string; time: string }) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b last:border-b-0">
      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
      <div className="flex-1">
        <p className="text-sm">{action}</p>
        <p className="text-sm text-gray-600">{user}</p>
      </div>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  );
}

function DeptBar({ dept, count, total, color }: { dept: string; count: number; total: number; color: string }) {
  const percentage = (count / total) * 100;
  // Map department to correct color
  const deptColors: { [key: string]: string } = {
    'CSE': 'bg-purple-500',
    'CTHM': 'bg-red-500',
    'BAA': 'bg-yellow-500',
    'Others': 'bg-gray-400'
  };
  const barColor = deptColors[dept] || color;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm">{dept}</span>
        <span className="text-sm text-gray-600">{count}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${barColor} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
