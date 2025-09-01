import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const location = useLocation();
  const { user } = useUser();
  const isCourseListPage = location.pathname.includes('/course-list');

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-300 py-4 ${
        isCourseListPage ? 'bg-white dark:bg-gray-900' : 'bg-cyan-100/70 dark:bg-gray-800'
      }`}
    >
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 lg:w-32 cursor-pointer" />
      </Link>

      <div className="flex items-center gap-5">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Hi! EduLearn Pro
        </span>
        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
