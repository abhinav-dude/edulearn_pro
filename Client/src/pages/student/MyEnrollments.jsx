import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Line } from 'rc-progress'
import Footer from '../../components/student/Footer'

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext)

  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 6, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 5 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 2 },
    { lectureCompleted: 5, totalLectures: 5 }
  ])

  return (
    <>
      <div className='md:px-36 px-8 pt-10'>
        <h1 className='text-2xl font-semibold'>My Enrollments</h1>

        <table className='md:table-auto table-fixed w-full border mt-10 border-collapse'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
            <tr>
              <th className='px-6 py-4 font-semibold text-gray-700'>Course</th>
              <th className='px-6 py-4 font-semibold text-gray-700'>Duration</th>
              <th className='px-6 py-4 font-semibold text-gray-700'>Completed</th>
              <th className='px-6 py-4 font-semibold text-gray-700'>Status</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {enrolledCourses.map((course, index) => {
              const progress = progressArray[index] || { lectureCompleted: 0, totalLectures: 0 }
              const percentComplete =
                progress.totalLectures > 0
                  ? (progress.lectureCompleted * 100) / progress.totalLectures
                  : 0
              const isCompleted =
                progress.totalLectures > 0 &&
                progress.lectureCompleted / progress.totalLectures === 1

              return (
                <tr key={index} className='border-b hover:bg-gray-50'>
                  <td className='px-6 py-4 flex items-center gap-4'>
                    <img
                      src={course.courseThumbnail}
                      alt={course.courseTitle}
                      className='w-14 sm:w-24 md:w-28 object-cover rounded'
                    />
                    <div className='flex-1'>
                      <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                      <Line
                        strokeWidth={2}
                        percent={percentComplete}
                        className='bg-gray-300 rounded-full'
                      />
                    </div>
                  </td>
                  <td className='px-6 py-4'>{calculateCourseDuration(course)}</td>
                  <td className='px-6 py-4'>
                    {progress.lectureCompleted} / {progress.totalLectures}{' '}
                    <span>Lectures</span>
                  </td>
                  <td className='px-6 py-4'>
                    <button
                      className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white'
                      onClick={() => navigate('/player/' + course._id)}
                    >
                      {isCompleted ? 'Completed' : 'On Going'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  )
}

export default MyEnrollments
