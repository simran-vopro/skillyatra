import { useState } from "react";
import { PlayCircle, Clock, ChevronRight, Star } from "lucide-react";
import QuizPage from "./QuizPage";

const modules = [
  {
    title: "Introduction to NLP",
    duration: "07:48",
    chapters: [
      {
        title: "What is NLP?",
        duration: "03:50",
        content: {
          text: `Welcome to the course! In this chapter, you’ll learn what NLP is and why it matters in today’s world.`,
          videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
          images: [
            "https://t4.ftcdn.net/jpg/06/33/58/59/360_F_633585902_KexTjslrwzOwK7X83VYCVT85nF4sKxjF.jpg",
          ],
          activity:
            "✅ Try writing your own sentence tokenizer using Python’s `nltk` library.",
        },
      },
    ],
    quiz: {
      questions: 5,
      time: "5 min",
    },
  },
  {
    title: "Why Learn NLP?",
    duration: "05:59",
    chapters: [
      {
        title: "Real-World Applications",
        duration: "02:30",
        content: {
          text: `Natural Language Processing helps computers understand human language...`,
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          images: [],
          activity:
            "💡 Activity: List 3 applications of NLP you've used unknowingly in daily life.",
        },
      },
    ],
    quiz: {
      questions: 4,
      time: "4 min",
    },
  },
  {
    title: "Installing Python & Environment Setup",
    duration: "06:00",
    chapters: [
      {
        title: "Setup Instructions",
        duration: "06:00",
        content: {
          text: `Before diving in, ensure Python and essential libraries are installed...`,
          videoUrl: "",
          images: [
            "https://www.shutterstock.com/image-photo/hands-typing-on-laptop-programming-600nw-2480023489.jpg",
          ],
          activity:
            "🛠️ Task: Install Python and VSCode. Take a screenshot after setup.",
        },
      },
    ],
    quiz: {
      questions: 3,
      time: "3 min",
    },
  },
];

const CourseLearningPage = () => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const [showQuiz, setShowQuiz] = useState(false);

  const currentModule = modules[currentModuleIndex];
  const currentChapter = currentModule.chapters[currentChapterIndex];
  const totalModules = modules.length;
  const progressPercent = ((currentModuleIndex + 1) / totalModules) * 100;

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
      const prevModule = modules[currentModuleIndex - 1];
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentChapterIndex(prevModule.chapters.length - 1);
    }
  };

  return (
    <div className="container-padding min-h-screen">
      {/* Header */}
      <div className="p-6 bg-blue-50 rounded-lg shadow my-6">
        <p className="text-sm text-gray-500">
          Development &gt; Data Science &gt; Python
        </p>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">
          Data Science: Natural Language Processing (NLP) in Python
        </h1>
        <p className="mt-2 text-gray-600">
          Applications: spam detection, sentiment analysis, article spinners,
          and more.
        </p>
        <div className="mt-4 text-sm text-gray-500 space-y-1">
          <p>
            Created by{" "}
            <span className="text-purple-600 font-medium">Instructor Name</span>
          </p>
          <p>Last updated 6/2025 • English • English [Auto], German [Auto]</p>
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
        {/* Sidebar */}
        <aside className="lg:col-span-1 bg-gray-100 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-purple-700">
            Course Modules
          </h2>
          <ul className="space-y-4">
            {modules.map((mod, mIndex) => (
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
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" />
                    {mod.title}
                  </div>
                  <span className="text-xs text-gray-500">{mod.duration}</span>
                </div>
                <ul className="ml-5 mt-2 space-y-1">
                  {mod.chapters.map((chapter, cIndex) => (
                    <li
                      key={cIndex}
                      onClick={() => {
                        setCurrentModuleIndex(mIndex);
                        setCurrentChapterIndex(cIndex);
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

                  {/* Start Quiz Button - Below chapters */}
                  <li className="mt-3">
                    <button
                      onClick={() => {
                        setCurrentModuleIndex(mIndex);
                        setCurrentChapterIndex(mod.chapters.length - 1);
                        setShowQuiz(true);
                        // You could also trigger quiz view here in the future
                      }}
                      className="text-left w-full text-sm bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 rounded font-medium"
                    >
                      🧠 Start Quiz ({mod.quiz.questions} Qs)
                    </button>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            {currentChapter.title}
          </h1>
          <p className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Clock className="w-4 h-4" /> Duration: {currentChapter.duration}
          </p>

          {showQuiz ? (
            <QuizPage />
          ) : (
            <>
              {currentChapter.content.videoUrl && (
                <div className="relative pb-[56.25%] mb-6">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-md"
                    src={currentChapter.content.videoUrl}
                    title="Chapter Video"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <p className="text-lg text-gray-700 leading-7 mb-6 whitespace-pre-line">
                {currentChapter.content.text}
              </p>

              {currentChapter.content.images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {currentChapter.content.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Module visual"
                      className="rounded-md shadow border"
                    />
                  ))}
                </div>
              )}

              {currentChapter.content.activity && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md text-sm text-yellow-800 shadow-sm">
                  <p className="font-semibold mb-1">📌 Activity</p>
                  <p>{currentChapter.content.activity}</p>
                </div>
              )}
            </>
          )}

          <div className="flex justify-between items-center mt-10">
            <button
              disabled={currentModuleIndex === 0 && currentChapterIndex === 0}
              onClick={goToPrevChapter}
              className="px-4 py-2 border rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40"
            >
              ← Previous
            </button>

            {currentChapterIndex === currentModule.chapters.length - 1 && (
              <button
                onClick={() => setShowQuiz(true)}
                className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600 transition"
              >
                🧠 Start Quiz ({currentModule.quiz.questions} Qs,{" "}
                {currentModule.quiz.time})
              </button>
            )}

            <button
              onClick={goToNextChapter}
              disabled={
                currentModuleIndex === modules.length - 1 &&
                currentChapterIndex === currentModule.chapters.length - 1
              }
              className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition disabled:opacity-40"
            >
              Next <ChevronRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseLearningPage;
