import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types/global';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          <Link to={`/blog/${post.id}`} className="text-primary-600 hover:text-primary-800">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4">{post.content[0].content.substring(0, 100)}...</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{post.author}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;