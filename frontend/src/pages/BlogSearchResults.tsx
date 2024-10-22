import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchBlogPosts } from '../api/blog';
import BlogPostCard from '../components/BlogPostCard';
import BlogSearch from '../components/BlogSearch';
import { BlogPost } from '../types/global';

const BlogSearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await searchBlogPosts(query);
        setPosts(response);
      } catch (err) {
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      
      <div className="mb-8">
        <BlogSearch />
      </div>

      <p className="text-gray-600 mb-6">
        Found {posts.length} results for "{query}"
      </p>

      {posts.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogSearchResults;