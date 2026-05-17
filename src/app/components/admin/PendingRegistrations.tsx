import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  TextField
} from '@mui/material';
import { CheckCircle, XCircle, Eye, Search, UserCheck, Shield } from 'lucide-react';

interface PendingAlumni {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  program: string;
  studentId: string;
  batchYear: number;
  graduationDate: string;
  currentEmploymentStatus: string;
  profileImage?: string;
  registeredDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  isBatchVerified: boolean;
  batchVerifiedBy?: string;
}

const mockPendingRegistrations: PendingAlumni[] = [
  {
    id: '1',
    name: 'Oishi Regaspi',
    email: 'oishi@email.com',
    phone: '+63 912 345 6789',
    department: 'CSE',
    program: 'Bachelor of Science in Computer Science',
    studentId: '2021-00456',
    batchYear: 2021,
    graduationDate: '2021-06-15',
    currentEmploymentStatus: 'Employed',
    profileImage: 'https://ui-avatars.com/api/?name=Oishi+Regaspi&background=0ea5e9&color=fff',
    registeredDate: '2026-05-05T10:30:00',
    status: 'Pending',
    isBatchVerified: false
  },
  {
    id: '2',
    name: 'Rui Delmo',
    email: 'rui.delmo@email.com',
    phone: '+63 923 456 7890',
    department: 'CTHM',
    program: 'BS in Hotel and Restaurant Management',
    studentId: '2020-00789',
    batchYear: 2020,
    graduationDate: '2020-06-20',
    currentEmploymentStatus: 'Self-Employed',
    profileImage: 'https://ui-avatars.com/api/?name=Rui+Delmo&background=10b981&color=fff',
    registeredDate: '2026-05-04T14:20:00',
    status: 'Pending',
    isBatchVerified: true,
    batchVerifiedBy: 'Ashi Capistrano (Batch Rep 2020)'
  },
  {
    id: '3',
    name: 'Luwie Enolpe',
    email: 'luwie@email.com',
    phone: '+63 934 567 8901',
    department: 'BAA',
    program: 'Bachelor of Science in Accountancy',
    studentId: '2019-00321',
    batchYear: 2019,
    graduationDate: '2019-06-10',
    currentEmploymentStatus: 'Employed',
    profileImage: 'https://ui-avatars.com/api/?name=Luwie+Enolpe&background=f59e0b&color=fff',
    registeredDate: '2026-05-03T09:15:00',
    status: 'Approved',
    isBatchVerified: true,
    batchVerifiedBy: 'Oii Partosa (Batch Rep 2019)'
  }
];

export default function PendingRegistrations() {
  const [registrations, setRegistrations] = useState<PendingAlumni[]>(mockPendingRegistrations);
  const [selectedAlumni, setSelectedAlumni] = useState<PendingAlumni | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRegistrations = registrations.filter(reg =>
    reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = registrations.filter(r => r.status === 'Pending').length;

  const handleView = (alumni: PendingAlumni) => {
    setSelectedAlumni(alumni);
    setViewDialogOpen(true);
  };

  const handleApprove = (id: string) => {
    setRegistrations(registrations.map(reg =>
      reg.id === id ? { ...reg, status: 'Approved' as const } : reg
    ));
    setViewDialogOpen(false);
  };

  const handleReject = (id: string) => {
    setRegistrations(registrations.map(reg =>
      reg.id === id ? { ...reg, status: 'Rejected' as const } : reg
    ));
    setViewDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-2">
            ✅ Pending Registrations
          </h2>
          <p className="text-gray-600">Review and approve new alumni registrations</p>
        </div>
        <Chip
          label={`${pendingCount} Pending`}
          color={pendingCount > 0 ? 'warning' : 'default'}
          icon={<UserCheck className="w-4 h-4" />}
          className="shadow-md"
          sx={{
            animation: pendingCount > 0 ? 'pulse 2s ease-in-out infinite' : 'none',
            fontSize: '1rem',
            padding: '1.5rem 0.5rem'
          }}
        />
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-orange-500 animate-slide-up">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Pending Review</span>
              <div className="bg-orange-100 p-2 rounded-lg">
                <UserCheck className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <p className="text-3xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500 animate-slide-up delay-100">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Approved</span>
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <p className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{registrations.filter(r => r.status === 'Approved').length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-red-500 animate-slide-up delay-200">
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 font-medium">Rejected</span>
              <div className="bg-red-100 p-2 rounded-lg">
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
            </div>
            <p className="text-3xl bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">{registrations.filter(r => r.status === 'Rejected').length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Registrations Table */}
      <TableContainer component={Paper} className="shadow-sm">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell>Alumni</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Batch Year</TableCell>
              <TableCell>Batch Verified</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRegistrations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <p className="text-gray-500">No registrations found</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredRegistrations.map((alumni) => (
                <TableRow key={alumni.id} hover>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar src={alumni.profileImage} alt={alumni.name} />
                      <div>
                        <p className="text-sm">{alumni.name}</p>
                        <p className="text-xs text-gray-500">{alumni.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{alumni.studentId}</TableCell>
                  <TableCell>{alumni.department}</TableCell>
                  <TableCell>{alumni.batchYear}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Chip
                        label={alumni.isBatchVerified ? 'Verified' : 'Not Verified'}
                        size="small"
                        color={alumni.isBatchVerified ? 'info' : 'default'}
                        icon={alumni.isBatchVerified ? <Shield className="w-3 h-3" /> : undefined}
                      />
                      {alumni.isBatchVerified && alumni.batchVerifiedBy && (
                        <span className="text-xs text-gray-500">By: {alumni.batchVerifiedBy}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={alumni.status}
                      size="small"
                      color={
                        alumni.status === 'Approved' ? 'success' :
                        alumni.status === 'Pending' ? 'warning' : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="small"
                        onClick={() => handleView(alumni)}
                        startIcon={<Eye className="w-3 h-3" />}
                      >
                        Review
                      </Button>
                      {alumni.status === 'Pending' && (
                        <>
                          <Button
                            size="small"
                            color="success"
                            onClick={() => handleApprove(alumni.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => handleReject(alumni.id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Registration Review</DialogTitle>
        <DialogContent>
          {selectedAlumni && (
            <div className="space-y-4 pt-4">
              {/* Profile Image */}
              <div className="flex items-center gap-4 pb-4 border-b">
                <Avatar
                  src={selectedAlumni.profileImage}
                  alt={selectedAlumni.name}
                  sx={{ width: 80, height: 80 }}
                />
                <div>
                  <h3 className="text-xl">{selectedAlumni.name}</h3>
                  <p className="text-gray-600">{selectedAlumni.email}</p>
                  <Chip
                    label={selectedAlumni.status}
                    size="small"
                    color={
                      selectedAlumni.status === 'Approved' ? 'success' :
                      selectedAlumni.status === 'Pending' ? 'warning' : 'error'
                    }
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h4 className="text-sm mb-3">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Phone Number</p>
                    <p className="text-sm">{selectedAlumni.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm">{selectedAlumni.email}</p>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
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
                    <p className="text-sm">{selectedAlumni.batchYear}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Graduation Date</p>
                    <p className="text-sm">{new Date(selectedAlumni.graduationDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Employment Status</p>
                    <p className="text-sm">{selectedAlumni.currentEmploymentStatus || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Registration Date */}
              <div className="pt-4 border-t">
                <p className="text-xs text-gray-600">Registration Date</p>
                <p className="text-sm">{new Date(selectedAlumni.registeredDate).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          {selectedAlumni?.status === 'Pending' && (
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
                onClick={() => selectedAlumni && handleApprove(selectedAlumni.id)}
              >
                Approve Registration
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
