import React, { useState } from 'react';
import { Search, Download, Edit, Archive, CheckCircle, Filter, X } from 'lucide-react';

const DEPARTMENTS = ['All', 'CSE', 'CTHM', 'BAA', 'CED', 'CN'];
const PROGRAMS = ['All', 'BSIT', 'BSCS', 'BSHM', 'BSBA', 'BSEd', 'BSN'];
const STATUSES = ['All', 'Employed', 'Self-Employed', 'Unemployed', 'Pursuing Studies'];

const mockAlumni = Array.from({ length: 20 }, (_, i) => ({
  id: `ALM-2020-${String(i + 1).padStart(4, '0')}`,
  name: ['Maria Santos', 'Juan Dela Cruz', 'Ana Reyes', 'Pedro Lim', 'Rosa Garcia',
         'Carlos Tan', 'Elena Cruz', 'Miguel Torres', 'Sofia Ramos', 'Luis Mendoza',
         'Carla Bautista', 'Ryan Ong', 'Jasmine Sy', 'Kenneth Chua', 'Patricia Go',
         'Albert Ng', 'Theresa Chan', 'Jerome Lao', 'Melissa Ko', 'Bernard Yu'][i],
  department: ['CSE','CSE','CTHM','BAA','CSE','CTHM','BAA','CSE','CTHM','BAA',
               'CSE','CSE','CTHM','BAA','CSE','CTHM','BAA','CSE','CTHM','BAA'][i],
  program: ['BSIT','BSCS','BSHM','BSBA','BSIT','BSHM','BSBA','BSCS','BSHM','BSBA',
            'BSIT','BSCS','BSHM','BSBA','BSIT','BSHM','BSBA','BSCS','BSHM','BSBA'][i],
  batchYear: 2018 + (i % 5),
  employmentStatus: ['Employed','Self-Employed','Employed','Unemployed','Pursuing Studies',
                     'Employed','Employed','Self-Employed','Employed','Employed',
                     'Unemployed','Employed','Pursuing Studies','Employed','Self-Employed',
                     'Employed','Employed','Unemployed','Employed','Employed'][i],
  email: `alumni${i + 1}@asiancollege.edu`,
  verified: i % 4 !== 3,
  active: i % 6 !== 5,
}));

export default function AlumniManagement() {
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterProgram, setFilterProgram] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [editTarget, setEditTarget] = useState<typeof mockAlumni[0] | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockAlumni.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !q || a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q) || a.email.includes(q);
    const matchDept = filterDept === 'All' || a.department === filterDept;
    const matchProgram = filterProgram === 'All' || a.program === filterProgram;
    const matchStatus = filterStatus === 'All' || a.employmentStatus === filterStatus;
    const matchYear = filterYear === 'All' || a.batchYear.toString() === filterYear;
    return matchSearch && matchDept && matchProgram && matchStatus && matchYear;
  });

  const statusColor = (s: string) => ({
    'Employed': 'bg-green-100 text-green-700',
    'Self-Employed': 'bg-blue-100 text-blue-700',
    'Unemployed': 'bg-red-100 text-red-700',
    'Pursuing Studies': 'bg-purple-100 text-purple-700',
  }[s] || 'bg-gray-100 text-gray-700');

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Alumni Management</h2>
          <p className="text-sm text-gray-500">Manage all registered alumni records</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>
      </div>

      {/* Search + filter bar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, student ID, or email..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400" />
          </div>
          <button onClick={() => setShowFilters(f => !f)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Department', value: filterDept, set: setFilterDept, opts: DEPARTMENTS },
              { label: 'Program', value: filterProgram, set: setFilterProgram, opts: PROGRAMS },
              { label: 'Employment', value: filterStatus, set: setFilterStatus, opts: STATUSES },
              { label: 'Batch Year', value: filterYear, set: setFilterYear, opts: ['All', '2018','2019','2020','2021','2022'] },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">{f.label}</label>
                <select value={f.value} onChange={e => f.set(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400">
                  {f.opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600">{filtered.length} alumni found</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Student ID','Name','Dept','Program','Batch','Employment','Status','Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{a.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-800">{a.name}</div>
                    <div className="text-xs text-gray-400">{a.email}</div>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-semibold">{a.department}</span></td>
                  <td className="px-4 py-3 text-gray-600">{a.program}</td>
                  <td className="px-4 py-3 text-gray-600">{a.batchYear}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColor(a.employmentStatus)}`}>{a.employmentStatus}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${a.verified ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {a.verified ? '✓ Verified' : '⏳ Unverified'}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${a.active ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                        {a.active ? 'Active' : 'Archived'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditTarget(a)} title="Edit"
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                      {!a.verified && (
                        <button title="Verify" className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors"><CheckCircle className="w-3.5 h-3.5" /></button>
                      )}
                      <button title="Archive" className="p-1.5 rounded-lg hover:bg-orange-50 text-orange-600 transition-colors"><Archive className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit dialog */}
      {editTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="font-bold text-gray-800">Edit Alumni Profile</h3>
              <button onClick={() => setEditTarget(null)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Full Name', val: editTarget.name },
                { label: 'Email', val: editTarget.email },
                { label: 'Program', val: editTarget.program },
                { label: 'Department', val: editTarget.department },
                { label: 'Batch Year', val: editTarget.batchYear.toString() },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">{f.label}</label>
                  <input defaultValue={f.val} className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setEditTarget(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={() => setEditTarget(null)} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#1B3A6B,#2B5BA8)' }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
