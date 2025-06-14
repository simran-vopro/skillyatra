// src/pages/LoginPage.tsx
import { Mail, Lock } from "lucide-react";
import OrangeOutlineButton from "../components/Button/OrangeOutlineButton";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden lg:flex min-h-[700px]">
      {/* Left Image Section */}
      <div
        className="w-full lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/028/241/446/non_2x/screen-technology-background-use-the-login-to-access-the-system-it-is-a-illustration-designed-to-look-modern-and-hi-tech-suitable-for-work-related-to-technology-vector.jpg")` }}
      ></div>

      {/* Right Login Form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="text-left max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">Welcome Back</h2>
          <p className="text-gray-600 mb-8">Login to your SkillYatra account</p>

          <form className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative border-b border-gray-300 focus-within:border-purple-500">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full bg-transparent focus:outline-none py-2 text-gray-700"
                />
                <Mail className="absolute right-0 top-2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative border-b border-gray-300 focus-within:border-purple-500">
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full bg-transparent focus:outline-none py-2 text-gray-700"
                />
                <Lock className="absolute right-0 top-2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="pt-6">
              <OrangeOutlineButton label="Login" className="w-full" onClick={() => navigate("/verify")}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;