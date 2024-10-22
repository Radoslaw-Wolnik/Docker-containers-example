import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Audio Sample Project</h1>
      {user ? (
        <p className="text-xl mb-4">Hello, {user.username}! Explore our audio samples or check out the latest blog posts.</p>
      ) : (
        <p className="text-xl mb-4">Discover and share amazing audio samples with our community.</p>
      )}
      <div className="flex space-x-4">
        <Link to="/blog" className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600">
          Browse Blog Posts
        </Link>
        {!user && (
          <Link to="/register" className="bg-secondary-500 text-white px-4 py-2 rounded hover:bg-secondary-600">
            Sign Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;