import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { useAuth } from './AuthContext';
import { Tabs, Tab, Box, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Chip, Avatar } from '@mui/material';
import { Users, FileText, LogOut, Bell, Search, Download, TrendingUp, GraduationCap, Calendar } from 'lucide-react';
import EventCalendar from './shared/EventCalendar';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { label: 'Alumni Directory', icon: <Users className="w-4 h-4" />, path: '' },
    { label: 'Reports', icon: <FileText className="w-4 h-4" />, path: 'reports' },
    { label: 'Event Calendar', icon: <Calendar className="w-4 h-4" />, path: 'calendar' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-transparent bg-gradient-to-r from-white to-teal-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500"></div>
        <div className="px-6 py-4 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-full blur opacity-25 group-hover:opacity-40 transition"></div>
              <Avatar
                src={user?.profileImage}
                alt={user?.name}
                sx={{ width: 48, height: 48 }}
                className="relative ring-2 ring-teal-200"
              />
            </div>
            <div>
              <h1 className="text-xl bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                Asian College - Faculty Portal
              </h1>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Welcome, {user?.name} ({user?.department})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 rounded-xl relative group transition-all duration-300 hover:shadow-md">
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-teal-600 transition-colors" />
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
              navigate(`/user/${tabs[newValue].path}`);
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
          <Route index element={<AlumniDirectoryView />} />
          <Route path="reports" element={<FacultyReports />} />
          <Route path="calendar" element={<FacultyCalendar />} />
        </Routes>
      </main>
    </div>
  );
}

function AlumniDirectoryView() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState(user?.department || 'All');
  const [filterYear, setFilterYear] = useState('All');

  const alumni = [
    { id: '1', name: 'Oishi Regaspi', email: 'o***@email.com', department: 'CSE', batchYear: 2020, employmentStatus: 'Employed' },
    { id: '2', name: 'Rui Delmo', email: 'r***@email.com', department: 'CSE', batchYear: 2019, employmentStatus: 'Self-Employed' },
    { id: '3', name: 'Luwie Enolpe', email: 'l***@email.com', department: 'CSE', batchYear: 2021, employmentStatus: 'Employed' },
    { id: '4', name: 'Ashi Capistrano', email: 'a***@email.com', department: 'CSE', batchYear: 2020, employmentStatus: 'Pursuing Studies' },
  ];

  const filteredAlumni = alumni.filter(alum => {
    const matchesSearch = alum.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || alum.department === filterDept;
    const matchesYear = filterYear === 'All' || alum.batchYear.toString() === filterYear;
    return matchesSearch && matchesDept && matchesYear;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Alumni Directory</h2>
          <p className="text-gray-600">View alumni information for your department</p>
        </div>
        <Button
          variant="outlined"
          startIcon={<Download className="w-4 h-4" />}
        >
          Export List
        </Button>
      </div>

      {/* Notice */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg">
        <CardContent>
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm mb-1 font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">🔒 Limited Access Notice</h4>
              <p className="text-xs text-gray-700">
                As a faculty member, you have view-only access to alumni from your department.
                Email addresses are masked for privacy. Full contact details are available only to admin users.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField
              fullWidth
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search className="w-4 h-4 text-gray-400 mr-2" />
              }}
            />
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} label="Department">
                <MenuItem value="All">All Departments</MenuItem>
                <MenuItem value="CSE">CSE</MenuItem>
                <MenuItem value="CTHM">CTHM</MenuItem>
                <MenuItem value="BAA">BAA</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Batch Year</InputLabel>
              <Select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} label="Batch Year">
                <MenuItem value="All">All Years</MenuItem>
                <MenuItem value="2018">2018</MenuItem>
                <MenuItem value="2019">2019</MenuItem>
                <MenuItem value="2020">2020</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
              </Select>
            </FormControl>
          </div>
        </CardContent>
      </Card>

      {/* Alumni Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell>Name</TableCell>
              <TableCell>Email (Masked)</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Batch Year</TableCell>
              <TableCell>Employment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAlumni.map((alum) => (
              <TableRow key={alum.id} hover>
                <TableCell>{alum.name}</TableCell>
                <TableCell>{alum.email}</TableCell>
                <TableCell>{alum.department}</TableCell>
                <TableCell>{alum.batchYear}</TableCell>
                <TableCell>
                  <Chip
                    label={alum.employmentStatus}
                    size="small"
                    color={
                      alum.employmentStatus === 'Employed' ? 'success' :
                      alum.employmentStatus === 'Self-Employed' ? 'primary' :
                      alum.employmentStatus === 'Pursuing Studies' ? 'info' : 'default'
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function FacultyReports() {
  const { user } = useAuth();

  const departmentStats = {
    totalAlumni: 456,
    employed: 328,
    selfEmployed: 68,
    unemployed: 32,
    studying: 28
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Department Reports</h2>
          <p className="text-gray-600">View analytics for {user?.department} department</p>
        </div>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500 animate-slide-up">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Total Alumni</span>
              <div className="bg-blue-100 p-2 rounded-lg">
                <GraduationCap className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <p className="text-3xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{departmentStats.totalAlumni}</p>
            <p className="text-xs text-gray-500 mt-1">{user?.department} Department</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-green-500 animate-slide-up delay-100">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Employed</span>
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <p className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{departmentStats.employed}</p>
            <p className="text-xs text-gray-500 mt-1">{((departmentStats.employed / departmentStats.totalAlumni) * 100).toFixed(1)}% employment rate</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-500 animate-slide-up delay-200">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Self-Employed</span>
              <div className="bg-purple-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <p className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{departmentStats.selfEmployed}</p>
            <p className="text-xs text-gray-500 mt-1">Entrepreneurs</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-indigo-500 animate-slide-up delay-300">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Pursuing Studies</span>
              <div className="bg-indigo-100 p-2 rounded-lg">
                <GraduationCap className="w-5 h-5 text-indigo-500" />
              </div>
            </div>
            <p className="text-3xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{departmentStats.studying}</p>
            <p className="text-xs text-gray-500 mt-1">Further education</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h3 className="text-lg mb-4">Quick Export Reports</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm">Department Alumni List</p>
                  <p className="text-xs text-gray-600">All {user?.department} graduates</p>
                </div>
                <Button variant="outlined" size="small" startIcon={<Download className="w-3 h-3" />}>
                  CSV
                </Button>
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm">Employment Summary</p>
                  <p className="text-xs text-gray-600">Employment status overview</p>
                </div>
                <Button variant="outlined" size="small" startIcon={<Download className="w-3 h-3" />}>
                  PDF
                </Button>
              </div>
              <div className="border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm">Batch-wise Analysis</p>
                  <p className="text-xs text-gray-600">Year-by-year breakdown</p>
                </div>
                <Button variant="outlined" size="small" startIcon={<Download className="w-3 h-3" />}>
                  Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">New alumni registered</p>
                  <p className="text-xs text-gray-600">3 new CSE graduates added</p>
                </div>
                <span className="text-xs text-gray-500">2h ago</span>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Employment status updated</p>
                  <p className="text-xs text-gray-600">Oishi Regaspi - Now employed</p>
                </div>
                <span className="text-xs text-gray-500">5h ago</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Survey responses received</p>
                  <p className="text-xs text-gray-600">12 new tracer survey completions</p>
                </div>
                <span className="text-xs text-gray-500">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Access Limitation Notice */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent>
          <h4 className="text-sm mb-2">Faculty Access Limitations</h4>
          <p className="text-xs text-gray-700">
            As a faculty member, you can view department-specific reports and alumni directories.
            For comprehensive cross-department analytics and administrative functions, please contact the Alumni Office admin.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function FacultyCalendar() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-1">Event Calendar</h2>
        <p className="text-gray-600">View upcoming alumni events and activities</p>
      </div>

      <EventCalendar userRole="faculty" />
    </div>
  );
}
