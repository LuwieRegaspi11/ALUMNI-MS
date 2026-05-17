import React, { useState } from 'react';
import { Card, CardContent, Button, TextField, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { Briefcase, TrendingUp, Calendar, CheckCircle } from 'lucide-react';

export default function EmploymentTracking() {
  const [employmentStatus, setEmploymentStatus] = useState('Employed');

  const currentEmployment = {
    status: 'Employed',
    company: 'Tech Corp',
    position: 'Software Developer',
    startDate: '2020-07-01',
    salary: '₱40,000 - ₱50,000',
    alignment: 'Highly Aligned',
    lastUpdated: '2024-03-15'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Employment Status Tracking</h2>
          <p className="text-gray-600">Keep your employment information up-to-date</p>
        </div>
      </div>

      {/* Current Status Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg mb-1">Current Employment Status</h3>
                <p className="text-2xl">{currentEmployment.status}</p>
                <p className="text-sm text-gray-600 mt-1">Last updated: {new Date(currentEmployment.lastUpdated).toLocaleDateString()}</p>
              </div>
            </div>
            <Chip
              label="Verified"
              color="success"
              icon={<CheckCircle className="w-4 h-4" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Employment Details */}
      <Card>
        <CardContent>
          <h3 className="text-lg mb-4">Current Employment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Company</p>
              <p>{currentEmployment.company}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Position</p>
              <p>{currentEmployment.position}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Start Date</p>
              <p>{new Date(currentEmployment.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Salary Range</p>
              <p>{currentEmployment.salary}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Job-Degree Alignment</p>
              <Chip label={currentEmployment.alignment} color="success" size="small" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Update Employment Form */}
      <Card>
        <CardContent>
          <h3 className="text-lg mb-4">Update Employment Information</h3>
          <div className="space-y-4">
            <FormControl fullWidth>
              <InputLabel>Employment Status</InputLabel>
              <Select
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value)}
                label="Employment Status"
              >
                <MenuItem value="Employed">Employed</MenuItem>
                <MenuItem value="Self-Employed">Self-Employed</MenuItem>
                <MenuItem value="Unemployed">Unemployed</MenuItem>
                <MenuItem value="Pursuing Studies">Pursuing Further Studies</MenuItem>
              </Select>
            </FormControl>

            {(employmentStatus === 'Employed' || employmentStatus === 'Self-Employed') && (
              <>
                <TextField fullWidth label="Company Name" defaultValue={currentEmployment.company} />
                <TextField fullWidth label="Position/Job Title" defaultValue={currentEmployment.position} />
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    defaultValue={currentEmployment.startDate}
                    InputLabelProps={{ shrink: true }}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Monthly Salary Range</InputLabel>
                    <Select defaultValue="40-50k" label="Monthly Salary Range">
                      <MenuItem value="below-20k">Below ₱20,000</MenuItem>
                      <MenuItem value="20-30k">₱20,000 - ₱30,000</MenuItem>
                      <MenuItem value="30-40k">₱30,000 - ₱40,000</MenuItem>
                      <MenuItem value="40-50k">₱40,000 - ₱50,000</MenuItem>
                      <MenuItem value="above-50k">Above ₱50,000</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <FormControl fullWidth>
                  <InputLabel>How aligned is your job with your degree?</InputLabel>
                  <Select defaultValue="highly-aligned" label="How aligned is your job with your degree?">
                    <MenuItem value="highly-aligned">Highly Aligned</MenuItem>
                    <MenuItem value="somewhat-aligned">Somewhat Aligned</MenuItem>
                    <MenuItem value="not-aligned">Not Aligned</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}

            <div className="flex gap-3">
              <Button variant="contained" className="bg-blue-600" startIcon={<TrendingUp className="w-4 h-4" />}>
                Update Employment Status
              </Button>
              <Button variant="outlined">Cancel</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Surveys */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg mb-1">Pending Tracer Surveys</h3>
              <p className="text-sm text-gray-600">Complete these surveys to help improve our programs</p>
            </div>
            <Chip label="2 Pending" color="warning" />
          </div>
          <div className="space-y-3">
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm">2024 Employment Tracer Survey</p>
                  <p className="text-xs text-gray-600">Due: May 31, 2026</p>
                </div>
              </div>
              <Button variant="outlined" size="small">Complete Survey</Button>
            </div>
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm">CSE Career Path Survey</p>
                  <p className="text-xs text-gray-600">Due: June 15, 2026</p>
                </div>
              </div>
              <Button variant="outlined" size="small">Complete Survey</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
