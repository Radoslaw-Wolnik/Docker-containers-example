import React, { useState, useEffect } from 'react';
import { getAllBlogPosts } from '../api/blog';
import BlogPostCard from '../components/BlogPostCard';
import { BlogPost } from '../types/global';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllBlogPosts(currentPage);
        setPosts(response.blogPosts);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    fetchPosts();
  }, [currentPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-primary-500 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-primary-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;