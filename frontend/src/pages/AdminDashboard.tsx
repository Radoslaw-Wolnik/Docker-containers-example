import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blog Management */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Blog Management</h2>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/admin/blog/new"
                className="text-primary-600 hover:text-primary-800"
              >
                Create New Post
              </Link>
            </li>
            <li>
              <Link 
                to="/blog"
                className="text-primary-600 hover:text-primary-800"
              >
                View All Posts
              </Link>
            </li>
          </ul>
        </div>

        {/* User Management */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/admin/users"
                className="text-primary-600 hover:text-primary-800"
              >
                Manage Users
              </Link>
            </li>
          </ul>
        </div>

        {/* Site Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/admin/settings"
                className="text-primary-600 hover:text-primary-800"
              >
                General Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;