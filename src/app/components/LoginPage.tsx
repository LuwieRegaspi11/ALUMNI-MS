import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from './AuthContext';
import { TextField, Button, Card, CardContent, Alert } from '@mui/material';
import { GraduationCap, UserPlus } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'alumni') navigate('/alumni');
      else if (user.role === 'faculty') navigate('/user');
      else if (user.role === 'representative') navigate('/representative');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>

      <Card className="w-full max-w-md shadow-2xl relative z-10">
        {/* Colorful Top Border */}
        <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <CardContent className="p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl mb-4 shadow-lg animate-float">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-300 rounded-full blur-2xl opacity-40 -z-10"></div>
            </div>
            <h1 className="text-3xl mb-2 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Asian College
            </h1>
            <p className="text-gray-600 text-center text-sm flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Alumni Tracer & Donation Management System
            </p>
          </div>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-300"
              sx={{
                '&:hover': {
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)'
                }
              }}
            >
              Sign In 🚀
            </Button>
          </form>

          {/* Registration Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-3">Don't have an account?</p>
            <Link to="/register" className="no-underline">
              <Button
                fullWidth
                variant="outlined"
                startIcon={<UserPlus className="w-4 h-4" />}
                className="border-2 transform hover:scale-105 transition-all duration-300"
                style={{
                  background: 'linear-gradient(to right, #3b82f6, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  border: '2px solid #a855f7',
                  borderImage: 'linear-gradient(to right, #3b82f6, #a855f7) 1'
                }}
                sx={{
                  '&:hover': {
                    background: 'linear-gradient(to right, #eff6ff, #faf5ff)',
                    boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)'
                  }
                }}
              >
                Sign Up ✨
              </Button>
            </Link>
          </div>

          <div className="mt-6 p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-blue-100 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔑</span>
              <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Demo Accounts:
              </p>
            </div>
            <div className="text-xs space-y-2">
              <div className="p-2 bg-white rounded-lg border border-blue-100">
                <p className="text-blue-600"><strong>👨‍💼 Admin:</strong> admin@asiancollege.edu / admin123</p>
              </div>
              <div className="p-2 bg-white rounded-lg border border-purple-100">
                <p className="text-purple-600"><strong>🎓 Alumni:</strong> oishi@alumni.com / alumni123</p>
              </div>
              <div className="p-2 bg-white rounded-lg border border-green-100">
                <p className="text-green-600"><strong>👨‍🏫 Faculty:</strong> faculty@asiancollege.edu / faculty123</p>
              </div>
              <div className="p-2 bg-white rounded-lg border border-teal-100">
                <p className="text-teal-600"><strong>👥 Batch Rep:</strong> luwie@alumni.com / rep123</p>
              </div>
            </div>
            <div className="mt-3 p-2 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
              <p className="text-xs text-gray-700">
                💡 <strong>Just registered?</strong> Use your email and password to log in!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
