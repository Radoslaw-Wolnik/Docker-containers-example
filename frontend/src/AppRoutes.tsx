import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
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
    <Route path="/blog/new" element={<ProtectedRoute> <BlogPostEditor /> </ProtectedRoute>} />
    <Route path="/blog/:id/edit" element={<ProtectedRoute> <BlogPostEditor /> </ProtectedRoute>} />
    <Route path="/profile" element={ <ProtectedRoute> <UserProfile /> </ProtectedRoute> } />
  </Routes>
);

export default AppRoutes;