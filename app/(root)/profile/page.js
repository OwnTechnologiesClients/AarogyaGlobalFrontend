'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, Calendar, MapPin, Edit2, Save, X, LogOut } from 'lucide-react';
import Image from 'next/image';
import apiService from '@/lib/apiService';

export default function ProfilePage() {
  const { user, isAuthenticated, loading, updateUser, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    displayName: '',
    dateOfBirth: '',
    gender: '',
    address: ''
  });

  // Handle navigation when not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Redirect if not authenticated
  if (!loading && !isAuthenticated) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  // Safety check for user data
  if (!user || typeof user !== 'object') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">User data not available</div>
      </div>
    );
  }

  const handleEdit = () => {
    setFormData({
      displayName: String(user?.displayName || ''),
      dateOfBirth: user?.profile?.dateOfBirth 
        ? new Date(user.profile.dateOfBirth).toISOString().split('T')[0] 
        : '',
      gender: String(user?.profile?.gender || ''),
      address: String(user?.profile?.address || '')
    });
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      displayName: '',
      dateOfBirth: '',
      gender: '',
      address: ''
    });
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const data = await apiService.request('/user-auth/profile', {
        method: 'PUT',
        includeAuth: true,
        data: {
          displayName: formData.displayName,
          profile: {
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            address: formData.address
          }
        }
      });

      if (data.success) {
        updateUser(data.data);
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Update profile error:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={String(user.displayName || 'User')}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-gray-200"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                  {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
              <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${
                isAuthenticated ? 'bg-green-500' : 'bg-gray-400'
              }`} />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {String(user?.displayName || 'User')}
              </h1>
              <div className="space-y-1 text-gray-600">
                {user?.email && (
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{String(user.email)}</span>
                  </div>
                )}
                {user?.phoneNumber && (
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{String(user.phoneNumber)}</span>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  user?.emailVerified || user?.phoneVerified
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user?.emailVerified || user?.phoneVerified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {success}
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

          <div className="space-y-6">
            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-lg">
                  {String(user?.displayName || 'Not set')}
                </p>
              )}
            </div>


            {/* Date of Birth & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-lg">
                    {user?.profile?.dateOfBirth 
                      ? new Date(user.profile.dateOfBirth).toLocaleDateString() 
                      : 'Not set'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                {isEditing ? (
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-lg capitalize">
                    {String(user?.profile?.gender || 'Not set')}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Address
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your complete address..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                ) : (
                  <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-lg min-h-[100px] whitespace-pre-wrap">
                    {String(user?.profile?.address || 'Not set')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

