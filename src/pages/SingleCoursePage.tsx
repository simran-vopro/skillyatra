import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import OrangeOutlineButton from "../components/Button/OrangeOutlineButton";
import { useNavigate } from "react-router-dom";

const AccordionItem = ({ section, lectures, duration, items, navigate }: any) => {
  const [open, setOpen] = useState(false);
  const handleQuizNavigation = () => {
    console.log("Navigating to quiz for:", section);
    navigate("/quiz/1"); // Replace with actual quiz route
    // You can replace with routing logic later
  };

  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 text-left"
      >
        <div className="font-medium">
          {section}{" "}
          <span className="text-sm text-gray-500">
            • {lectures} lectures • {duration}
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {open && (
        <div className="p-4 space-y-3 text-sm text-gray-700">
          <ul className="space-y-2">
            {items.map((item: any, index: number) => (
              <li key={index} className="flex justify-between">
                <span>{item.title}</span>
                <span>{item.time}</span>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="flex items-center my-3">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-xs text-gray-400">Quiz</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Quiz Button */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Ready to test your understanding of this module?
            </p>
            <button
              onClick={handleQuizNavigation}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2 px-4 rounded-md transition"
            >
              Take Module Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SingleCoursePage = () => {
  const courseContent = [
    {
      section: "Natural Language Processing - What is it used for?",
      lectures: 3,
      duration: "22min",
      items: [
        { title: "Introduction and Outline", time: "07:48" },
        { title: "Why Learn NLP?", time: "05:59" },
        { title: "The Central Message of this Course", time: "08:12" },
      ],
    },
    {
      section: "Course Preparation",
      lectures: 3,
      duration: "17min",
      items: [
        { title: "Installing Python", time: "05:00" },
        { title: "Setting up environment", time: "06:00" },
        { title: "Installing libraries", time: "06:00" },
      ],
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2">
        {/* Header Info */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Development &gt; Data Science &gt; Python
          </p>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            Data Science: Natural Language Processing (NLP) in Python
          </h1>
          <p className="mt-2 text-gray-600">
            Applications: decrypting ciphers, spam detection, sentiment
            analysis, article spinners, and latent semantic analysis.
          </p>

          <div className="mt-4 text-sm text-gray-500 space-y-1">
            <p>
              Created by{" "}
              <span className="text-purple-600 font-medium">
                Instructor Name
              </span>
            </p>
            <p>Last updated 6/2025 • English • English [Auto], German [Auto]</p>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-md">
            <p className="font-medium">Premium</p>
            <p className="text-sm text-gray-600">
              Access this top-rated course, plus 26,000+ more top-rated courses,
              with a SkillsYatra plan.
              <span className="text-purple-600 font-medium ml-1 cursor-pointer hover:underline">
                See Plans & Pricing
              </span>
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

          <div className="mt-6">
            <OrangeOutlineButton
              label="Start Subscription"
              className="px-6"
              onClick={() => console.log("Subscribe")}
            />
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              Write your own cipher decryption algorithm using genetic
              algorithms and language modeling with Markov models
            </li>
            <li>Write your own spam detection code in Python</li>
            <li>Write your own sentiment analysis code in Python</li>
            <li>
              Perform latent semantic analysis or latent semantic indexing in
              Python
            </li>
            <li>
              Have an idea of how to write your own article spinner in Python
            </li>
            <li>
              Understand important foundations for OpenAI ChatGPT, GPT-4,
              DALL-E, Midjourney, and Stable Diffusion
            </li>
          </ul>
        </div>

        {/* This Course Includes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">This course includes:</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>12 hours on-demand video</li>
            <li>Access on mobile and TV</li>
            <li>Certificate of completion</li>
          </ul>
        </div>

        {/* Accordion Course Content */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Course content</h2>
          <p className="text-gray-700 mb-4">
            16 sections • 90 lectures • 11h 55m total length
          </p>
          {courseContent.map((section, index) => (
            <AccordionItem key={index} navigate={navigate} {...section} />
          ))}
        </div>

        {/* Who This Course is For */}
        <div className="mt-12 mb-20">
          <h2 className="text-2xl font-bold mb-4">Who this course is for:</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Students who are comfortable writing Python code</li>
            <li>
              Students who want to learn more about machine learning but don't
              want to do a lot of math
            </li>
            <li>
              Professionals who are interested in applying NLP to real-world
              problems
            </li>
            <li>
              This course is NOT for those who find the tasks and methods listed
              too basic
            </li>
            <li>
              This course is NOT for those who don’t understand basic ML and
              Python (take the free Numpy course first)
            </li>
          </ul>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="hidden lg:block">
        {/* Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-700 leading-7">
            Ever wondered how AI technologies like OpenAI ChatGPT, GPT-4,
            DALL-E, Midjourney, and Stable Diffusion really work? In this
            course, you will learn the foundations of these groundbreaking
            applications...
            <span onClick={() => navigate("/register")} className="text-purple-600 cursor-pointer ml-2">
              Show more
            </span>
          </p>
        </div>

        {/* Requirements */}
        <div className="my-12">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Install Python, it's free!</li>
            <li>
              You should be at least somewhat comfortable writing Python code
            </li>
            <li>
              Know how to install numerical libraries for Python such as Numpy,
              Scipy, Scikit-learn, Matplotlib, and BeautifulSoup
            </li>
            <li>
              Take my free Numpy prerequisites course (it's FREE, no excuses!)
            </li>
            <li>Optional: linear algebra and probability are helpful</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="relative pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              title="Course Preview"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-4 border-t bg-black flex flex-col items-center justify-center mb-10">
            <p className="text-sm text-gray-600 mb-2">Already enrolled?</p>
            <OrangeOutlineButton
              label="Login to Continue"
              onClick={() => console.log("Login")}
            />
          </div>
        </div>

        {/* Subscription Box */}
        <div className="bg-white border rounded-lg shadow p-4">
          <p className="text-xs text-purple-600 font-medium flex items-center gap-1 mb-2">
            <span className="text-purple-700">🔒</span> This Premium course is
            included in plans
          </p>
          <h3 className="text-base font-semibold mb-1">
            Subscribe to SkillsYatra’s top courses
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Get this course, plus 26,000+ of our top-rated courses, with
            Personal Plan.{" "}
            <span className="text-purple-600 font-medium cursor-pointer hover:underline">
              Learn more
            </span>
          </p>

          <button onClick={() => navigate("/account")} className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 rounded-md transition">
            Start subscription
          </button>
          <p className="text-center text-xs text-gray-500 mt-1">
            Starting at $500 per month • Cancel anytime
          </p>

          <div className="flex items-center my-3">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-xs text-gray-400">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <p className="text-2xl font-semibold text-gray-800 mb-3">$3,119</p>

          <button onClick={() => navigate("/cart")} className="w-full border border-purple-600 text-purple-600 font-semibold py-2 text-sm rounded-md hover:bg-purple-50 transition">
            Add to cart
          </button>
          <button onClick={() => navigate("/account")} className="w-full bg-purple-600 text-white font-semibold py-2 text-sm rounded-md mt-2 hover:bg-purple-700 transition">
            Buy now
          </button>
        </div>

        {/* Quiz Section */}
        <div className="bg-white border rounded-lg shadow p-4 mt-6">
          <h3 className="text-base font-semibold mb-1 text-gray-800">
            Test Your Knowledge
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Take a short quiz to assess your understanding of the course
            material and reinforce your learning.
          </p>

          <button onClick={() => navigate("/quiz/1")} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md transition">
            Take Quiz
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SingleCoursePage;
