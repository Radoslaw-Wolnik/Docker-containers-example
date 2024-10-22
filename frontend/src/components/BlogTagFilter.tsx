import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BlogTagFilterProps {
  tags: string[];
}

const BlogTagFilter: React.FC<BlogTagFilterProps> = ({ tags }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentTag = searchParams.get('tag');

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-900">Filter by Tag</h3>
      <div className="flex flex-wrap gap-2">
        <Link
          to="/blog"
          className={`px-3 py-1 rounded-full text-sm ${
            !currentTag
              ? 'bg-primary-100 text-primary-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          All
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag}
            to={`/blog?tag=${encodeURIComponent(tag)}`}
            className={`px-3 py-1 rounded-full text-sm ${
              currentTag === tag
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogTagFilter;