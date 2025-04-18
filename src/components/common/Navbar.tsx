import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Mock authentication state - in a real app, this would come from a context
  const [isLoggedIn] = useState(true);
  const [user] = useState({ name: 'John Doe', avatar: '' });

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Calendar', href: '/scheduler' },
    { name: 'Content Library', href: '/content-library' },
    { name: 'Analytics', href: '/analytics' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl text-primary-600">
                ContentCalendar
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive(item.href)
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* User menu (desktop) */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoggedIn ? (
              <div className="ml-3 relative group">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="flex items-center max-w-xs rounded-full text-sm focus:outline-none"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="mr-2 text-gray-700">{user.name}</span>
                    {user.avatar ? (
                      <img className="h-8 w-8 rounded-full" src={user.avatar} alt="" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center">
                        <span className="text-primary-700 font-medium text-sm">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </button>
                </div>
                
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Sign in
                </Link>
                <Link to="/register" className="bg-primary-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700">
                  Sign up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isActive(item.href)
                  ? 'bg-primary-50 border-primary-500 text-primary-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* Mobile user menu */}
        {isLoggedIn ? (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              {user.avatar ? (
                <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary-200 flex items-center justify-center">
                  <span className="text-primary-700 font-medium text-sm">
                    {user.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user.name}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link to="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Your Profile
              </Link>
              <Link to="/settings" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Settings
              </Link>
              <button className="w-full text-left block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col space-y-3 px-4">
              <Link to="/login" className="text-gray-500 hover:text-gray-800 py-2 text-base font-medium">
                Sign in
              </Link>
              <Link to="/register" className="bg-primary-600 text-white py-2 px-4 rounded-md text-base font-medium hover:bg-primary-700 text-center">
                Sign up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;