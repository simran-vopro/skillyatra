import { Eye, EyeOff } from "lucide-react";
import OrangeOutlineButton from "../components/Button/OrangeOutlineButton";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { API_PATHS } from "../utils/config";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/hooks";
import { useEffect, useState } from "react";
import { loginSuccess } from "../features/auth/authSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  interface UserResponseType {
    token: string;
    user: any;
  }

  const {
    data,
    error,
    loading,
    refetch: login,
  } = useAxios<UserResponseType>({
    method: "post",
    url: API_PATHS.LOGIN,
    body: {
      phone,
      password,
      type: "user"
    },
    manual: true,
    successMessage: "Logged in successfully!",
    errorMessage: "", // let backend message be shown
  });

  const handleLogin = async () => {
    if (!phone || !password) {
      toast.error("Please enter both Phone number and Password");
      return;
    }

    await login();
  };

  useEffect(() => {
    if (data) {
      const { token, user } = data;
      const userId = user.userId;
      dispatch(loginSuccess({ user, token, userId }));
      navigate("/account");
    }
  }, [data]);

  useEffect(() => {
    if (error?.message) {
      toast.error(error.message);
    }
  }, [error]);

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
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="relative border-b border-gray-300 focus-within:border-purple-500">
                <PhoneInput
                  country={"in"}
                  value={phone.replace("+", "")}
                  onChange={(value) => setPhone("+" + value)}
                  inputClass="!bg-transparent !w-full !text-base !py-2 !focus:outline-none !border-none"
                  containerClass="!w-full"
                  buttonClass="!bg-transparent !border-none !shadow-none"
                  dropdownStyle={{ borderRadius: "0.5rem", border: "none" }} // optional for dropdown
                  inputProps={{
                    required: true,
                    name: "phone",
                  }}
                />
              </div>
            </div>


            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative border-b border-gray-300 focus-within:border-purple-500">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="w-full bg-transparent focus:outline-none py-2 text-gray-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-0 top-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <Eye />
                  ) : (
                    <EyeOff />
                  )}
                </span>
              </div>
            </div>

            <div className="pt-6">
              <OrangeOutlineButton
                label={loading ? "Signing in..." : "Sign in"}
                onClick={() => handleLogin()}
                className="w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
