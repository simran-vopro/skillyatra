import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { useCourseList } from "../hooks/userCourseList";
import type { CategoryType } from "../types/course";
import { API_PATHS, IMAGE_URL } from "../utils/config";
import { useAxios } from "../hooks/useAxios";
import moment from 'moment';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>();

  const {
    data: categories,
  } = useAxios<CategoryType[]>({
    url: API_PATHS.CATEGORIES,
    method: "get",
  });

  const { courseData } = useCourseList({ searchQuery: selectedCategory?._id });

  const navigate = useNavigate();

  return (
    <div className="space-y-16 container-padding py-6 md:py-10">
      {/* Section 1 - Hero */}
      <section
        className="relative bg-cover bg-center rounded-lg overflow-hidden p-6 md:p-10 h-[400px]"
        style={{
          backgroundImage:
            "url('https://img-c.udemycdn.com/notices/web_carousel_slide/image/736cd7ed-d5ca-4efe-9e8d-2eb845e414cb.png')",
        }}
      >
        {/* Text content */}
        <div className="h-full relative z-10 max-w-[550px] bg-white bg-opacity-90 p-6 md:p-10 rounded-xl shadow-md backdrop-blur-md flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Skills that drive you<br></br>forward
          </h1>
          <p className="text-gray-700 mb-4 text-lg">
            Technology and the world of work change fast — with us, you’re
            faster. Get the skills to achieve goals and stay competitive.
          </p>
          <button className="w-40 bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-md font-semibold">
            View Plans
          </button>
        </div>
      </section>

      {/* Section 2 - Skills & Courses */}
      <section>
        <h2 className="text-3xl font-bold text-gray-700 mb-6">
          All the skills you need in one place
        </h2>

        {/* Main Tabs */}
        <div className="flex flex-wrap gap-3">
          {categories?.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-full border ${cat.name === selectedCategory?.name
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-800"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>



        {/* Swiper Slider */}
        <Swiper spaceBetween={20} slidesPerView={4} className="mt-6">
          {courseData.map((course, index) => (
            <SwiperSlide key={index}>
              <div onClick={() => navigate("/singleCourseBeforeLogin", { state: { courseId: course._id } })} className="cursor-pointer mb-5 relative group bg-white rounded-xl overflow-hidden shadow hover:shadow-sky-200 transition duration-300">
                <img
                  src={IMAGE_URL + course.thumbnail}
                  alt={course.title}
                  className="w-full h-50 object-cover"
                />
                <div className="p-4">
                  {course.category && (
                    <span className="text-xs text-purple-600 font-semibold">
                      {course.category.name}
                    </span>
                  )}
                  <h3 className="font-bold text-lg mt-1 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    Updated {moment(course.updatedAt).format("MMMM YYYY")}
                  </div>
                  <div className="font-semibold text-lg text-gray-900 mt-2">
                    ${course.pricing}
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-right mt-4">
          <button className="text-purple-600 hover:underline flex items-center gap-1">
            Show all  courses{" "}
            <ChevronRight size={16} />
          </button>
        </div>
      </section>


    </div>
  );
};

export default HomePage;
