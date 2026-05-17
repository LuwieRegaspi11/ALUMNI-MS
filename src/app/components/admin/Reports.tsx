import React, { useState } from 'react';
import { Card, CardContent, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { FileText, Download, TrendingUp, Users, DollarSign, GraduationCap } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const employmentData = [
  { department: 'CSE', employed: 328, selfEmployed: 68, unemployed: 32, studying: 28 },
  { department: 'CTHM', employed: 289, selfEmployed: 54, unemployed: 38, studying: 17 },
  { department: 'BAA', employed: 215, selfEmployed: 42, unemployed: 22, studying: 10 }
];

const donationTrend = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 67000 },
  { month: 'May', amount: 73000 }
];

const alumniByYear = [
  { year: '2018', count: 187 },
  { year: '2019', count: 234 },
  { year: '2020', count: 298 },
  { year: '2021', count: 312 },
  { year: '2022', count: 216 }
];

const employmentStatusData = [
  { name: 'Employed', value: 832, color: '#10b981' },
  { name: 'Self-Employed', value: 164, color: '#3b82f6' },
  { name: 'Unemployed', value: 92, color: '#ef4444' },
  { name: 'Pursuing Studies', value: 55, color: '#8b5cf6' }
];

export default function Reports() {
  const [reportType, setReportType] = useState('employment');
  const [department, setDepartment] = useState('All');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Reports & Analytics</h2>
          <p className="text-gray-600">Departmental analytics and automated reporting</p>
        </div>
        <Button
          variant="contained"
          startIcon={<Download className="w-4 h-4" />}
          className="bg-blue-600"
        >
          Export All Reports
        </Button>
      </div>

      {/* Quick Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <GraduationCap className="w-8 h-8 text-blue-500" />
              <Download className="w-4 h-4 text-gray-400" />
            </div>
            <h4 className="text-sm mb-1">Employment Tracer</h4>
            <p className="text-xs text-gray-600">Annual accreditation report</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-8 h-8 text-green-500" />
              <Download className="w-4 h-4 text-gray-400" />
            </div>
            <h4 className="text-sm mb-1">Donation Summary</h4>
            <p className="text-xs text-gray-600">Financial contributions report</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8 text-purple-500" />
              <Download className="w-4 h-4 text-gray-400" />
            </div>
            <h4 className="text-sm mb-1">Alumni Directory</h4>
            <p className="text-xs text-gray-600">Complete alumni listing</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <Download className="w-4 h-4 text-gray-400" />
            </div>
            <h4 className="text-sm mb-1">Analytics Dashboard</h4>
            <p className="text-xs text-gray-600">Comprehensive analytics PDF</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select value={reportType} onChange={(e) => setReportType(e.target.value)} label="Report Type">
                <MenuItem value="employment">Employment Status</MenuItem>
                <MenuItem value="donations">Donation Trends</MenuItem>
                <MenuItem value="alumni">Alumni Distribution</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select value={department} onChange={(e) => setDepartment(e.target.value)} label="Department">
                <MenuItem value="All">All Departments</MenuItem>
                <MenuItem value="CSE">CSE</MenuItem>
                <MenuItem value="CTHM">CTHM</MenuItem>
                <MenuItem value="BAA">BAA</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" fullWidth className="h-14">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employment Status Chart */}
      <Card>
        <CardContent>
          <h3 className="text-lg mb-4">Employment Status by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={employmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="employed" fill="#10b981" name="Employed" />
              <Bar dataKey="selfEmployed" fill="#3b82f6" name="Self-Employed" />
              <Bar dataKey="unemployed" fill="#ef4444" name="Unemployed" />
              <Bar dataKey="studying" fill="#8b5cf6" name="Pursuing Studies" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Trends */}
        <Card>
          <CardContent>
            <h3 className="text-lg mb-4">Donation Trends (2026)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={donationTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} name="Donations (₱)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Overall Employment Status */}
        <Card>
          <CardContent>
            <h3 className="text-lg mb-4">Overall Employment Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={employmentStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {employmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {employmentStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alumni Distribution */}
      <Card>
        <CardContent>
          <h3 className="text-lg mb-4">Alumni Distribution by Batch Year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={alumniByYear}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Number of Alumni" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* One-Click Report Templates */}
      <Card>
        <CardContent>
          <h3 className="text-lg mb-4">One-Click Report Generation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm mb-1">Accreditation Report 2026</h4>
                  <p className="text-xs text-gray-600">Complete employment tracer for accreditation requirements</p>
                </div>
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <Button variant="outlined" size="small" fullWidth className="mt-2">
                Generate PDF
              </Button>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm mb-1">Donor Appreciation Letters</h4>
                  <p className="text-xs text-gray-600">Auto-generate thank you letters for all verified donations</p>
                </div>
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <Button variant="outlined" size="small" fullWidth className="mt-2">
                Generate Letters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
