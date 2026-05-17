import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { useAuth } from './AuthContext';
import { Tabs, Tab, Box, Avatar, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Users, FileText, LogOut, Bell, CheckCircle, XCircle, Clock, UserCheck, TrendingUp, Search, Shield } from 'lucide-react';

interface BatchAlumni {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  program: string;
  registeredDate: string;
  isBatchVerified: boolean;
  isAdminApproved: boolean;
  surveyCompleted: boolean;
  profileImage?: string;
}

const mockBatchAlumni: BatchAlumni[] = [
  {
    id: '1',
    name: 'Oishi Regaspi',
    email: 'oishi@email.com',
    phone: '+63 912 345 6789',
    studentId: '2021-00456',
    department: 'CSE',
    program: 'BSIT',
    registeredDate: '2026-05-05T10:30:00',
    isBatchVerified: false,
    isAdminApproved: false,
    surveyCompleted: false,
    profileImage: 'https://ui-avatars.com/api/?name=Oishi+Regaspi&background=0ea5e9&color=fff'
  },
  {
    id: '2',
    name: 'Ashi Capistrano',
    email: 'ashi@email.com',
    phone: '+63 923 456 7890',
    studentId: '2021-00789',
    department: 'CSE',
    program: 'BSCS',
    registeredDate: '2026-05-04T14:20:00',
    isBatchVerified: true,
    isAdminApproved: true,
    surveyCompleted: true,
    profileImage: 'https://ui-avatars.com/api/?name=Ashi+Capistrano&background=10b981&color=fff'
  },
  {
    id: '3',
    name: 'Rui Elmido',
    email: 'rui.elmido@email.com',
    phone: '+63 934 567 8901',
    studentId: '2021-00321',
    department: 'CSE',
    program: 'BSCpE',
    registeredDate: '2026-05-03T09:15:00',
    isBatchVerified: true,
    isAdminApproved: false,
    surveyCompleted: false,
    profileImage: 'https://ui-avatars.com/api/?name=Rui+Elmido&background=f59e0b&color=fff'
  }
];

export default function RepresentativeDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { label: 'Batch Verification', icon: <UserCheck className="w-4 h-4" />, path: '' },
    { label: 'Survey Tracking', icon: <FileText className="w-4 h-4" />, path: 'surveys' },
    { label: 'My Activity Log', icon: <Shield className="w-4 h-4" />, path: 'activity' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-transparent bg-gradient-to-r from-white to-teal-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500"></div>
        <div className="px-6 py-4 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-green-400 rounded-full blur opacity-25 group-hover:opacity-40 transition"></div>
              <Avatar
                src={user?.profileImage}
                alt={user?.name}
                sx={{ width: 48, height: 48 }}
                className="relative ring-2 ring-teal-200"
              />
            </div>
            <div>
              <h1 className="text-xl bg-gradient-to-r from-teal-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
                Batch Representative Portal
              </h1>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {user?.name} - Batch {user?.assignedBatchYear} {user?.assignedDepartment} {user?.assignedProgram} Rep
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 hover:bg-gradient-to-r hover:from-teal-50 hover:to-green-50 rounded-xl relative group transition-all duration-300 hover:shadow-md">
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
              navigate(`/representative/${tabs[newValue].path}`);
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
          <Route index element={<BatchVerificationView
            batchYear={user?.assignedBatchYear || 2021}
            department={user?.assignedDepartment || 'CSE'}
            program={user?.assignedProgram || 'BSIT'}
          />} />
          <Route path="surveys" element={<SurveyTrackingView
            batchYear={user?.assignedBatchYear || 2021}
            department={user?.assignedDepartment || 'CSE'}
            program={user?.assignedProgram || 'BSIT'}
          />} />
          <Route path="activity" element={<ActivityLogView />} />
        </Routes>
      </main>
    </div>
  );
}

function BatchVerificationView({ batchYear, department, program }: { batchYear: number, department: string, program: string }) {
  const [alumni, setAlumni] = useState<BatchAlumni[]>(mockBatchAlumni);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlumni, setSelectedAlumni] = useState<BatchAlumni | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Filter alumni by assigned batch year, department, AND program
  const filteredAlumni = alumni.filter(alum => {
    const matchesBatchYear = true; // All mock data is from same batch in real scenario
    const matchesDepartment = alum.department === department;
    const matchesProgram = alum.program === program;
    const matchesSearch = alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alum.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alum.studentId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesBatchYear && matchesDepartment && matchesProgram && matchesSearch;
  });

  const pendingVerification = alumni.filter(a => !a.isBatchVerified).length;
  const verified = alumni.filter(a => a.isBatchVerified).length;
  const fullyApproved = alumni.filter(a => a.isAdminApproved).length;

  const handleVerify = (id: string) => {
    setAlumni(alumni.map(alum =>
      alum.id === id ? { ...alum, isBatchVerified: true } : alum
    ));
    setViewDialogOpen(false);
  };

  const handleReject = (id: string) => {
    setAlumni(alumni.map(alum =>
      alum.id === id ? { ...alum, isBatchVerified: false } : alum
    ));
    setViewDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1 bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent flex items-center gap-2">
            👥 Batch {batchYear} {department} {program} Verification
          </h2>
          <p className="text-gray-600">Verify your batch mates from {program} program before admin approval</p>
        </div>
      </div>

      {/* Info Banner */}
      <Card className="bg-gradient-to-r from-teal-50 to-green-50 border-2 border-teal-200 shadow-lg">
        <CardContent>
          <div className="flex items-start gap-3">
            <div className="bg-teal-100 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h4 className="text-sm mb-1 font-semibold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">🔒 Your Responsibilities</h4>
              <p className="text-xs text-gray-700">
                As Batch Representative, you can verify alumni from <strong>Batch {batchYear} {department} {program}</strong> only. Your verifications are logged and audited per RA 10175. You cannot access financial donation data or delete records.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-orange-500 animate-slide-up">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Pending Verification</span>
              <div className="bg-orange-100 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <p className="text-3xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{pendingVerification}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500 animate-slide-up delay-100">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Verified by You</span>
              <div className="bg-blue-100 p-2 rounded-lg">
                <UserCheck className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <p className="text-3xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{verified}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-all border-l-4 border-green-500 animate-slide-up delay-200">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Admin Approved</span>
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <p className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{fullyApproved}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search by name, email, or student ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search className="w-4 h-4 text-gray-400 mr-2" />
            }}
          />
        </CardContent>
      </Card>

      {/* Alumni Table */}
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-r from-teal-50 to-green-50">
              <TableCell>Alumni</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Program</TableCell>
              <TableCell>Batch Verified</TableCell>
              <TableCell>Admin Approved</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAlumni.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-gray-500">No alumni found</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredAlumni.map((alum) => (
                <TableRow key={alum.id} hover>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar src={alum.profileImage} alt={alum.name} />
                      <div>
                        <p className="text-sm">{alum.name}</p>
                        <p className="text-xs text-gray-500">{alum.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{alum.studentId}</TableCell>
                  <TableCell>{alum.program}</TableCell>
                  <TableCell>
                    <Chip
                      label={alum.isBatchVerified ? 'Verified' : 'Pending'}
                      size="small"
                      color={alum.isBatchVerified ? 'info' : 'warning'}
                      icon={alum.isBatchVerified ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={alum.isAdminApproved ? 'Approved' : 'Pending'}
                      size="small"
                      color={alum.isAdminApproved ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedAlumni(alum);
                          setViewDialogOpen(true);
                        }}
                      >
                        Review
                      </Button>
                      {!alum.isBatchVerified && (
                        <Button
                          size="small"
                          color="success"
                          onClick={() => handleVerify(alum.id)}
                        >
                          Verify
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Alumni Verification Review</DialogTitle>
        <DialogContent>
          {selectedAlumni && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <Avatar
                  src={selectedAlumni.profileImage}
                  alt={selectedAlumni.name}
                  sx={{ width: 80, height: 80 }}
                />
                <div>
                  <h3 className="text-xl">{selectedAlumni.name}</h3>
                  <p className="text-gray-600">{selectedAlumni.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Chip
                      label={selectedAlumni.isBatchVerified ? 'Batch Verified' : 'Not Verified'}
                      size="small"
                      color={selectedAlumni.isBatchVerified ? 'info' : 'warning'}
                    />
                    <Chip
                      label={selectedAlumni.isAdminApproved ? 'Admin Approved' : 'Pending Admin'}
                      size="small"
                      color={selectedAlumni.isAdminApproved ? 'success' : 'default'}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm mb-3">Academic Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Student ID</p>
                    <p className="text-sm">{selectedAlumni.studentId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Department</p>
                    <p className="text-sm">{selectedAlumni.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Program</p>
                    <p className="text-sm">{selectedAlumni.program}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Batch Year</p>
                    <p className="text-sm">2021</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-xs text-gray-700">
                  ⚠️ <strong>Verification Responsibility:</strong> By verifying this alumni, you confirm that this person was indeed a member of Batch 2021. This action will be logged in the audit trail.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          {selectedAlumni && !selectedAlumni.isBatchVerified && (
            <>
              <Button
                color="error"
                startIcon={<XCircle className="w-4 h-4" />}
                onClick={() => selectedAlumni && handleReject(selectedAlumni.id)}
              >
                Reject
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircle className="w-4 h-4" />}
                onClick={() => selectedAlumni && handleVerify(selectedAlumni.id)}
              >
                Verify Batch Mate
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

function SurveyTrackingView({ batchYear, department, program }: { batchYear: number, department: string, program: string }) {
  const allAlumni = mockBatchAlumni;
  // Filter by department and program
  const alumni = allAlumni.filter(a => a.department === department && a.program === program);
  const totalAlumni = alumni.length;
  const completedSurveys = alumni.filter(a => a.surveyCompleted).length;
  const pendingSurveys = totalAlumni - completedSurveys;
  const completionRate = totalAlumni > 0 ? ((completedSurveys / totalAlumni) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-1 bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent flex items-center gap-2">
          📊 Batch {batchYear} {department} {program} Survey Tracking
        </h2>
        <p className="text-gray-600">Monitor tracer survey completion for your program</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg border-l-4 border-blue-500">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Total Batch Members</span>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{totalAlumni}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-l-4 border-green-500">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Surveys Completed</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{completedSurveys}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-l-4 border-orange-500">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Pending</span>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{pendingSurveys}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-l-4 border-purple-500">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Completion Rate</span>
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{completionRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent>
          <h3 className="text-lg mb-4">Overall Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Survey Completion</span>
              <span className="font-semibold">{completedSurveys} / {totalAlumni}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-500 to-teal-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alumni Survey Status */}
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-r from-teal-50 to-green-50">
              <TableCell>Name</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Survey Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumni.map((alum) => (
              <TableRow key={alum.id} hover>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar src={alum.profileImage} alt={alum.name} />
                    <span>{alum.name}</span>
                  </div>
                </TableCell>
                <TableCell>{alum.studentId}</TableCell>
                <TableCell>
                  <Chip
                    label={alum.surveyCompleted ? 'Completed' : 'Pending'}
                    size="small"
                    color={alum.surveyCompleted ? 'success' : 'warning'}
                    icon={alum.surveyCompleted ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
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

function ActivityLogView() {
  const activityLogs = [
    { id: '1', action: 'Verified batch mate', details: 'Verified Ashi Capistrano (2021-00789)', timestamp: '2026-05-05 14:30:00', type: 'verification' },
    { id: '2', action: 'Verified batch mate', details: 'Verified Rui Elmido (2021-00321)', timestamp: '2026-05-05 10:15:00', type: 'verification' },
    { id: '3', action: 'Logged in', details: 'Accessed representative dashboard', timestamp: '2026-05-05 09:00:00', type: 'login' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-1 bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent flex items-center gap-2">
          🔐 Activity Log (RA 10175 Compliant)
        </h2>
        <p className="text-gray-600">All your actions are audited and logged</p>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-lg">
        <CardContent>
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm mb-1 font-semibold">Audit Trail Compliance</h4>
              <p className="text-xs text-gray-700">
                Per RA 10175 (Cybercrime Prevention Act), all verification actions are logged with timestamps and cannot be deleted. Logs are accessible to administrators.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-r from-teal-50 to-green-50">
              <TableCell>Timestamp</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activityLogs.map((log) => (
              <TableRow key={log.id} hover>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.details}</TableCell>
                <TableCell>
                  <Chip
                    label={log.type}
                    size="small"
                    color={log.type === 'verification' ? 'success' : 'default'}
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
