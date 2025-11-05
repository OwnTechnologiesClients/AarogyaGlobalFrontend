import React, { useState, useEffect } from 'react';
import { Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithGoogle, setupRecaptcha, sendOTP, verifyOTP } from '@/lib/firebase/auth';
import { useAuth } from '@/context/AuthContext';
import apiService from '@/lib/apiService';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PhoneInput from '@/components/ui/PhoneInput';

const LoginForm = () => {
  const { loginUser, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [step, setStep] = useState(1);
  const [phoneData, setPhoneData] = useState({ countryCode: '+91', phone: '', name: '' });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [resendTimer, setResendTimer] = useState(0);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  // Initialize ReCAPTCHA when component mounts
  useEffect(() => {
    if (showPhoneLogin) {
      try {
        setupRecaptcha('recaptcha-container');
      } catch (error) {
        console.error('Failed to setup ReCAPTCHA:', error);
        setError('Failed to initialize verification. Please refresh the page.');
      }
    }
  }, [showPhoneLogin]);


  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleLoginSuccess = (userData, token) => {
    setSuccess(true);
    setError('');
    setLoading(false);
    
    // Show success message for 2 seconds then redirect
    setTimeout(() => {
      loginUser(userData, token);
      router.push('/');
    }, 2000);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const { idToken, authProvider } = await signInWithGoogle();
      const data = await apiService.firebaseLogin(idToken, authProvider);
      
      if (data.success) {
        handleLoginSuccess(data.data.user, data.data.token);
      } else {
        throw new Error(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Google login error:', err);
      setError(err.message || 'Google login failed. Please try again.');
      setLoading(false);
    }
  };

  const handlePhoneLogin = () => {
    setError('');
    setSuccess(false);
    setShowPhoneLogin(true);
    setStep(1);
  };

  const handleBackToOptions = () => {
    setShowPhoneLogin(false);
    setStep(1);
    setPhoneData({ countryCode: '+91', phone: '', name: '' });
    setOtp(['', '', '', '', '', '']);
    setError('');
    setSuccess(false);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (!phoneData.name || phoneData.name.trim().length < 2) {
        throw new Error('Please enter your full name');
      }
      
      if (!phoneData.phone || phoneData.phone.length < 10) {
        throw new Error('Please enter a valid phone number');
      }

      const fullPhoneNumber = `${phoneData.countryCode}${phoneData.phone}`;
      const result = await sendOTP(fullPhoneNumber);
      setConfirmationResult(result);
      setStep(2);
      setResendTimer(60);
    } catch (err) {
      console.error('Send OTP error:', err);
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const otpCode = otp.join('');
      
      if (otpCode.length !== 6) {
        throw new Error('Please enter the complete 6-digit OTP');
      }

      const { idToken, authProvider } = await verifyOTP(confirmationResult, otpCode);
      const data = await apiService.firebaseLogin(idToken, authProvider, phoneData.name);

      if (data.success) {
        handleLoginSuccess(data.data.user, data.data.token);
      } else {
        throw new Error(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Verify OTP error:', err);
      setError(err.message || 'Invalid OTP. Please try again.');
      setLoading(false);
    }
  };

  const handleOTPChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hospital Image */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000D44] via-[#1A0142] to-[#000D44] opacity-85 z-10"></div>
        <Image
          src="/medanta/Medanta-1.jpg"
          alt="Modern Hospital Facility"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex flex-col justify-center items-center text-white p-12">
          <h1 className="text-5xl font-bold mb-6 text-center">
            Welcome to Aarogya Global
          </h1>
          <p className="text-xl text-center max-w-lg leading-relaxed">
            Your trusted partner in medical tourism. Connect with world-class healthcare facilities and expert medical professionals.
          </p>
        </div>
      </div>

      {/* Right Side - Login Options */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {!showPhoneLogin ? (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                USER LOGIN
              </h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle size={20} />
                  Logged in successfully! Redirecting to home page...
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading || success}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FcGoogle size={24} />
                  {loading ? 'Signing in...' : 'Login with Google'}
                </button>

                <button
                  onClick={handlePhoneLogin}
                  disabled={loading || success}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Phone size={20} />
                  Login with Phone Number
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center mb-8">
                <button
                  onClick={handleBackToOptions}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {step === 1 ? 'Enter Phone Number' : 'Verify OTP'}
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle size={20} />
                  Logged in successfully! Redirecting to home page...
                </div>
              )}

              {step === 1 ? (
                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={phoneData.name}
                      onChange={(e) => setPhoneData({ ...phoneData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <PhoneInput
                    value={phoneData}
                    onChange={setPhoneData}
                    placeholder="Enter your phone number"
                  />
                  <button
                    type="submit"
                    disabled={loading || success || phoneData.phone.length < 10 || phoneData.name.trim().length < 2}
                    className="w-full bg-gradient-to-r from-[#04CE78] to-[#00A86B] hover:from-[#00A86B] hover:to-[#04CE78] text-white font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                  {/* ReCAPTCHA container - invisible */}
                  <div id="recaptcha-container"></div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div className="text-center mb-4">
                    <p className="text-gray-600">
                      Enter the 6-digit code sent to {phoneData.countryCode}{phoneData.phone}
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleOTPKeyDown(index, e)}
                        className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength={1}
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    disabled={loading || success || otp.some(digit => !digit)}
                    className="w-full bg-gradient-to-r from-[#04CE78] to-[#00A86B] hover:from-[#00A86B] hover:to-[#04CE78] text-white font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                  {resendTimer > 0 ? (
                    <p className="text-center text-gray-500">
                      Resend OTP in {resendTimer}s
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setOtp(['', '', '', '', '', '']);
                      }}
                      className="w-full text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;