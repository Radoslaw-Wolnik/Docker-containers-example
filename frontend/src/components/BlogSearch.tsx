import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/blog/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <div className="flex gap-2">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search blog posts..."
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default BlogSearch;