import { useState } from "react";
import { Mail, Phone, User, Lock, MapPin, Building2 } from "lucide-react";
import OrangeOutlineButton from "../components/Button/OrangeOutlineButton";
import { Link, useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import { useAxios } from "../hooks/useAxios";
import { API_PATHS } from "../utils/config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [form, setForm] = useState({
    type: "user",
    email: "",
    password: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
  });

  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      phone: `+${value}`,
    }));
  };

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("Recaptcha verified");
          },
          "expired-callback": () => {
            console.log("Recaptcha expired");
          },
        }
      );
    }
  };

  interface IUser {
    userId: string;
    type: string;
    email: string;
    password: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    isActive: boolean;
  }

  const { refetch: register } = useAxios<IUser>({
    method: "post",
    url: API_PATHS.REGISTER,
    body: form,
    manual: true,
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.phone || !form.phone.startsWith("+")) {
      alert("Please enter phone number with country code.");
      return;
    }

    setupRecaptcha();
    const appVerifier = (window as any).recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, form.phone, appVerifier);
      console.log("result ==> ", result);
      setConfirmationResult(result);
      alert("OTP sent to your phone number");
    } catch (error: any) {
      console.error("SMS not sent", error);
      alert(`Failed to send OTP: ${error.message}`);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
      alert("Please request OTP first.");
      return;
    }
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      const result = await confirmationResult.confirm(otp);
      console.log("Phone user verified", result.user);
      await register();
      toast.success("Signup successful!");
      navigate("/login")
    } catch (err) {
      console.error("OTP verification failed", err);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden lg:flex min-h-[700px]">
      {/* Left image */}
      <div
        className="w-full lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://static.vecteezy.com/system/resources/thumbnails/009/690/713/small_2x/white-notepad-and-ink-pen-on-the-wooden-desk-register-now-concept-photo.jpg)",
        }}
      ></div>

      {/* Right form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <div className=" max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">Sign up</h2>
          <p className="text-gray-600 mb-8">Create your SkillYatra account</p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {confirmationResult ? (
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    margin: "0 0.25rem",
                    fontSize: "1.5rem",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
                <OrangeOutlineButton
                  label="Verify OTP"
                  className="w-full mt-4"
                  onClick={() => handleVerifyOtp()}
                />
              </div>
            ) : (
              <>
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <div className="relative border-b border-gray-300 focus-within:border-purple-500">
                    <input
                      name="firstName"
                      placeholder="Enter your first name"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none text-gray-700 text-base py-2 pr-10"
                    />
                    <User className="absolute right-0 top-2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <div className="relative border-b border-gray-300 focus-within:border-purple-500">
                    <input
                      name="lastName"
                      placeholder="Enter your last name"
                      value={form.lastName}
                      onChange={handleChange}
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
                      name="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none text-gray-700 text-base py-2 pr-10"
                    />
                    <Mail className="absolute right-0 top-2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative border-b border-gray-300 focus-within:border-purple-500">
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none text-gray-700 text-base py-2 pr-10"
                    />
                    <Lock className="absolute right-0 top-2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <PhoneInput
                    country={"in"}
                    value={form.phone.replace("+", "")}
                    onChange={handlePhoneChange}
                    inputClass="w-full bg-transparent text-base py-2 focus:outline-none"
                    containerClass="w-full"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative border-b border-gray-300 focus-within:border-purple-500">
                    <input
                      name="address"
                      placeholder="Enter your address"
                      value={form.address}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none text-gray-700 text-base py-2 pr-10"
                    />
                    <MapPin className="absolute right-0 top-2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <div className="relative border-b border-gray-300 focus-within:border-purple-500">
                    <input
                      name="city"
                      placeholder="Enter your city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none text-gray-700 text-base py-2 pr-10"
                    />
                    <Building2 className="absolute right-0 top-2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                {/* hidden user type */}
                <input type="hidden" name="type" value="user" />

                {/* Sign Up button */}
                <div className="md:col-span-2">
                  <OrangeOutlineButton
                    label="Send OTP"
                    className="w-full"
                    onClick={() => handleSubmit()}
                  />
                </div>
              </>
            )}
          </form>


          <p className="text-xs text-gray-500 mt-6 text-center">
            By signing up, you agree to our
            <span className="text-purple-600 underline"> Terms of Use</span> and
            <span className="text-purple-600 underline"> Privacy Policy</span>.
          </p>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?
            <Link
              to="/login"
              className="text-purple-600 underline font-semibold"
            >
              Log in
            </Link>
          </p>
        </div>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SignupPage;
