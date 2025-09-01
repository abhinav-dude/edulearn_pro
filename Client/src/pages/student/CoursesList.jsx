import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import Coursecard from '../../components/student/Coursecard'
import Footer from '../../components/student/Footer'

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext)
  const { input } = useParams()

  // Filtering logic
  const displayCourses = input && input.trim() !== ''
    ? allCourses?.filter(course => {
        const searchText = input.toLowerCase().trim()
        return (
          course.title?.toLowerCase().includes(searchText) ||
          course.name?.toLowerCase().includes(searchText) ||
          course.courseName?.toLowerCase().includes(searchText) ||
          course.course_name?.toLowerCase().includes(searchText) ||
          course.description?.toLowerCase().includes(searchText) ||
          course.category?.toLowerCase().includes(searchText) ||
          course.subject?.toLowerCase().includes(searchText) ||
          course.instructor?.toLowerCase().includes(searchText) ||
          course.teacher?.toLowerCase().includes(searchText) ||
          Object.values(course).some(value =>
            typeof value === 'string' &&
            value.toLowerCase().includes(searchText)
          )
        )
      }) || []
    : allCourses || []

  return (
    <div className="min-h-screen flex flex-col bg-white transition-colors duration-300">
      <div className="flex-1 md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate('/')}
              >
                Home
              </span>
              {' '} / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {displayCourses && displayCourses.length > 0 ? (
            displayCourses.map((course, index) => (
              <Coursecard key={index} course={course} />
            ))
          ) : (
            <p className="text-gray-500 mt-4">
              {input 
                ? `No courses found for "${input}"`
                : 'No courses available.'}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CoursesList
