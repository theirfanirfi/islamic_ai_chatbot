import "@/styles/authscreen.css";
import { useRouter } from "expo-router";
import { Eye, EyeOff, Lock, Mail, Moon, User } from 'lucide-react';
import React, { useState } from 'react';
const IslamicAuthApp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (isLogin) {
      // Login logic
      if (!formData.email || !formData.password) {
        alert('Please fill in all required fields');
        return;
      }else {
        router.push('chatbot');
      alert('Welcome back! Login successful');
      }
    } else {
      // Registration logic
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        alert('Please fill in all required fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      alert('Account created successfully! Welcome to Islamic AI Assistant');
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg backdrop-blur-sm">
            <Moon size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Islamic AI Assistant</h1>
          <p className="text-white text-opacity-80">Your Digital Islamic Companion</p>
        </div>

        {/* Form Container */}
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          {/* Toggle Buttons */}
          <div className="flex bg-emerald-50 rounded-2xl p-1 mb-8">
            <button
              className={`flex-1 py-3 px-4 rounded-xl text-center font-semibold transition-all duration-300 ${
                isLogin 
                  ? 'bg-emerald-800 text-white shadow-lg' 
                  : 'text-emerald-800 hover:bg-emerald-100'
              }`}
              onClick={() => isLogin || toggleAuthMode()}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-3 px-4 rounded-xl text-center font-semibold transition-all duration-300 ${
                !isLogin 
                  ? 'bg-emerald-800 text-white shadow-lg' 
                  : 'text-emerald-800 hover:bg-emerald-100'
              }`}
              onClick={() => !isLogin || toggleAuthMode()}
            >
              Sign Up
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-emerald-800 text-white py-4 px-6 rounded-xl font-semibold text-lg mt-8 hover:bg-emerald-900 transform hover:scale-105 transition-all duration-300 shadow-lg"
            onClick={handleSubmit}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          {/* Forgot Password (Login only) */}
          {isLogin && (
            <div className="text-center mt-6">
              <button className="text-emerald-800 font-medium hover:text-emerald-900 transition-colors">
                Forgot Password?
              </button>
            </div>
          )}

          {/* Terms and Conditions (Registration only) */}
          {!isLogin && (
            <p className="text-center text-gray-600 text-sm mt-6 leading-relaxed">
              By creating an account, you agree to our{' '}
              <button className="text-emerald-800 font-semibold hover:text-emerald-900">
                Terms of Service
              </button>
              {' '}and{' '}
              <button className="text-emerald-800 font-semibold hover:text-emerald-900">
                Privacy Policy
              </button>
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white text-opacity-80">
          <p className="text-lg mb-2">In the name of Allah, the Most Gracious, the Most Merciful</p>
          <p className="text-sm text-opacity-70">Your trusted companion in your Islamic journey</p>
        </div>
      </div>
    </div>
  );
};

export default IslamicAuthApp;