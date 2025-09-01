import React, { useState, useEffect } from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Check for dark mode on component mount and listen for changes
  useEffect(() => {
    const handleThemeChange = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)
    }

    // Initial check
    handleThemeChange()

    // Listen for theme changes
    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`pb-14 px-8 md:px-0 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : ''
      }`}
    >
      {/* Header Section */}
      <h2
        className={`text-3xl font-medium transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        Testimonials
      </h2>
      <p
        className={`md:text-base mt-3 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-500'
        }`}
      >
        Hear from our learners as they share their journeys of transformation,
        success, and how our <br /> platform has made a difference in their lives.
      </p>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-auto gap-8 mt-14">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className={`text-sm text-left border pb-6 rounded-lg overflow-hidden transition-all duration-300 ${
              isDarkMode
                ? 'border-gray-600 bg-gray-800 shadow-lg hover:shadow-xl'
                : 'border-gray-500/30 bg-white shadow-[0px_4px_15px_0px] shadow-black/5 hover:shadow-lg'
            }`}
          >
            {/* User Info Header */}
            <div
              className={`flex items-center gap-4 px-5 py-4 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
              }`}
            >
              <img
                className="h-12 w-12 rounded-full object-cover border-2 border-white/20"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1
                  className={`text-lg font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {testimonial.name}
                </h1>
                <p
                  className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-800/80'
                  }`}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Rating and Feedback */}
            <div className="p-5 pb-7">
              {/* Star Rating */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5 w-5"
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                  />
                ))}
                <span
                  className={`ml-2 text-sm font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  ({testimonial.rating})
                </span>
              </div>

              {/* Feedback Text */}
              <p
                className={`leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                {testimonial.feedback}
              </p>
            </div>

            {/* Read More Link */}
            <a
              href="#"
              className={`px-5 text-sm font-medium transition-colors duration-300 hover:underline ${
                isDarkMode
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-500 hover:text-blue-600'
              }`}
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialSection
