import { useState } from "react";
import { ChevronRight, Star } from "lucide-react";
import QuizPage from "./QuizPage";
import { useLocation } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { API_PATHS, IMAGE_URL } from "../utils/config";
import type { Course } from "../types/course";

const CourseLearningPage = () => {
  const location = useLocation();
  const { courseId } = location.state || {};

  const { data: courseData, loading: courseDefaultLoading } = useAxios<Course>({
    url: courseId ? `${API_PATHS.MY_COURSE_DETAIL}/${courseId}` : "",
    method: "get",
  });

  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const pricingType = courseData?.pricingType?.toLowerCase();
  const hasAccess = pricingType === "paid"; // Adjust this based on user logic

  const currentModule = courseData?.modules[currentModuleIndex] || {
    chapters: [],
    quiz: {},
  };
  const currentChapter = currentModule.chapters[currentChapterIndex] || {
    content: {},
    activities: [],
  };
  const totalModules = courseData?.modules?.length || 0;
  const progressPercent =
    totalModules && totalModules > 0
      ? ((currentModuleIndex + 1) / totalModules) * 100
      : 0;

  const goToNextChapter = () => {
    if (currentChapterIndex < currentModule.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    } else if (currentModuleIndex < totalModules - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentChapterIndex(0);
    }
  };

  const goToPrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    } else if (currentModuleIndex > 0) {
      const prevModule = courseData?.modules[currentModuleIndex - 1] || {
        chapters: [],
      };
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentChapterIndex(prevModule.chapters.length - 1);
    }
  };

  if (courseDefaultLoading || !courseData) {
    return <div className="p-6 text-center">Loading course...</div>;
  }

  return (
    <div className="container-padding min-h-screen">
      <div className="p-6 bg-blue-50 rounded-lg shadow my-6">
        <p className="text-sm text-gray-500">Development &gt; Communication</p>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">
          {courseData.title}
        </h1>
        <p className="mt-2 text-gray-600">{courseData.description}</p>
        <div className="mt-4 text-sm text-gray-500 space-y-1">
          <p>
            Created by{" "}
            <span className="text-purple-600 font-medium">
              {courseData.instructor?.firstName}{" "}
              {courseData.instructor?.lastName}
            </span>
          </p>
          <p>Last updated 07/2025 • {courseData.language}</p>
          <p>
            <span className="font-semibold">Type:</span>{" "}
            {courseData.pricingType.charAt(0).toUpperCase() +
              courseData.pricingType.slice(1)}
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-yellow-600">4.6</span>
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span>(12,879 ratings)</span>
          </div>
          <div>•</div>
          <div>
            <span className="font-medium">51,053</span> learners
          </div>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded mt-6">
          <div
            className="bg-purple-600 h-2 rounded transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        <aside className="lg:col-span-1 bg-gray-100 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-purple-700">
            Course Modules
          </h2>
          <ul className="space-y-4">
            {courseData.modules.map((mod, mIndex) => (
              <li key={mIndex}>
                <div
                  onClick={() => {
                    setCurrentModuleIndex(mIndex);
                    setCurrentChapterIndex(0);
                  }}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition ${
                    mIndex === currentModuleIndex
                      ? "bg-purple-100 text-purple-800 font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">\ {mod.name}</div>
                </div>
                <ul className="ml-5 mt-2 space-y-1">
                  {mod.chapters.map((chapter, cIndex) => (
                    <li
                      key={cIndex}
                      onClick={() => {
                        setCurrentModuleIndex(mIndex);
                        setCurrentChapterIndex(cIndex);
                        setShowQuiz(false);
                      }}
                      className={`text-sm cursor-pointer p-1 rounded hover:bg-gray-200 ${
                        mIndex === currentModuleIndex &&
                        cIndex === currentChapterIndex
                          ? "bg-purple-200 font-medium"
                          : ""
                      }`}
                    >
                      {chapter.title}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </aside>

        <main className="lg:col-span-3 p-6 overflow-y-auto">
          {!hasAccess ? (
            <div className="text-center bg-red-50 border border-red-300 p-6 rounded shadow text-red-700">
              <h2 className="text-xl font-bold mb-2">🔒 Course Locked</h2>
              <p className="mb-4">
                This course requires a purchase to access. Please buy the course
                to continue learning.
              </p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                🔐 Upgrade Now
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2 text-gray-800">
                {currentChapter.title}
              </h1>

              {showQuiz ? (
                <QuizPage />
              ) : (
                <>
                  {currentChapter.video && (
                    <div className="relative pb-[56.25%] mb-6">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-md"
                        src={currentChapter.video}
                        title="Chapter Video"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

                  {(currentChapter.audio || currentChapter.image) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {/* Audio Section */}
                      {currentChapter.audio && (
                        <div className="flex items-center justify-center rounded-md shadow border p-4 bg-white h-full min-h-[200px]">
                          <audio controls className="w-full max-w-xs">
                            <source
                              src={IMAGE_URL + currentChapter.audio}
                              type="audio/mpeg"
                            />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}

                      {/* Image Section */}
                      {currentChapter.image && (
                        <div className="rounded-md shadow border overflow-hidden h-full min-h-[200px]">
                          <img
                            src={IMAGE_URL + currentChapter.image}
                            alt="Chapter"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {currentChapter.description && (
                    <p
                      className="text-lg text-gray-700 leading-7 mb-6 whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: currentChapter.description,
                      }}
                    />
                  )}

                  {currentChapter.activities?.length > 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md text-sm text-yellow-800 shadow-sm space-y-4">
                      <p className="font-semibold text-lg text-yellow-800">
                        📌 Activity
                      </p>
                      {currentChapter.activities.map((activity, idx) => (
                        <div key={idx} className="space-y-3">
                          {activity.mcq?.length > 0 && (
                            <div>
                              <p className="font-semibold text-yellow-700">
                                📝 Multiple Choice Questions:
                              </p>
                              <ul className="pl-5 list-disc space-y-1">
                                {activity.mcq.map((q, i) => (
                                  <li key={i}>
                                    <p>{q.question}</p>
                                    <ul className="pl-4 list-decimal text-gray-700">
                                      {q.options.map((opt, j) => (
                                        <li key={j}>{opt.name}</li>
                                      ))}
                                    </ul>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {activity.yesno?.length > 0 && (
                            <div>
                              <p className="font-semibold text-yellow-700">
                                ✔️ Yes/No Questions:
                              </p>
                              <ul className="pl-5 list-disc space-y-1">
                                {activity.yesno.map((q, i) => (
                                  <li key={i}>{q.question}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {activity.blank?.length > 0 && (
                            <div>
                              <p className="font-semibold text-yellow-700">
                                ✏️ Fill in the Blanks:
                              </p>
                              <ul className="pl-5 list-disc space-y-1">
                                {activity.blank.map((q, i) => (
                                  <li key={i}>
                                    {q.question.replace("______", "______")}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-between items-center mt-10">
                <button
                  disabled={
                    currentModuleIndex === 0 && currentChapterIndex === 0
                  }
                  onClick={goToPrevChapter}
                  className="px-4 py-2 border rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                >
                  ← Previous
                </button>

                {/* {currentChapterIndex === currentModule.chapters.length - 1 && (
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600 transition"
                  >
                    🧠 Start Quiz ({currentModule.quiz?.questions || 0} Qs)
                  </button>
                )} */}

                <button
                  onClick={goToNextChapter}
                  disabled={
                    currentModuleIndex === courseData.modules.length - 1 &&
                    currentChapterIndex === currentModule.chapters.length - 1
                  }
                  className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition disabled:opacity-40"
                >
                  Next <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseLearningPage;
