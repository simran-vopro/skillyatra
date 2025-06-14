import { useState, useRef } from "react";
import { Key } from "lucide-react";
import OrangeOutlineButton from "../components/Button/OrangeOutlineButton";
import { useNavigate } from "react-router-dom";

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // allow only 0-9

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const fullOtp = otp.join("");
    if (fullOtp.length === 6) {
      console.log("OTP Verified:", fullOtp);
      navigate("/account");
    } else {
      alert("Please enter all 6 digits");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden lg:flex min-h-[700px]">
      {/* Left Image Section */}
      <div
        className="w-full lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://t4.ftcdn.net/jpg/05/54/22/69/360_F_554226902_eaFqOYLyeTMXY1RLHcVi6psKYdkSv4cF.jpg")',
        }}
      ></div>

      {/* Right OTP Form Section */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="text-left max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">
            OTP Verification
          </h2>
          <p className="text-gray-600 mb-8">
            Please enter the OTP sent to your email
          </p>

          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-4">
                <Key className="w-4 h-4 text-gray-500" />
                Enter OTP <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-3 justify-between">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    // ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ))}
              </div>
            </div>

            <OrangeOutlineButton
              label="Verify OTP"
              className="w-full"
              onClick={handleSubmit}
            />

            <div className="text-sm text-center text-gray-600">
              Didn't receive OTP?{" "}
              <button
                type="button"
                className="text-purple-600 hover:underline"
                onClick={() => console.log("Resend OTP")}
              >
                Resend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
