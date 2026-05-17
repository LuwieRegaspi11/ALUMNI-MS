import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'alumni' | 'faculty' | 'representative';
  department?: string;
  batchYear?: number;
  program?: string;
  profileImage?: string;
  assignedBatchYear?: number; // For batch representatives
  assignedDepartment?: string; // For batch representatives
  assignedProgram?: string; // For batch representatives
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  studentId: string;
  department: string;
  program: string;
  batchYear: number;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (data: RegistrationData) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data with password
interface MockUser extends User {
  password: string;
}

const initialMockUsers: MockUser[] = [
  { id: '1', name: 'Admin User', email: 'admin@asiancollege.edu', password: 'admin123', role: 'admin' as const, profileImage: 'https://ui-avatars.com/api/?name=Admin+User&background=2563eb&color=fff' },
  { id: '2', name: 'Oishi Regaspi', email: 'oishi@alumni.com', password: 'alumni123', role: 'alumni' as const, department: 'CSE', batchYear: 2020, program: 'BSIT', profileImage: 'https://ui-avatars.com/api/?name=Oishi+Regaspi&background=0ea5e9&color=fff' },
  { id: '3', name: 'Rui Delmo', email: 'rui.delmo@alumni.com', password: 'alumni123', role: 'alumni' as const, department: 'CTHM', batchYear: 2019, program: 'BSHM', profileImage: 'https://ui-avatars.com/api/?name=Rui+Delmo&background=ec4899&color=fff' },
  { id: '4', name: 'Faculty Member', email: 'faculty@asiancollege.edu', password: 'faculty123', role: 'faculty' as const, department: 'CSE', profileImage: 'https://ui-avatars.com/api/?name=Faculty+Member&background=8b5cf6&color=fff' },
  { id: '5', name: 'Luwie Enolpe', email: 'luwie@alumni.com', password: 'rep123', role: 'representative' as const, department: 'CSE', batchYear: 2021, program: 'BSIT', assignedBatchYear: 2021, assignedDepartment: 'CSE', assignedProgram: 'BSIT', profileImage: 'https://ui-avatars.com/api/?name=Luwie+Enolpe&background=10b981&color=fff' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mockUsers, setMockUsers] = useState<MockUser[]>(initialMockUsers);

  const login = (email: string, password: string): boolean => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (data: RegistrationData): boolean => {
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === data.email);
    if (existingUser) {
      return false; // Email already registered
    }

    // Create new user
    const newUser: MockUser = {
      id: String(mockUsers.length + 1),
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
      role: 'alumni',
      department: data.department,
      batchYear: data.batchYear,
      profileImage: data.profileImage || `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=0ea5e9&color=fff`
    };

    // Add to mock users
    setMockUsers([...mockUsers, newUser]);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
