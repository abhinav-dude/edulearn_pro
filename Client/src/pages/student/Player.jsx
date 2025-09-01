import React, { useContext, useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";

// Helper: Extract YouTube videoId from any YouTube URL
const getYouTubeId = (url = "") => {
  try {
    const u = new URL(url);
    // Handle different YouTube URL formats
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) {
      return u.searchParams.get("v") || "";
    }
  } catch {
    return ""; // Return empty string if URL is invalid
  }
  return "";
};

const Player = () => {
  // Context & route params
  const { enrolledCourses = [], calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();

  // Local state
  const [courseData, setCourseData] = useState(null); // Holds the course data
  const [openSections, setOpenSections] = useState({}); // Track open/closed sections
  const [playerData, setPlayerData] = useState(null); // Holds current lecture metadata
  const [completedLectures, setCompletedLectures] = useState({}); // Track completion of lectures

  // Fetch the matching course once on mount
  useEffect(() => {
    const match = enrolledCourses.find(
      (c) => String(c._id) === String(courseId)
    );
    setCourseData(match ?? null); // Set course data or null if not found
  }, [enrolledCourses, courseId]);

  // UI helpers
  const toggleSection = (i) => setOpenSections((s) => ({ ...s, [i]: !s[i] })); // Toggle section visibility

  const markComplete = (chapterIdx, lectureIdx) => {
    setCompletedLectures((prev) => ({
      ...prev,
      [`${chapterIdx}-${lectureIdx}`]: true, // Mark lecture as completed
    }));
  };

  // Guard while data is loading
  if (!courseData) return <Loading />; // Show loading state if course data is not available

  // Render
  return (
    <Fragment>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* LEFT column – course structure */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>

          <div className="pt-5">
            {courseData.courseContent?.map((chapter, idx) => (
              <div
                key={chapter._id ?? idx}
                className="mb-2 rounded border border-gray-300 bg-white"
              >
                {/* Chapter header */}
                <button
                  type="button"
                  onClick={() => toggleSection(idx)} // Toggle chapter section
                  className="flex w-full items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={assets.down_arrow_icon}
                      alt=""
                      className={`h-4 w-4 transition-transform ${
                        openSections[idx] ? "rotate-180" : ""
                      }`}
                    />
                    <p className="text-sm font-medium md:text-base">
                      {chapter.chapterTitle}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {chapter.chapterContent?.length ?? 0} lectures •{" "}
                    {calculateChapterTime?.(chapter)} {/* Display chapter time */}
                  </p>
                </button>

                {/* Lecture list */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections[idx]
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="border-t border-gray-300 bg-gray-50 py-2 pr-4 list-none pl-4 md:pl-10 text-gray-600">
                    {chapter.chapterContent?.map((lecture, li) => {
                      const key = `${idx}-${li}`;
                      const isCompleted =
                        completedLectures[key] || lecture.watched; // Check if lecture is completed

                      return (
                        <li
                          key={lecture._id ?? li}
                          className="flex items-start gap-2 rounded px-2 py-2 hover:bg-gray-100"
                        >
                          <img
                            src={
                              isCompleted
                                ? assets.blue_tick_icon
                                : assets.play_icon
                            }
                            alt=""
                            className="h-4 w-4 flex-shrink-0 mt-0.5"
                          />

                          <div className="flex w-full items-center justify-between text-xs text-gray-800 md:text-sm">
                            <p className="flex-1">{lecture.lectureTitle}</p>

                            <div className="ml-2 flex flex-shrink-0 items-center gap-3">
                              {lecture.lectureUrl && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: idx + 1,
                                      lecture: li + 1,
                                      chapterIdx: idx,
                                      lectureIdx: li,
                                    }) // Set player data for the selected lecture
                                  }
                                  className="text-blue-500 transition-colors hover:text-blue-600"
                                >
                                  Watch
                                </button>
                              )}

                              <p className="font-medium text-gray-500">
                                {humanizeDuration(
                                  Number(lecture?.lectureDuration || 0) *
                                    60 *
                                    1000,
                                  { units: ["h", "m"], round: true }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Rating Section */}
          <div className="flex items-center gap-3 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this course :</h1>
            <Rating
              initialRating={0}
              onRate={(value) => console.log('rating', value)} // Handle rating click
            />
          </div>
        </div>

        {/* RIGHT column – video player */}
        <div className="md:mt-10">
          {playerData ? (
            <div>
              <YouTube
                videoId={getYouTubeId(playerData.lectureUrl)} // Get YouTube video ID
                iframeClassName="aspect-video w-full"
              />

              {/* Current lecture metadata */}
              <div className="flex justify-between items-center mt-1">
                <p>
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>
                <button
                  onClick={() =>
                    markComplete(playerData.chapterIdx, playerData.lectureIdx) // Mark lecture as complete
                  }
                  className="text-blue-600 hover:text-blue-700"
                >
                  {completedLectures[
                    `${playerData.chapterIdx}-${playerData.lectureIdx}`
                  ]
                    ? "Completed"
                    : "Mark Complete"}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={courseData?.courseThumbnail || ""}
              alt="course thumbnail"
              className="aspect-video w-full object-cover"
            />
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Player;
