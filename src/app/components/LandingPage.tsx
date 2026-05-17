import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import {
  GraduationCap,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Shield,
  CheckCircle,
  ArrowRight,
  Heart,
  Award,
  Globe,
  BookOpen
} from 'lucide-react';
import asianCollegeLogo from '../../imports/asiancollege_logo.jpg';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Alumni Database',
      description: 'Comprehensive alumni records with verified information and employment tracking',
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Batch Verification',
      description: 'Decentralized verification system with batch representatives per year, department, and program',
      color: 'from-teal-500 to-green-500',
      bgColor: 'bg-teal-50'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Tracer Surveys',
      description: 'Track alumni employment status, career progression, and professional achievements',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Donation Management',
      description: 'Transparent donation tracking with verification workflow and project allocation',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Event Management',
      description: 'Organize homecomings, reunions, and networking events for alumni community',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Analytics & Reports',
      description: 'Real-time population analytics, employment statistics, and comprehensive reporting',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50'
    }
  ];

  const stats = [
    { label: 'Total Alumni', value: '1,247+', icon: <Users className="w-6 h-6" /> },
    { label: 'Active Donors', value: '389', icon: <Heart className="w-6 h-6" /> },
    { label: 'Departments', value: '3', icon: <BookOpen className="w-6 h-6" /> },
    { label: 'Programs', value: '10+', icon: <GraduationCap className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b-2 border-transparent sticky top-0 z-50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-purple-500"></div>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={asianCollegeLogo}
              alt="Asian College Logo"
              className="w-12 h-12 object-contain rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent">
                Asian College
              </h1>
              <p className="text-xs text-gray-600">Alumni Tracer & Donation System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outlined"
              onClick={() => navigate('/login')}
              className="border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
            >
              Register Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6 animate-bounce-in">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              ✨ Now with Real-time Analytics & RA 10175 Compliance
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Connect, Track & Give Back
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Asian College's comprehensive platform for alumni engagement, career tracking, and donation management.
            Stay connected with your batch mates and contribute to the future of education.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              endIcon={<ArrowRight className="w-5 h-5" />}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-xl text-lg px-8 py-3"
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 text-lg px-8 py-3"
            >
              Explore Features
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 p-3 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features for Alumni Management
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage alumni records, track careers, and facilitate donations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.bgColor} rounded-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-white animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 shadow-lg`}>
                  {feature.icon}
                </div>
                <h4 className={`text-xl mb-3 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.title}
                </h4>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Departments
          </h3>
          <p className="text-lg text-gray-600">
            Serving alumni across three major departments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-purple-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">💻</span>
            </div>
            <h4 className="text-2xl mb-3 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              CSE
            </h4>
            <p className="text-gray-600 mb-4">Computer Science & Engineering</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• BS Information Technology</p>
              <p>• BS Computer Science</p>
              <p>• BS Computer Engineering</p>
              <p>• BS Information Systems</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🏨</span>
            </div>
            <h4 className="text-2xl mb-3 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              CTHM
            </h4>
            <p className="text-gray-600 mb-4">Tourism & Hospitality Management</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• BS Hospitality Management</p>
              <p>• BS Tourism Management</p>
              <p>• BS Hotel & Restaurant Management</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-yellow-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">💼</span>
            </div>
            <h4 className="text-2xl mb-3 bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
              BAA
            </h4>
            <p className="text-gray-600 mb-4">Business & Accountancy</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• BS Accountancy</p>
              <p>• BS Business Administration</p>
              <p>• BS Accounting Information System</p>
              <p>• BS Entrepreneurship</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-white p-4 rounded-2xl shadow-2xl mb-6">
            <img
              src={asianCollegeLogo}
              alt="Asian College Logo"
              className="w-16 h-16 object-contain mx-auto rounded-lg"
            />
          </div>
          <h3 className="text-4xl text-white mb-6">
            Join the Asian College Alumni Network
          </h3>
          <p className="text-xl text-white/90 mb-8">
            Register now to connect with fellow alumni, update your career information, and contribute to our community
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              className="bg-white text-orange-600 hover:bg-gray-100 shadow-2xl text-lg px-8 py-3"
              endIcon={<ArrowRight className="w-5 h-5" />}
            >
              Register as Alumni
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3"
            >
              Sign In
            </Button>
          </div>
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto border border-white/20">
            <p className="text-white text-sm">
              💡 <strong>Need assistance?</strong> For any concerns please approach the Alumni Admin Office
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={asianCollegeLogo}
                  alt="Asian College Logo"
                  className="w-10 h-10 object-contain rounded-lg"
                />
                <div>
                  <h4 className="font-bold">Asian College</h4>
                  <p className="text-xs text-gray-400">Alumni System</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Building stronger connections between alumni and their alma mater.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="hover:text-white cursor-pointer transition-colors">About Us</p>
                <p className="hover:text-white cursor-pointer transition-colors">Alumni Directory</p>
                <p className="hover:text-white cursor-pointer transition-colors">Events</p>
                <p className="hover:text-white cursor-pointer transition-colors">Donations</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📧 admin@asiancollege.edu.ph</p>
                <p>📞 (035) 523 5373</p>
                <p>📍 Dr. V. Locsin Street, Dumaguete City, Philippines, 6200</p>
                <p>🌐 asiancollege.edu.ph</p>
                <p>📱 @asiancollegedgte</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 Asian College - Dumaguete Campus (Official). All rights reserved.</p>
            <p className="mt-2">RA 10173 & RA 10175 Compliant | Data Privacy Protected</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
