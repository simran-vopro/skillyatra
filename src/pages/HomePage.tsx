import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Development",
    subCategories: [
      {
        name: "Web Development",
        courses: [
          {
            title: "React - The Complete Guide",
            tag: "Bestseller",
            updated: "May 2024",
            shortDescription:
              "Master React from basics to advanced. Learn hooks, context, routing, and more.",
            skills: [
              "React Hooks",
              "Routing",
              "Context API",
              "Advanced Patterns",
            ],
            price: "$14.99",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPB1fsoQykBFtGM19eymE52pQ_pCP3x1sK_dqKi_yO8TKJGhXVg3kdtYrn_9jqobit-BA&usqp=CAU",
            description:
              "Build powerful, fast, user-friendly and reactive web apps.",
          },
          {
            title: "Mastering Tailwind CSS",
            tag: "New",
            updated: "May 2024",
            shortDescription:
              "Responsive, utility-first design with Tailwind CSS — fast and scalable.",
            skills: ["Utility Classes", "Responsive Design", "Custom Themes"],
            price: "$10.99",
            image:
              "https://miro.medium.com/v2/resize:fit:1200/1*TK4Kdj-cc890gQkgUtKNyA.png",
            description: "Build stunning UIs quickly with Tailwind CSS.",
          },
          {
            title: "Node.js Developer Bootcamp",
            tag: "",
            updated: "April 2024",
            shortDescription:
              "Build backend APIs with Node.js, Express, MongoDB, and JWT authentication.",
            skills: ["Express.js", "MongoDB", "REST APIs", "Authentication"],
            price: "$13.99",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgciwmDQPGLqXJxyYtL_-ZQ1TTiB_E8UDZNw&s",
            description: "Master backend development using Node.js.",
          },
          {
            title: "Django for Beginners",
            tag: "",
            updated: "March 2024",
            shortDescription:
              "Build secure and scalable web apps with Django and PostgreSQL.",
            skills: ["Django ORM", "Authentication", "Admin Panel", "CRUD"],
            price: "$12.99",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpbKx3AyatfAg-qIVl6HspVHeS4H4n06-OAQ&s",
            description:
              "Get started with Python's most popular web framework.",
          },
        ],
      },
      {
        name: "Backend Development",
        courses: [
          {
            title: "Node.js Developer Bootcamp",
            tag: "",
            updated: "April 2024",
            shortDescription:
              "Build backend APIs with Node.js, Express, MongoDB, and JWT authentication.",
            skills: ["Express.js", "MongoDB", "REST APIs", "Authentication"],
            price: "$13.99",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgciwmDQPGLqXJxyYtL_-ZQ1TTiB_E8UDZNw&s",
            description: "Master backend development using Node.js.",
          },
          {
            title: "Django for Beginners",
            tag: "",
            updated: "March 2024",
            shortDescription:
              "Build secure and scalable web apps with Django and PostgreSQL.",
            skills: ["Django ORM", "Authentication", "Admin Panel", "CRUD"],
            price: "$12.99",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpbKx3AyatfAg-qIVl6HspVHeS4H4n06-OAQ&s",
            description:
              "Get started with Python's most popular web framework.",
          },
        ],
      },
      {
        name: "Mobile App Development",
        courses: [
          {
            title: "Flutter & Dart - Build iOS and Android Apps",
            tag: "Bestseller",
            updated: "May 2024",
            shortDescription: "Cross-platform apps using Flutter and Dart.",
            skills: ["Flutter", "Dart", "Widgets", "Firebase"],
            price: "$14.49",
            image:
              "https://onlyflutter.com/wp-content/uploads/2024/04/flutter_site_image_onlyflutter-768x432.png",
            description: "Build stunning cross-platform apps fast.",
          },
        ],
      },
      {
        name: "Game Development",
        courses: [
          {
            title: "Unity Game Development",
            tag: "",
            updated: "Feb 2024",
            shortDescription: "Create 2D/3D games using Unity and C#.",
            skills: ["Unity", "C#", "Game Physics", "Animations"],
            price: "$13.99",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUXjdWD2BrP7aHpQmglwsK8DIf4nIMqUVDzQ&s",
            description: "Game dev made easy with Unity.",
          },
        ],
      },
      {
        name: "Software Testing",
        courses: [
          {
            title: "Selenium with Java",
            tag: "",
            updated: "Jan 2024",
            shortDescription: "Automated testing with Selenium and TestNG.",
            skills: ["Selenium", "TestNG", "Java", "Maven"],
            price: "$10.49",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSADMhwnEKE-8XKLnnk0DYOy2G4yG8lZMpjEQ&s",
            description: "Learn how to automate your testing process.",
          },
        ],
      },
      {
        name: "DevOps",
        courses: [
          {
            title: "Docker & Kubernetes Mastery",
            tag: "Top Rated",
            updated: "March 2024",
            shortDescription:
              "CI/CD with Docker, Kubernetes, Jenkins & GitHub Actions.",
            skills: ["Docker", "Kubernetes", "CI/CD", "Deployment"],
            price: "$15.99",
            image:
              "https://miro.medium.com/v2/resize:fit:1400/1*h5Zs-8nFcTrgR1UceyKYXA.png",
            description: "Build and deploy modern apps with DevOps tools.",
          },
        ],
      },
    ],
  },
  {
    name: "Data Science",
    subCategories: [
      {
        name: "Machine Learning",
        courses: [
          {
            title: "Machine Learning A-Z",
            tag: "Bestseller",
            updated: "Feb 2024",
            shortDescription:
              "Learn Machine Learning with hands-on projects using Sklearn & TensorFlow.",
            skills: [
              "Regression",
              "Classification",
              "Neural Networks",
              "TensorFlow",
            ],
            price: "$13.99",
            image: "/images/course7.jpg",
            description:
              "Master practical ML algorithms with real case studies.",
          },
        ],
      },
      {
        name: "Deep Learning",
        courses: [
          {
            title: "Deep Learning with PyTorch",
            tag: "",
            updated: "April 2024",
            shortDescription:
              "Use PyTorch to build models for computer vision & NLP.",
            skills: ["CNN", "RNN", "PyTorch", "Transfer Learning"],
            price: "$15.99",
            image: "/images/course8.jpg",
            description: "Hands-on deep learning with PyTorch.",
          },
        ],
      },
      {
        name: "Data Analysis",
        courses: [
          {
            title: "Python for Data Analysis",
            tag: "",
            updated: "March 2024",
            shortDescription:
              "Analyze real data with Pandas, NumPy, and Matplotlib.",
            skills: ["Pandas", "NumPy", "EDA", "Matplotlib"],
            price: "$11.99",
            image: "/images/course3.jpg",
            description: "Analyze and visualize data using Python.",
          },
        ],
      },
      {
        name: "Statistics",
        courses: [
          {
            title: "Statistics for Data Science",
            tag: "",
            updated: "Feb 2024",
            shortDescription:
              "Core statistics concepts for data science and ML.",
            skills: ["Probability", "Hypothesis Testing", "Distributions"],
            price: "$9.99",
            image: "/images/course22.jpg",
            description: "Essential statistics for every data scientist.",
          },
        ],
      },
      {
        name: "Data Engineering",
        courses: [
          {
            title: "Big Data & Spark Basics",
            tag: "New",
            updated: "Jan 2024",
            shortDescription:
              "Learn Spark and Hadoop with real-world ETL pipelines.",
            skills: ["Spark", "HDFS", "ETL", "Scala"],
            price: "$12.99",
            image: "/images/course23.jpg",
            description: "Get started in Big Data pipelines.",
          },
        ],
      },
      {
        name: "NLP",
        courses: [
          {
            title: "NLP with Python",
            tag: "",
            updated: "March 2024",
            shortDescription:
              "Text classification, sentiment analysis and more using NLTK & spaCy.",
            skills: ["Text Preprocessing", "TF-IDF", "Sentiment Analysis"],
            price: "$11.99",
            image: "/images/course24.jpg",
            description: "Understand and build NLP pipelines.",
          },
        ],
      },
    ],
  },
  {
    name: "Design",
    subCategories: [
      {
        name: "UI/UX Design",
        courses: [
          {
            title: "UI/UX Design Masterclass",
            tag: "Bestseller",
            updated: "Feb 2024",
            shortDescription:
              "Create user-centric designs with Figma, Sketch & Adobe XD.",
            skills: [
              "Wireframes",
              "Prototyping",
              "User Research",
              "Design Systems",
            ],
            price: "$12.49",
            image: "/images/course10.jpg",
            description: "Design beautiful and intuitive user experiences.",
          },
        ],
      },
      {
        name: "Graphic Design",
        courses: [
          {
            title: "Adobe Photoshop Essentials",
            tag: "",
            updated: "Jan 2024",
            shortDescription:
              "Learn Photoshop from scratch to professional editing.",
            skills: ["Layers", "Photo Editing", "Typography", "Branding"],
            price: "$9.99",
            image: "/images/course11.jpg",
            description:
              "Create professional-level designs with Adobe Photoshop.",
          },
        ],
      },
      {
        name: "Animation",
        courses: [
          {
            title: "2D Animation in After Effects",
            tag: "",
            updated: "Feb 2024",
            shortDescription:
              "Animate objects and scenes using Adobe After Effects.",
            skills: ["Keyframes", "Motion Design", "Timing"],
            price: "$11.99",
            image: "/images/course25.jpg",
            description: "Animate like a pro using After Effects.",
          },
        ],
      },
    ],
  },
  {
    name: "Marketing",
    subCategories: [
      {
        name: "Digital Marketing",
        courses: [
          {
            title: "Digital Marketing Masterclass",
            tag: "Bestseller",
            updated: "May 2024",
            shortDescription:
              "Learn SEO, Facebook Ads, Google Analytics & more.",
            skills: ["SEO", "PPC", "Social Media", "Email Funnels"],
            price: "$13.49",
            image: "/images/course9.jpg",
            description: "Grow your business with online marketing strategies.",
          },
        ],
      },
      {
        name: "Content Marketing",
        courses: [
          {
            title: "Content Writing for Beginners",
            tag: "",
            updated: "March 2024",
            shortDescription:
              "Write engaging blog posts, ads & product descriptions.",
            skills: ["Copywriting", "Headlines", "SEO Writing", "Conversions"],
            price: "$10.49",
            image: "/images/course16.jpg",
            description: "Craft content that drives traffic and sales.",
          },
        ],
      },
    ],
  },
  {
    name: "Personal Development",
    subCategories: [
      {
        name: "Productivity",
        courses: [
          {
            title: "Time Management Mastery",
            tag: "",
            updated: "Jan 2024",
            shortDescription:
              "Become productive using prioritization, Pomodoro & GTD.",
            skills: ["Time Blocking", "GTD", "Focus", "Habits"],
            price: "$8.99",
            image: "/images/course14.jpg",
            description: "Boost productivity and manage time effectively.",
          },
        ],
      },
    ],
  },
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    categories[0].subCategories[0]
  );


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
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedSubCategory(cat.subCategories[0]);
              }}
              className={`px-4 py-2 rounded-full border ${
                cat.name === selectedCategory.name
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sub-category Tabs */}
        <div className="flex gap-2 mt-4">
          {selectedCategory.subCategories.map((sub) => (
            <button
              key={sub.name}
              onClick={() => setSelectedSubCategory(sub)}
              className={`px-3 py-1 rounded-md border ${
                sub.name === selectedSubCategory.name
                  ? "bg-purple-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* Swiper Slider */}
        <Swiper spaceBetween={20} slidesPerView={4} className="mt-6">
          {selectedSubCategory.courses.map((course, index) => (
            <SwiperSlide key={index}>
              <div onClick={() => navigate("/singleCourseBeforeLogin")} className="cursor-pointer relative group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-50 object-cover"
                />
                <div className="p-4">
                  {course.tag && (
                    <span className="text-xs text-purple-600 font-semibold">
                      {course.tag}
                    </span>
                  )}
                  <h3 className="font-bold text-lg mt-1 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    {course.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    Updated {course.updated}
                  </div>
                  <div className="font-semibold text-lg text-gray-900 mt-2">
                    {course.price}
                  </div>
                </div>
                <div className="absolute hidden group-hover:block top-0 left-full ml-2 w-80 bg-white border rounded-xl shadow-lg p-4 z-50">
                  <h4 className="font-semibold mb-2">Course summary</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    {course.shortDescription}
                  </p>
                  <h5 className="font-semibold text-sm mb-1">
                    Skills you will learn
                  </h5>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {course.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-right mt-4">
          <button className="text-purple-600 hover:underline flex items-center gap-1">
            Show all {selectedSubCategory.name} courses{" "}
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Section 3 - Popular Picks */}
      <section>
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Popular Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {selectedCategory.subCategories
            .flatMap((sc) => sc.courses.slice(0, 1))
            .map((course, idx) => (
              <div key={idx} onClick={() => navigate("/singleCourseBeforeLogin")} className="cursor-pointer bg-white rounded-xl shadow p-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="font-bold text-lg mt-2 mb-1">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {course.description}
                </p>
                <div className="text-sm text-gray-500">
                  Updated {course.updated}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
