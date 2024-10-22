import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface MobileHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-primary-600 text-white">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Blog Platform</Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md hover:bg-primary-700 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="bg-primary-700 px-4 py-2">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="block py-2 hover:bg-primary-600 px-3 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="block py-2 hover:bg-primary-600 px-3 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <li>
                    <Link
                      to="/admin"
                      className="block py-2 hover:bg-primary-600 px-3 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/profile"
                    className="block py-2 hover:bg-primary-600 px-3 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 hover:bg-primary-600 px-3 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="block py-2 hover:bg-primary-600 px-3 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default MobileHeader;