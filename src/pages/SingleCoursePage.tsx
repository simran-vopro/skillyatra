import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import OrangeOutlineButton from "../components/Button/OrangeOutlineButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { API_PATHS, IMAGE_URL } from "../utils/config";
import type { Course } from "../types/course";
import moment from "moment";

const AccordionItem = ({ section, lectures, duration, items, navigate }: any) => {
  const [open, setOpen] = useState(false);

  // const handleQuizNavigation = () => {
  //   console.log("Navigating to quiz for:", section);
  //   navigate("/quiz/1");
  // };

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
          {/* <div className="flex items-center my-3">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-xs text-gray-400">Quiz</span>
            <hr className="flex-grow border-gray-300" />
          </div> */}

          {/* Quiz Button */}
          {/* <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Ready to test your understanding of this module?
            </p>
            <button
              onClick={handleQuizNavigation}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2 px-4 rounded-md transition"
            >
              Take Module Quiz
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

const SingleCoursePage = () => {


  const location = useLocation();
  const { courseId } = location.state || {};

  const [course, setCourse] = useState<Course>();

  const {
    data: courseData,
    loading: courseDefaultLoading
  } = useAxios({
    url: courseId ? `${API_PATHS.COURSE_DETAIL}/${courseId}` : "",
    method: "get",
  });

  useEffect(() => {
    if (!courseDefaultLoading) {
      setCourse(courseData);
    }
  }, [courseData, courseDefaultLoading]);

  const navigate = useNavigate();
  const modules = course?.modules || [];
  const totalModules = modules.length;
  const totalChapters = modules.reduce(
    (acc, mod) => acc + (mod.chapters?.length || 0),
    0
  );

  // Optional: If each chapter has an estimated 5 minutes duration
  const estimatedMinutes = totalChapters * 5;
  const hours = Math.floor(estimatedMinutes / 60);
  const minutes = estimatedMinutes % 60;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2">
        {/* Header Info */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 capitalize">
            {course?.category.name}
          </p>
          <h1 className="text-3xl font-bold text-gray-800 mt-2 capitalize">
            {course?.title}
          </h1>
          <p className="mt-2 text-gray-600">
            {course?.description}
          </p>

          <div className="mt-4 text-sm text-gray-500 space-y-1">
            <p>
              Created by{" "}
              <span className="text-purple-600 font-medium">
                {course?.instructor.firstName}  {course?.instructor.lastName}
              </span>
            </p>
            <p>Last updated {moment(course?.updatedAt).format("MMMM YYYY")} • {course?.language}</p>
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

          <div className="list-disc pl-6 space-y-2 text-gray-700" dangerouslySetInnerHTML={{ __html: course?.whatYouLearn || '' }} />


          {/* <ul className="list-disc pl-6 space-y-2 text-gray-700">
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
          </ul> */}
        </div>

        {/* This Course Includes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">This course includes:</h2>
          <div className="list-disc pl-6 space-y-2 text-gray-700" dangerouslySetInnerHTML={{ __html: course?.courseInclude || '' }} />
        </div>

        {/* Accordion Course Content */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Course content</h2>
          <p className="text-gray-700 mb-4">
            {totalModules} modules • {totalChapters} chapters • {hours}h {minutes}m total length
          </p>

          {course?.modules?.map((module, index) => {
            const lectures = module.chapters.length;
            const duration = `${lectures * 5} mins`; // or calculate actual time if you have it
            const items = module.chapters.map((chapter) => ({
              title: chapter.title,
              time: "5 mins", // optional: use real duration if available
            }));

            return (
              <AccordionItem
                key={index}
                section={module.name}
                lectures={lectures}
                duration={duration}
                items={items}
                navigate={navigate}
              />
            );
          })}
        </div>

        {/* Who This Course is For */}
        <div className="mt-12 mb-20">
          <h2 className="text-2xl font-bold mb-4">Who this course is for:</h2>
          <div className="list-disc pl-6 space-y-2 text-gray-700" dangerouslySetInnerHTML={{ __html: course?.audience || '' }} />

        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="hidden lg:block">
        {/* Description */}
        <div className="mb-12">
          {/* <h2 className="text-2xl font-bold mb-4">Description</h2> */}

          <img
            src={(typeof course?.thumbnail === "string" && course?.thumbnail.startsWith("/upload")) ? IMAGE_URL + course?.thumbnail : course?.thumbnail}
            className="img-fluid w-full rounded-top"
            alt=""
          />


        </div>

        {/* Requirements */}
        <div className="my-12">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <div className="list-disc pl-6 space-y-2 text-gray-700" dangerouslySetInnerHTML={{ __html: course?.requirements || '' }} />

        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="relative pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={course?.promoVideo}
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

          <p className="text-2xl font-semibold text-gray-800 mb-3">${course?.pricing}</p>

          <button onClick={() => navigate("/cart")} className="w-full border border-purple-600 text-purple-600 font-semibold py-2 text-sm rounded-md hover:bg-purple-50 transition">
            Add to cart
          </button>
          <button onClick={() => navigate("/account")} className="w-full bg-purple-600 text-white font-semibold py-2 text-sm rounded-md mt-2 hover:bg-purple-700 transition">
            Buy now
          </button>
        </div>

        {/* Quiz Section */}
        {/* <div className="bg-white border rounded-lg shadow p-4 mt-6">
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
        </div> */}
      </aside>
    </div>
  );
};

export default SingleCoursePage;
