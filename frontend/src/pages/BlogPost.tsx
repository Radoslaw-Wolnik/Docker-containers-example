import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPostById } from '../api/blog';
import { BlogPost as BlogPostType } from '../types/global';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getBlogPostById(id!);
        setPost(fetchedPost);
      } catch (err) {
        setError('Failed to fetch blog post');
      }
    };
    fetchPost();
  }, [id]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-4">
        By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
      </div>
      {post.content.map((content, index) => (
        <div key={index} className="mb-4">
          {content.type === 'text' && <p>{content.content}</p>}
          {content.type === 'image' && <img src={content.content} alt="Blog post image" className="max-w-full h-auto" />}
        </div>
      ))}
    </div>
  );
};

export default BlogPost;