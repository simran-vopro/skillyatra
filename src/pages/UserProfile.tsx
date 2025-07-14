import { useState } from "react";
import { LogOut, Settings, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useCourseList } from "../hooks/userCourseList";
import { API_PATHS, IMAGE_URL } from "../utils/config";
import type { Course } from "../types/course";

const CourseCard = ({ course }: { course: Course }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course", { state: { courseId: course._id } })}
      className="cursor-pointer border rounded-lg p-4 shadow-sm bg-white"
    >
      <img
        src={IMAGE_URL + course.thumbnail}
        alt={course.title}
        className="h-40 w-full object-cover rounded mb-4"
      />
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="text-sm text-gray-500">
        Instructor: {course.instructor.firstName} {course.instructor.lastName}
      </p>
      <div className="mt-2 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div className="bg-purple-600 h-full" style={{ width: `10%` }}></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">10% Complete</p>
    </div>
  );
};

const mockUser = {
  name: "Simran Kaur",
  email: "simran@example.com",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s", // Use any placeholder or actual image
};

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courseData: myCourses } = useCourseList({
    urlPath: API_PATHS.MY_COURSES,
  });

  console.log("My Courses:", myCourses);

  const [activeTab, setActiveTab] = useState<
    "overview" | "courses" | "settings"
  >("overview");

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={mockUser.avatar}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border border-gray-300 object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {mockUser.name}
            </h2>
            <p className="text-gray-500">{mockUser.email}</p>
          </div>
        </div>
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
          className="text-red-500 text-sm flex items-center gap-1 hover:underline"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        {[
          {
            key: "overview",
            label: "Overview",
            icon: <UserCircle size={18} />,
          },
          {
            key: "courses",
            label: "My Courses",
            icon: <UserCircle size={18} />,
          },
          { key: "settings", label: "Settings", icon: <Settings size={18} /> },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`pb-2 text-sm font-medium border-b-2 ${
              activeTab === key
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-purple-600"
            } flex items-center gap-2`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === "overview" && (
          <div className="text-gray-700 space-y-2">
            <p>Welcome back, {mockUser.name}! 👋</p>
            <p>You’ve enrolled in {myCourses?.length} course(s).</p>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="text-gray-600">
            <p>Settings screen coming soon…</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
