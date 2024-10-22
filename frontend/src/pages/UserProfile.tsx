import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getUserProfile, updateProfile, uploadProfilePicture } from '../api/user';
import { User } from '../types/global';

const UserProfile: React.FC = () => {
  const { user: authUser, refreshUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
        setUsername(profile.username);
        setEmail(profile.email);
      } catch (err) {
        setError('Failed to fetch user profile');
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const updatedUser = await updateProfile({ username, email });
      setUser(updatedUser);
      setSuccess('Profile updated successfully');
      refreshUser();
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('profilePicture', e.target.files[0]);
      try {
        const profilePicture = await uploadProfilePicture(formData);
        setUser(prev => prev ? { ...prev, profilePicture } : null);
        setSuccess('Profile picture updated successfully');
      } catch (err) {
        setError('Failed to upload profile picture');
      }
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">User Profile</h1>
      {error && <p className="text-red-500 mb-5">{error}</p>}
      {success && <p className="text-green-500 mb-5">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="profilePicture" className="block mb-1">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;