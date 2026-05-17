import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert,
  Avatar
} from '@mui/material';
import { GraduationCap, ArrowLeft, ArrowRight, Camera } from 'lucide-react';
import { useAuth } from './AuthContext';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('');
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Form data
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',

    // Academic Information
    studentId: '',
    department: '',
    program: '',
    batchYear: '' as string | number,
    graduationDate: '',

    // Additional Information
    currentEmploymentStatus: '',
    agreeToTerms: false
  });

  const steps = ['Personal Info', 'Academic Info', 'Create Account'];

  const stepColors = [
    { bg: 'from-blue-500 to-indigo-600', icon: '👤' },
    { bg: 'from-purple-500 to-pink-600', icon: '🎓' },
    { bg: 'from-green-500 to-teal-600', icon: '✨' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    // If department changes, reset program selection
    if (field === 'department') {
      setFormData({ ...formData, [field]: value, program: '' });
    } else {
      setFormData({ ...formData, [field]: value });
    }
    setError('');
  };

  // Get programs based on selected department
  const getProgramsByDepartment = (dept: string) => {
    const programsByDept: { [key: string]: Array<{code: string, name: string}> } = {
      'CSE': [
        { code: 'BSIT', name: 'BS in Information Technology (BSIT)' },
        { code: 'BSCS', name: 'BS in Computer Science (BSCS)' },
        { code: 'BSCOE', name: 'BS in Computer Engineering (BSCpE)' },
        { code: 'BSIS', name: 'BS in Information Systems (BSIS)' }
      ],
      'CTHM': [
        { code: 'BSHM', name: 'BS in Hospitality Management (BSHM)' },
        { code: 'BSTM', name: 'BS in Tourism Management (BSTM)' },
        { code: 'BSHRM', name: 'BS in Hotel & Restaurant Management (BSHRM)' }
      ],
      'BAA': [
        { code: 'BSA', name: 'BS in Accountancy (BSA)' },
        { code: 'BSBA', name: 'BS in Business Administration (BSBA)' },
        { code: 'BSAIS', name: 'BS in Accounting Information System (BSAIS)' },
        { code: 'BSE', name: 'BS in Entrepreneurship (BSE)' }
      ],
      'CED': [
        { code: 'BEED', name: 'Bachelor of Elementary Education (BEEd)' },
        { code: 'BSED', name: 'Bachelor of Secondary Education (BSEd)' }
      ],
      'CAS': [
        { code: 'AB', name: 'Bachelor of Arts (AB)' },
        { code: 'BSP', name: 'BS in Psychology (BSP)' }
      ]
    };
    return programsByDept[dept] || [];
  };

  const validateStep = (step: number): boolean => {
    setError('');

    switch (step) {
      case 0: // Personal Information
        if (!formData.firstName || !formData.lastName || !formData.email) {
          setError('Please fill in all required personal information fields');
          return false;
        }
        if (!formData.email.includes('@')) {
          setError('Please enter a valid email address');
          return false;
        }
        if (!formData.phone) {
          setError('Phone number is required');
          return false;
        }
        break;

      case 1: // Academic Information
        if (!formData.studentId) {
          setError('Student ID is required');
          return false;
        }
        if (!formData.department) {
          setError('Please select a department');
          return false;
        }
        if (!formData.program) {
          setError('Please select a program/course');
          return false;
        }
        if (!formData.batchYear) {
          setError('Please select your batch year');
          return false;
        }
        if (!formData.graduationDate) {
          setError('Please enter your graduation date');
          return false;
        }
        break;

      case 2: // Account Setup
        if (!formData.password || !formData.confirmPassword) {
          setError('Please enter and confirm your password');
          return false;
        }
        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters long');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
        if (!formData.agreeToTerms) {
          setError('You must agree to the terms and conditions');
          return false;
        }
        break;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError('');
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      // Register the new user
      const registrationSuccess = register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        studentId: formData.studentId,
        department: formData.department,
        program: formData.program,
        batchYear: Number(formData.batchYear),
        profileImage: profileImage
      });

      if (registrationSuccess) {
        setRegisteredEmail(formData.email);
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 4000);
      } else {
        setError('This email is already registered. Please use a different email or sign in.');
      }
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
              <div className="text-4xl animate-bounce-in">{stepColors[0].icon}</div>
              <div>
                <h3 className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Personal Information
                </h3>
                <p className="text-xs text-gray-600">Let's get to know you better!</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="First Name"
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
              <TextField
                fullWidth
                label="Last Name"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              helperText="Use your personal email address"
            />
            <TextField
              fullWidth
              label="Phone Number"
              required
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+63 912 345 6789"
            />
            <TextField
              fullWidth
              label="Current Address"
              multiline
              rows={2}
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-500">
              <div className="text-4xl animate-bounce-in">{stepColors[1].icon}</div>
              <div>
                <h3 className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Academic Information
                </h3>
                <p className="text-xs text-gray-600">Tell us about your educational journey!</p>
              </div>
            </div>
            <TextField
              fullWidth
              label="Student ID Number"
              required
              value={formData.studentId}
              onChange={(e) => handleInputChange('studentId', e.target.value)}
              placeholder="e.g., 2020-00123"
            />
            <FormControl fullWidth required>
              <InputLabel>Department/College</InputLabel>
              <Select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                label="Department/College"
              >
                <MenuItem key="placeholder-dept" value="">Select Department</MenuItem>
                <MenuItem key="CSE" value="CSE">Computer Science & Engineering (CSE)</MenuItem>
                <MenuItem key="CTHM" value="CTHM">College of Tourism & Hospitality Management (CTHM)</MenuItem>
                <MenuItem key="BAA" value="BAA">Business Administration & Accountancy (BAA)</MenuItem>
                <MenuItem key="CED" value="CED">College of Education (CED)</MenuItem>
                <MenuItem key="CAS" value="CAS">College of Arts & Sciences (CAS)</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel>Program/Course</InputLabel>
              <Select
                value={formData.program}
                onChange={(e) => handleInputChange('program', e.target.value)}
                label="Program/Course"
                disabled={!formData.department}
              >
                <MenuItem key="placeholder-program" value="" disabled>
                  {formData.department ? 'Select Program' : 'Please select department first'}
                </MenuItem>
                {formData.department && getProgramsByDepartment(formData.department).map((program) => (
                  <MenuItem key={program.code} value={program.code}>
                    {program.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="grid grid-cols-2 gap-4">
              <FormControl fullWidth required>
                <InputLabel>Batch Year</InputLabel>
                <Select
                  value={formData.batchYear}
                  onChange={(e) => handleInputChange('batchYear', e.target.value)}
                  label="Batch Year"
                >
                  <MenuItem key="placeholder-year" value="">Select Year</MenuItem>
                  {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Graduation Date"
                type="date"
                required
                value={formData.graduationDate}
                onChange={(e) => handleInputChange('graduationDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-l-4 border-green-500">
              <div className="text-4xl animate-bounce-in">{stepColors[2].icon}</div>
              <div>
                <h3 className="text-xl bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Create Your Account
                </h3>
                <p className="text-xs text-gray-600">Almost there! Set up your credentials</p>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex flex-col items-center mb-6 p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
              <p className="text-sm text-gray-700 mb-3 font-semibold">Profile Picture (Optional)</p>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-full blur opacity-25 group-hover:opacity-40 transition"></div>
                <Avatar
                  src={profileImage || `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=10b981&color=fff`}
                  alt="Profile"
                  sx={{ width: 120, height: 120 }}
                  className="relative ring-4 ring-white shadow-xl"
                />
                <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-gradient-to-r from-green-500 to-teal-600 text-white p-2.5 rounded-full cursor-pointer hover:from-green-600 hover:to-teal-700 shadow-lg transform hover:scale-110 transition">
                  <Camera className="w-5 h-5" />
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <TextField
              fullWidth
              label="Password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              helperText="Must be at least 8 characters"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel>Current Employment Status</InputLabel>
              <Select
                value={formData.currentEmploymentStatus}
                onChange={(e) => handleInputChange('currentEmploymentStatus', e.target.value)}
                label="Current Employment Status"
              >
                <MenuItem key="placeholder-employment" value="">Prefer not to say</MenuItem>
                <MenuItem key="Employed" value="Employed">Employed</MenuItem>
                <MenuItem key="Self-Employed" value="Self-Employed">Self-Employed</MenuItem>
                <MenuItem key="Unemployed" value="Unemployed">Unemployed</MenuItem>
                <MenuItem key="Pursuing Studies" value="Pursuing Studies">Pursuing Further Studies</MenuItem>
              </Select>
            </FormControl>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-xl border-2 border-green-200">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    sx={{
                      color: '#10b981',
                      '&.Mui-checked': {
                        color: '#10b981',
                      },
                    }}
                  />
                }
                label={
                  <span className="text-sm">
                    I agree to the{' '}
                    <a href="#" className="text-green-600 hover:underline font-semibold">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-teal-600 hover:underline font-semibold">
                      Privacy Policy
                    </a>
                  </span>
                }
              />
              <p className="text-xs text-gray-700 mt-2 ml-8 flex items-start gap-2">
                <span className="text-lg">🔒</span>
                <span>By registering, you consent to the collection and processing of your personal data in accordance with <strong>RA 10173</strong> (Data Privacy Act of 2012).</span>
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardContent className="p-8 text-center relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>

            {/* Animated Success Icon */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg animate-bounce">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50 -z-10"></div>
            </div>

            <h2 className="text-3xl mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Registration Successful! 🎉
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              Welcome, <span className="font-bold text-blue-600">{formData.firstName}</span>!
              Your account has been created successfully.
            </p>
            <Alert severity="success" className="mb-6 text-left shadow-md">
              <strong>Account Created! ✓</strong><br/>
              You can now log in with your email: <strong>{registeredEmail}</strong>
            </Alert>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg mb-6 border-2 border-green-200">
              <p className="text-sm text-gray-700">
                <span className="text-lg mr-2">ℹ️</span>
                <strong>Note:</strong> Your registration will be reviewed by the Alumni Office. You'll receive a notification once approved.
              </p>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200"></div>
            </div>

            <p className="text-sm text-gray-500">Redirecting to login page...</p>
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              className="mt-4 bg-gradient-to-r from-blue-600 to-green-600"
            >
              Go to Login Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-green-400/10 to-teal-400/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>

      <Card className="w-full max-w-2xl shadow-2xl relative z-10">
        {/* Animated Colorful Top Border */}
        <div className="h-3 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>

        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 animate-slide-up">
            <div className="flex items-center gap-4">
              <div className={`bg-gradient-to-br ${stepColors[activeStep].bg} p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300 relative`}>
                <span className="text-3xl animate-bounce-in">{stepColors[activeStep].icon}</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
              <div>
                <h1 className="text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
                  Join Our Community ✨
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></span>
                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></span>
                  </span>
                  Asian College Alumni Association
                </p>
              </div>
            </div>
            <Button
              variant="outlined"
              startIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => navigate('/login')}
              className="border-2 border-purple-300 text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
            >
              Back
            </Button>
          </div>

          {/* Enhanced Stepper */}
          <div className="mb-8">
            <Stepper activeStep={activeStep} className="mb-4">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        '&.Mui-active': {
                          color: index === 0 ? '#3b82f6' : index === 1 ? '#a855f7' : '#10b981',
                        },
                        '&.Mui-completed': {
                          color: '#10b981',
                        },
                      },
                    }}
                  >
                    <span className={activeStep === index ? 'font-bold' : ''}>{label}</span>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${stepColors[activeStep].bg} transition-all duration-500 ease-out`}
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" className="mb-4 shadow-md animate-shake">
              {error}
            </Alert>
          )}

          {/* Step Content with Card */}
          <Card className="mb-6 shadow-lg border-l-4 animate-slide-up hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden" style={{ borderLeftColor: activeStep === 0 ? '#3b82f6' : activeStep === 1 ? '#a855f7' : '#10b981' }}>
            {/* Decorative corner accent */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stepColors[activeStep].bg} opacity-10 rounded-bl-full`}></div>

            <CardContent className="p-6 relative">
              {renderStepContent(activeStep)}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowLeft className="w-4 h-4" />}
              className="text-gray-600"
              variant="outlined"
            >
              Previous
            </Button>

            {/* Step Indicator Dots */}
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeStep
                      ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                      : index < activeStep
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>

            <div className="flex gap-2">
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 shadow-lg"
                  size="large"
                >
                  Submit Registration ✓
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowRight className="w-4 h-4" />}
                  className={`bg-gradient-to-r ${stepColors[activeStep].bg} shadow-lg`}
                  size="large"
                >
                  Continue
                </Button>
              )}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl"></div>
            <div className="flex items-start gap-4 relative">
              <div className="text-3xl">💬</div>
              <div className="flex-1">
                <p className="text-sm mb-2">
                  <strong className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-lg">
                    Need assistance? We're here to help! 🤝
                  </strong>
                </p>
                <div className="space-y-1 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <span className="text-lg">📧</span>
                    <a href="mailto:alumni@asiancollege.edu" className="text-blue-600 hover:underline font-medium">
                      alumni@asiancollege.edu
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-lg">📞</span>
                    <span className="text-purple-600 font-semibold">(123) 456-7890</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
