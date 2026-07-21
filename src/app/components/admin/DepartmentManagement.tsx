import React, { useState } from 'react';
import { Plus, Edit, Power, X, Users } from 'lucide-react';

interface Department {
  id: string;
  code: string;
  name: string;
  dean: string;
  alumniCount: number;
  active: boolean;
  programs: string[];
}

const initialDepts: Department[] = [
  { id: '1', code: 'CSE', name: 'College of Computer Science and Engineering', dean: 'Dr. Ricardo Gomez', alumniCount: 456, active: true, programs: ['BSIT','BSCS','BSIS'] },
  { id: '2', code: 'CTHM', name: 'College of Tourism and Hospitality Management', dean: 'Dr. Maria Lopez', alumniCount: 398, active: true, programs: ['BSHM','BSTM','BSHRM'] },
  { id: '3', code: 'BAA', name: 'College of Business Administration and Accountancy', dean: 'Dr. Jose Santos', alumniCount: 289, active: true, programs: ['BSBA','BSA','BSMA'] },
  { id: '4', code: 'CED', name: 'College of Education', dean: 'Dr. Ana Reyes', alumniCount: 67, active: true, programs: ['BSEd','BEEd','MAEd'] },
  { id: '5', code: 'CN', name: 'College of Nursing', dean: 'Dr. Liza Tan', alumniCount: 37, active: false, programs: ['BSN'] },
];

const BLANK: Omit<Department, 'id' | 'alumniCount'> = { code: '', name: '', dean: '', active: true, programs: [] };

export default function DepartmentManagement() {
  const [depts, setDepts] = useState(initialDepts);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Department | null>(null);
  const [form, setForm] = useState<typeof BLANK>({ ...BLANK });
  const [programInput, setProgramInput] = useState('');

  const openNew = () => { setEditTarget(null); setForm({ ...BLANK }); setProgramInput(''); setShowForm(true); };
  const openEdit = (d: Department) => { setEditTarget(d); setForm({ code: d.code, name: d.name, dean: d.dean, active: d.active, programs: [...d.programs] }); setProgramInput(''); setShowForm(true); };

  const handleSave = () => {
    if (editTarget) {
      setDepts(prev => prev.map(d => d.id === editTarget.id ? { ...d, ...form } : d));
    } else {
      setDepts(prev => [...prev, { ...form, id: Date.now().toString(), alumniCount: 0 }]);
    }
    setShowForm(false); setEditTarget(null);
  };

  const toggleActive = (id: string) => setDepts(prev => prev.map(d => d.id === id ? { ...d, active: !d.active } : d));

  const addProgram = () => {
    if (programInput.trim()) {
      setForm(f => ({ ...f, programs: [...f.programs, programInput.trim().toUpperCase()] }));
      setProgramInput('');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Department Management</h2>
          <p className="text-sm text-gray-500">Manage college departments and their programs</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#1B3A6B,#2B5BA8)' }}>
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Total Departments', value: depts.length, color: '#2B5BA8' },
          { label: 'Active', value: depts.filter(d => d.active).length, color: '#059669' },
          { label: 'Total Alumni', value: depts.reduce((s, d) => s + d.alumniCount, 0).toLocaleString(), color: '#7c3aed' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4" style={{ borderLeftWidth: 3, borderLeftColor: s.color }}>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Department cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {depts.map(d => (
          <div key={d.id} className={`bg-white rounded-xl border shadow-sm p-5 ${!d.active ? 'opacity-60' : 'border-gray-100'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg,#1B3A6B,#2B5BA8)' }}>
                  {d.code}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm leading-tight">{d.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Dean: {d.dean}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${d.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {d.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 font-semibold">{d.alumniCount} alumni</span>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {d.programs.map(p => (
                <span key={p} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{p}</span>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={() => openEdit(d)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button onClick={() => toggleActive(d.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold transition-colors ${d.active ? 'border border-orange-200 text-orange-600 hover:bg-orange-50' : 'border border-green-200 text-green-600 hover:bg-green-50'}`}>
                <Power className="w-3.5 h-3.5" /> {d.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="font-bold text-gray-800">{editTarget ? 'Edit Department' : 'Add Department'}</h3>
              <button onClick={() => { setShowForm(false); setEditTarget(null); }}><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Department Code', key: 'code', placeholder: 'e.g. CSE' },
                { label: 'Department Name', key: 'name', placeholder: 'e.g. College of Computer Science' },
                { label: 'Dean / Head', key: 'dean', placeholder: 'e.g. Dr. Juan Dela Cruz' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">{f.label}</label>
                  <input value={(form as any)[f.key]} onChange={e => setForm(prev => ({...prev, [f.key]: e.target.value}))}
                    placeholder={f.placeholder} className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400" />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Programs / Courses</label>
                <div className="flex gap-2 mb-2">
                  <input value={programInput} onChange={e => setProgramInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addProgram()}
                    placeholder="e.g. BSIT" className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400" />
                  <button onClick={addProgram} className="px-3 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: '#2B5BA8' }}>Add</button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {form.programs.map(p => (
                    <span key={p} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                      {p}
                      <button onClick={() => setForm(f => ({...f, programs: f.programs.filter(x => x !== p)}))}><X className="w-2.5 h-2.5" /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => { setShowForm(false); setEditTarget(null); }} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#1B3A6B,#2B5BA8)' }}>
                {editTarget ? 'Save Changes' : 'Add Department'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
