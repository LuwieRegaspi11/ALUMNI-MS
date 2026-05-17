import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { DollarSign, Upload, CheckCircle, Clock, Heart, TrendingUp, Search } from 'lucide-react';

interface Donation {
  id: string;
  amount: number;
  project: string;
  date: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  type: 'Cash' | 'In-Kind';
}

const myDonations: Donation[] = [
  { id: '1', amount: 5000, project: 'Lab Upgrade 2024', date: '2024-05-05', status: 'Pending', type: 'Cash' },
  { id: '2', amount: 3000, project: 'Scholarship Fund', date: '2024-04-15', status: 'Verified', type: 'Cash' },
  { id: '3', amount: 0, project: 'Library Books', date: '2024-03-20', status: 'Verified', type: 'In-Kind' }
];

const projects = [
  { name: 'Lab Upgrade 2024', target: 500000, current: 325000, description: 'Modernize computer labs with new equipment' },
  { name: 'Scholarship Fund', target: 200000, current: 145000, description: 'Support financially challenged students' },
  { name: 'Library Books', target: 100000, current: 78000, description: 'Expand library collection with latest textbooks' },
  { name: 'Sports Equipment', target: 150000, current: 52000, description: 'Purchase new sports equipment for student athletes' }
];

export default function DonationPortal() {
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  const [donationType, setDonationType] = useState('Cash');
  const [selectedProject, setSelectedProject] = useState('');
  const [amount, setAmount] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [searchHistory, setSearchHistory] = useState('');
  const [searchProjects, setSearchProjects] = useState('');

  const filteredDonations = myDonations.filter(donation =>
    donation.project.toLowerCase().includes(searchHistory.toLowerCase()) ||
    donation.status.toLowerCase().includes(searchHistory.toLowerCase())
  );

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchProjects.toLowerCase()) ||
    project.description.toLowerCase().includes(searchProjects.toLowerCase())
  );

  const totalDonated = myDonations
    .filter(d => d.status === 'Verified')
    .reduce((sum, d) => sum + d.amount, 0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Donation Management</h2>
          <p className="text-gray-600">Support your alma mater through donations</p>
        </div>
        <Button
          variant="contained"
          startIcon={<Heart className="w-4 h-4" />}
          className="bg-blue-600"
          onClick={() => setDonateDialogOpen(true)}
        >
          Make a Donation
        </Button>
      </div>

      {/* Donation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Donated</span>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl">₱{totalDonated.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Lifetime contributions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Transactions</span>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl">{myDonations.length}</p>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Pending Verification</span>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl">{myDonations.filter(d => d.status === 'Pending').length}</p>
            <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg">Active Fundraising Projects</h3>
          <TextField
            size="small"
            placeholder="Search projects..."
            value={searchProjects}
            onChange={(e) => setSearchProjects(e.target.value)}
            InputProps={{
              startAdornment: <Search className="w-4 h-4 text-gray-400 mr-2" />
            }}
            sx={{ width: '300px' }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project, index) => {
            const percentage = (project.current / project.target) * 100;
            return (
              <Card key={index}>
                <CardContent>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-sm mb-1">{project.name}</h4>
                      <p className="text-xs text-gray-600">{project.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span>₱{project.current.toLocaleString()} / ₱{project.target.toLocaleString()}</span>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(percentage, 100)}
                      className="h-2 rounded"
                      color={percentage >= 100 ? 'success' : 'primary'}
                    />
                    <p className="text-xs text-gray-600">{percentage.toFixed(1)}% funded</p>
                  </div>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    className="mt-3"
                    onClick={() => {
                      setSelectedProject(project.name);
                      setDonateDialogOpen(true);
                    }}
                  >
                    Donate to this project
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* My Donation History */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">My Donation History</h3>
            <TextField
              size="small"
              placeholder="Search history..."
              value={searchHistory}
              onChange={(e) => setSearchHistory(e.target.value)}
              InputProps={{
                startAdornment: <Search className="w-4 h-4 text-gray-400 mr-2" />
              }}
              sx={{ width: '250px' }}
            />
          </div>
          {filteredDonations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No donations found matching your search</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDonations.map((donation) => (
              <div key={donation.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-sm">{donation.project}</p>
                      <Chip
                        label={donation.status}
                        size="small"
                        color={
                          donation.status === 'Verified' ? 'success' :
                          donation.status === 'Pending' ? 'warning' : 'error'
                        }
                        icon={
                          donation.status === 'Verified' ? <CheckCircle className="w-3 h-3" /> :
                          <Clock className="w-3 h-3" />
                        }
                      />
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>
                        {donation.type === 'Cash'
                          ? `₱${donation.amount.toLocaleString()}`
                          : 'In-Kind Donation'
                        }
                      </span>
                      <span>{new Date(donation.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {donation.status === 'Verified' && (
                    <Button variant="outlined" size="small">
                      Download Receipt
                    </Button>
                  )}
                </div>
              </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Donation Dialog */}
      <Dialog open={donateDialogOpen} onClose={() => setDonateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Make a Donation</DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-4">
            <FormControl fullWidth>
              <InputLabel>Donation Type</InputLabel>
              <Select
                value={donationType}
                onChange={(e) => setDonationType(e.target.value)}
                label="Donation Type"
              >
                <MenuItem value="Cash">Cash Donation (Bank Transfer)</MenuItem>
                <MenuItem value="In-Kind">In-Kind Donation (Equipment, Books, etc.)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Select Project</InputLabel>
              <Select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                label="Select Project"
              >
                <MenuItem value="">General Fund</MenuItem>
                {projects.map((project, index) => (
                  <MenuItem key={index} value={project.name}>{project.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {donationType === 'Cash' && (
              <>
                <TextField
                  fullWidth
                  label="Amount (₱)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="5000"
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm mb-2">Bank Transfer Instructions</h4>
                  <div className="text-xs text-gray-700 space-y-1">
                    <p><strong>Bank Name:</strong> BDO Unibank</p>
                    <p><strong>Account Name:</strong> Asian College Alumni Fund</p>
                    <p><strong>Account Number:</strong> 1234-5678-9012</p>
                    <p className="text-red-600 mt-2">After transferring, please upload your deposit slip or screenshot below.</p>
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm mb-2">Upload Bank Transfer Proof</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outlined" component="span" size="small">
                      Choose File
                    </Button>
                  </label>
                  {uploadedFile && (
                    <p className="text-xs text-green-600 mt-2">✓ {uploadedFile.name}</p>
                  )}
                </div>
              </>
            )}

            {donationType === 'In-Kind' && (
              <TextField
                fullWidth
                label="Description of Donation"
                multiline
                rows={4}
                placeholder="e.g., 10 Computer Science textbooks, 5 desktop computers, etc."
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDonateDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" className="bg-blue-600">
            Submit Donation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Thank You Note */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent>
          <div className="flex items-start gap-3">
            <Heart className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="text-sm mb-2">Thank You for Your Support!</h4>
              <p className="text-xs text-gray-700">
                Your donations help Asian College provide quality education and support to current students.
                Once verified, you will receive an official receipt and appreciation letter.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
