// src/pages/BlogPostEditor.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogPostById, createBlogPost, updateBlogPost } from '../api/blog';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BlogContent as BlogContentType } from '../types/global';


// Supported languages
const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
];

const BlogPostEditor: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState<BlogContentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      const post = await getBlogPostById(id!);
      setTitle(post.title);
      setContent(post.content);
    } catch (err) {
      setError('Failed to fetch blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBlock = (type: BlogContentType['type']) => {
    const newBlock: BlogContentType = {
      type,
      content: '',
      ...(type === 'code' && { language: 'javascript' }),
    };
    setContent([...content, newBlock]);
  };

  const handleUpdateBlock = (index: number, updatedBlock: Partial<BlogContentType>) => {
    const newContent = [...content];
    newContent[index] = { ...newContent[index], ...updatedBlock };
    setContent(newContent);
  };

  const handleRemoveBlock = (index: number) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === content.length - 1)
    ) {
      return;
    }

    const newContent = [...content];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]];
    setContent(newContent);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const postData = {
        title,
        content,
      };

      if (isEditing) {
        await updateBlogPost(id!, postData);
      } else {
        await createBlogPost(postData);
      }

      navigate('/blog');
    } catch (err) {
      setError('Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        <button
          onClick={() => setPreview(!preview)}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {!preview ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div className="space-y-4">
            {content.map((block, index) => (
              <div key={index} className="relative p-4 border rounded-md group">
                <div className="absolute right-2 top-2 hidden group-hover:flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleMoveBlock(index, 'up')}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveBlock(index, 'down')}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    disabled={index === content.length - 1}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveBlock(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>

                {block.type === 'text' && (
                  <textarea
                    value={block.content}
                    onChange={(e) => handleUpdateBlock(index, { content: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    rows={4}
                  />
                )}

                {block.type === 'code' && (
                  <div className="space-y-2">
                    <select
                      value={block.language}
                      onChange={(e) => handleUpdateBlock(index, { language: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    >
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                    <textarea
                      value={block.content}
                      onChange={(e) => handleUpdateBlock(index, { content: e.target.value })}
                      className="w-full font-mono rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      rows={8}
                    />
                  </div>
                )}

                {block.type === 'image' && (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={block.content}
                      onChange={(e) => handleUpdateBlock(index, { content: e.target.value })}
                      placeholder="Image URL"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                    <input
                      type="text"
                      value={block.alt || ''}
                      onChange={(e) => handleUpdateBlock(index, { alt: e.target.value })}
                      placeholder="Alt text"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                )}

                {block.type === 'link' && (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={block.content}
                      onChange={(e) => handleUpdateBlock(index, { content: e.target.value })}
                      placeholder="URL"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                    <input
                      type="text"
                      value={block.alt || ''}
                      onChange={(e) => handleUpdateBlock(index, { alt: e.target.value })}
                      placeholder="Link text"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => handleAddBlock('text')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Add Text
            </button>
            <button
              type="button"
              onClick={() => handleAddBlock('code')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Add Code
            </button>
            <button
              type="button"
              onClick={() => handleAddBlock('image')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Add Image
            </button>
            <button
              type="button"
              onClick={() => handleAddBlock('link')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Add Link
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
          <div className="prose max-w-none">
            {content.map((block, index) => (
              <div key={index}>
                {block.type === 'text' && <p className="text-gray-800">{block.content}</p>}
                {block.type === 'code' && (
                  <SyntaxHighlighter 
                    language={block.language || 'javascript'} 
                    style={vscDarkPlus}
                    customStyle={{
                      padding: '1rem',
                      borderRadius: '0.375rem',
                    }}
                  >
                    {block.content}
                  </SyntaxHighlighter>
                )}
                {block.type === 'image' && (
                  <img 
                    src={block.content} 
                    alt={block.alt || 'Blog post image'} 
                    className="max-w-full h-auto rounded-lg shadow-md" 
                  />
                )}
                {block.type === 'link' && (
                  <a 
                    href={block.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    {block.alt || block.content}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostEditor;