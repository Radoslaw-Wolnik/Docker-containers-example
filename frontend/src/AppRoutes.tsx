import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import BlogPostEditor from './pages/BlogPostEditor';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/blog" element={<BlogList />} />
    <Route path="/blog/:id" element={<BlogPost />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    
    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="/blog/new" element={<BlogPostEditor />} />
      <Route path="/blog/:id/edit" element={ <BlogPostEditor />} />
      <Route path="/profile" element={ <UserProfile />} />
    </Route>
    
  </Routes>
);

export default AppRoutes;