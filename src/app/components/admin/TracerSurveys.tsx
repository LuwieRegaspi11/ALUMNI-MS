import React, { useState } from 'react';
import { Button, Card, CardContent, LinearProgress, Chip, TextField } from '@mui/material';
import { FileText, Send, Eye, BarChart3, Download, Search } from 'lucide-react';

interface Survey {
  id: string;
  title: string;
  description: string;
  targetDept: string;
  targetYear: string;
  totalSent: number;
  totalResponses: number;
  status: 'Draft' | 'Active' | 'Closed';
  createdDate: string;
}

const mockSurveys: Survey[] = [
  {
    id: '1',
    title: '2024 Employment Tracer Survey',
    description: 'Annual employment status tracking for all alumni',
    targetDept: 'All',
    targetYear: 'All',
    totalSent: 1247,
    totalResponses: 856,
    status: 'Active',
    createdDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'CSE Alumni Career Path Survey',
    description: 'Tracking career progression of Computer Science graduates',
    targetDept: 'CSE',
    targetYear: '2020-2023',
    totalSent: 234,
    totalResponses: 189,
    status: 'Active',
    createdDate: '2024-02-01'
  },
  {
    id: '3',
    title: 'CTHM Industry Feedback 2023',
    description: 'Feedback on tourism and hospitality industry trends',
    targetDept: 'CTHM',
    targetYear: '2018-2022',
    totalSent: 312,
    totalResponses: 312,
    status: 'Closed',
    createdDate: '2023-11-20'
  }
];

export default function TracerSurveys() {
  const [surveys] = useState<Survey[]>(mockSurveys);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSurveys = surveys.filter(survey =>
    survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.targetDept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Tracer Surveys</h2>
          <p className="text-gray-600">Deploy and monitor alumni tracer surveys</p>
        </div>
        <Button
          variant="contained"
          startIcon={<FileText className="w-4 h-4" />}
          className="bg-blue-600"
        >
          Create New Survey
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search surveys by title, description, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search className="w-4 h-4 text-gray-400 mr-2" />
            }}
          />
        </CardContent>
      </Card>

      {/* Survey Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Surveys</span>
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Active Surveys</span>
              <Send className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Avg Response Rate</span>
              <BarChart3 className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl">68.6%</p>
          </CardContent>
        </Card>
      </div>

      {/* Survey List */}
      <div className="space-y-4">
        {filteredSurveys.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No surveys found matching your search</p>
            </CardContent>
          </Card>
        ) : (
          filteredSurveys.map((survey) => {
          const responseRate = (survey.totalResponses / survey.totalSent) * 100;
          return (
            <Card key={survey.id}>
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg">{survey.title}</h3>
                      <Chip
                        label={survey.status}
                        size="small"
                        color={
                          survey.status === 'Active' ? 'success' :
                          survey.status === 'Draft' ? 'default' : 'error'
                        }
                      />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{survey.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Target: {survey.targetDept} • {survey.targetYear}</span>
                      <span>Created: {new Date(survey.createdDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Eye className="w-4 h-4" />}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Download className="w-4 h-4" />}
                    >
                      Export
                    </Button>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Response Rate</span>
                    <span>{survey.totalResponses} / {survey.totalSent} ({responseRate.toFixed(1)}%)</span>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={responseRate}
                    className="h-2 rounded"
                  />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <p className="text-xs text-gray-600">Employed</p>
                    <p className="text-sm">72%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Self-Employed</p>
                    <p className="text-sm">15%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Unemployed</p>
                    <p className="text-sm">8%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Pursuing Studies</p>
                    <p className="text-sm">5%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
          })
        )}
      </div>

      {/* Survey Template Preview */}
      <Card>
        <CardContent>
          <h3 className="text-lg mb-4">Quick Deploy Template</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <p className="text-sm">Standard Employment Tracer Questions:</p>
            <ul className="text-sm text-gray-600 space-y-1 ml-4">
              <li>• Current employment status</li>
              <li>• Company name and position (if employed)</li>
              <li>• Job alignment with degree program</li>
              <li>• Monthly income range</li>
              <li>• Skills utilized in current work</li>
              <li>• Recommendations for curriculum improvement</li>
            </ul>
            <Button variant="contained" size="small" className="bg-blue-600">
              Deploy to All Alumni
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
