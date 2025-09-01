import React from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';

// Student Pages
import Home from './pages/student/Home';
import CoursesList from './pages/student/CoursesList';
import CourseDetails from './pages/student/CourseDetails';
import MyEnrollments from './pages/student/MyEnrollments';
import Player from './pages/student/Player';
import Loading from './components/student/Loading';

// Educator Pages
import Educator from './pages/educator/Educator';
import Dashboard from './pages/educator/Dashboard';
import AddCourse from './pages/educator/AddCourse';
import MyCourses from './pages/educator/MyCourses';
import StudentEnroll from './pages/educator/StudentEnroll';

// Components
import Navbar from './components/student/Navbar';
import 'quill/dist/quill.snow.css';

const App = () => {
  // Conditionally render Navbar: don't show it on educator routes
  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className="text-default min-h-screen bg-white">
      {/* Render Navbar unless we are on an educator route */}
      {!isEducatorRoute && <Navbar />}

      {/* Main Routes */}
      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/Loading/:path" element={<Loading />} />

        {/* Educator Layout and Nested Routes */}
        <Route path="/educator/*" element={<Educator />}>
          <Route index element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentEnroll />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
