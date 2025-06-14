// src/pages/SignupPage.tsx
import { Mail, User } from "lucide-react";
import OrangeOutlineButton from "../components/Button/OrangeOutlineButton";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden lg:flex min-h-[700px]">
      {/* Left Image Section */}
      <div
        className="w-full lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url("https://static.vecteezy.com/system/resources/thumbnails/009/690/713/small_2x/white-notepad-and-ink-pen-on-the-wooden-desk-register-now-concept-photo.jpg")` }}
      ></div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="text-left max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">
            Sign up with email
          </h2>
          <p className="text-gray-600 mb-8">Create your SkillYatra account</p>
        

          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative border-b border-gray-300 focus-within:border-purple-500">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-transparent focus:outline-none text-gray-700 text-base py-2 pr-10"
                />
                <User className="absolute right-0 top-2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative border-b border-gray-300 focus-within:border-purple-500">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent focus:outline-none text-gray-700 text-base py-2 pr-10"
                />
                <Mail className="absolute right-0 top-2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Sign up button */}
            <OrangeOutlineButton
              label="Sign Up"
              className="w-full"
              onClick={() => console.log("register")}
            />

            {/* Other sign up options */}
            <div className="text-center text-sm text-gray-500">OR</div>
            <button className="w-full border border-gray-300 rounded-md py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
              Continue with Google
            </button>
          </form>

          {/* Terms and policies */}
          <p className="text-xs text-gray-500 mt-6 text-center">
            By signing up, you agree to our{" "}
            <span className="text-purple-600 underline cursor-pointer">
              Terms of Use
            </span>{" "}
            and{" "}
            <span className="text-purple-600 underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>

          {/* Link to login */}
          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 font-semibold underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
