import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      alert('Thank you for subscribing!')
      setEmail('')
    } else {
      alert('Please enter a valid email address')
    }
  }

  return (
    // Remove mt-10!
    <footer className="bg-gray-900 dark:bg-black md:px-36 text-left w-full transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center 
                      gap-10 md:gap-32 py-10 border-b border-white/30">
        
        {/* Logo + Description */}
        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo} alt="logo" className="w-24 md:w-28" />
          <p className="mt-6 text-center md:text-left text-sm max-w-xs text-white/80 dark:text-gray-300">
            EduLearn Pro redefines learning with a sleek, smart platform that turns 
            knowledge into power—anytime, anywhere.
          </p>
        </div>
        {/* ...rest of the footer remains unchanged... */}
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between md:justify-start 
                         text-sm text-white/80 space-y-0 md:space-y-2 gap-4 md:gap-0">
            {['Home', 'About us', 'Contact us', 'Privacy policy'].map((item, i) => (
              <li key={i}>
                <button className="hover:text-white transition-colors">{item}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex md:hidden lg:flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Subscribe to our newsletter</h2>
          <p className="text-sm text-white/80 dark:text-gray-300 mb-4 text-center md:text-left">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form onSubmit={handleSubscribe} className="w-full">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-80 px-4 py-2 rounded-md text-sm 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                         placeholder-gray-500 dark:placeholder-gray-400 
                         border border-gray-300 dark:border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full md:w-auto mt-3 px-6 py-2 rounded-md text-sm font-medium
                         bg-blue-600 text-white
                         hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-white/60 dark:text-gray-400">
        © 2025 EduLearn Pro. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
