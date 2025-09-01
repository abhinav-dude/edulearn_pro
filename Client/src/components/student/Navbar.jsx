import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const location = useLocation()
  const isCourseListPage = location.pathname.includes('/course-list')

  const { openSignIn } = useClerk()
  const { user } = useUser()

  const [isDarkMode, setIsDarkMode] = useState(false)

  // Sync with localStorage & html class on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const htmlHasDark = document.documentElement.classList.contains('dark')
    if (savedTheme === 'dark' || htmlHasDark) {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setIsDarkMode(false)
    }
  }, [])

  // Toggle dark mode persistent on html element & state
  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDarkMode(true)
    }
  }

  const SunIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="4" />
      <path d="M10 0v4M10 16v4M4.22 4.22l2.83 2.83M12.95 12.95l2.83 2.83M0 10h4M16 10h4M4.22 15.78l2.83-2.83M12.95 7.05l2.83-2.83"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )

  const MoonIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  )

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-300 dark:border-gray-700 py-4 transition-colors duration-300 ${
        isCourseListPage ? 'bg-white dark:bg-gray-900' : 'bg-cyan-100/70 dark:bg-gray-800'
      }`}
    >
      <Link to="/" className="flex items-center">
        <img src={assets.logo} alt="Logo" className="w-28 lg:w-32 cursor-pointer" />
      </Link>

      <div className="hidden md:flex items-center gap-5 text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <Link to="/educator">
                <button className="hover:text-gray-800 dark:hover:text-white transition-colors">Educator Dashboard</button>
              </Link>
              <Link to="/my-enrollments" className="hover:text-gray-800 dark:hover:text-white transition-colors">My Enrollments</Link>
            </>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-all duration-300 text-gray-600 hover:bg-gray-200 dark:text-yellow-400 dark:hover:bg-gray-700"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()} className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors">
            Create Account
          </button>
        )}
      </div>

      <div className="md:hidden flex items-center gap-3 text-gray-600 dark:text-gray-300">
        {user && (
          <>
            <Link to="/educator">
              <button className="text-xs hover:text-gray-800 dark:hover:text-white">Dashboard</button>
            </Link>
            <Link to="/my-enrollments" className="text-xs hover:text-gray-800 dark:hover:text-white">Enrollments</Link>
          </>
        )}

        <button
          type="button"
          onClick={toggleTheme}
          className="p-1.5 rounded-lg transition-all duration-300 text-gray-600 hover:bg-gray-200 dark:text-yellow-400 dark:hover:bg-gray-700"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <div className="w-4 h-4">{isDarkMode ? <SunIcon /> : <MoonIcon />}</div>
        </button>

        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="User" className="w-8 h-8 rounded-full" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
