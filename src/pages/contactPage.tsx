import React, { useState } from "react";
import {
  Mail,
  Phone,
  User,
  MapPin,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import OrangeOutlineButton from "../components/Button/OrangeOutlineButton";
import SectionHeading from "../components/SectionHeading";

// Define form field types
type FormField =
  | "firstName"
  | "lastName"
  | "address1"
  | "address2"
  | "city"
  | "postcode"
  | "company"
  | "email"
  | "phone"
  | "message";

type FormData = {
  [key in FormField]: string;
};

const ContactPage = () => {

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  // const placeOrder = async () => {
  //   if (
  //     !formData.firstName?.trim() ||
  //     !formData.lastName?.trim() ||
  //     !formData.address1?.trim() ||
  //     !formData.message?.trim() ||
  //     !formData.email?.trim() ||
  //     !formData.phone?.trim()
  //   ) {
  //     toast.error("Please fill in all required fields");
  //     return;
  //   }

  //   setLoading(true); // Show loader
  //   setIsSubmitted(false);

  //   try {
  //     const response = await axios.post(API_PATHS.PLACE_ORDER, {
  //       firstName: formData.firstName,
  //       lastName: formData.lastName,
  //       address: formData.address1,
  //       address2: formData.address2,
  //       city: formData.city,
  //       postcode: formData.postcode,
  //       company: formData.company,
  //       subject: "Request for Quote Testing",
  //       text: formData.message,
  //       email: formData.email,
  //       phone: formData.phone,
  //       sessionId: getSessionId(),
  //       products: cartItems,
  //     });

  //     if (response.data) {
  //       toast.success(response.data.message);
  //       setIsSubmitted(true);
  //     }
  //   } catch (error) {
  //     console.log("placeOrder error ==> ", error);
  //     toast.error("Failed to place order");
  //   } finally {
  //     setLoading(false); // Hide loader
  //   }
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as FormField]: value,
    }));
  };

  return (
    <div className="container-padding section-space px-4 sm:px-6 lg:px-8 py-12">
      {/* {loading ? (
        <div className="flex items-center h-[500px] justify-center bg-white bg-opacity-75 group">
          <NoResults
            message="Just a Moment..."
            description="We're processing your request. Hang tight while we prepare your quote!"
            icon={
              <Smile className="w-10 h-10 text-purple-500 animate-bounce transition-colors duration-300 group-hover:text-amber-500" />
            }
          />
        </div>
      ) : isSubmitted ? (
        <div className="flex flex-col items-center h-[500px] justify-center bg-white bg-opacity-75 group">
          <NoResults
            message="Thank You For a Request"
            description="Your quote request has been submitted successfully. We’ll get back to you soon."
            icon={
              <PartyPopper className="w-10 h-10 text-purple-500 animate-pulse transition-colors duration-300 group-hover:text-amber-500" />
            }
          />
          <div className="mt-4">
            <div
              onClick={() => {
                navigate("/shop");
              }}
              className="text-indigo-600 hover:underline text-sm cursor-pointer"
            >
              ← Continue Shopping
            </div>
          </div>
        </div>
      ) : ( */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden lg:flex min-h-[700px]">
          {/* Left Image Background Section */}
          <div
            className="w-full lg:w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url("https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29udGFjdCUyMHVzfGVufDB8fDB8fHww")` }}
          ></div>

          {/* Right Form Section */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
            <div className="text-left">
              <SectionHeading
                className="mb-10 md:mb:30 flex flex-col items-center text-left"
                tAlign="text-left"
                heading={
                  <>
                    Send a — <span className="span-word">Query.</span>
                  </>
                }
                description="Fill out the form below and we will get back to you as soon as possible."
              />

              {/* Contact Info */}
              {/* <div className="mb-6 space-y-2 text-sm text-gray-600">
                  <div>
                    <strong>Address:</strong> 2713 Lowe Haven
                  </div>
                  <div>
                    <strong>Email:</strong> hi@skillyatra.com
                  </div>
                  <div>
                    <strong>Phone:</strong> 071-246-3165
                  </div>
                </div> */}

              {/* Form */}
              <form className="space-y-6">
                {[
                  {
                    name: "firstName",
                    placeholder: "First Name",
                    icon: <User />,
                  },
                  {
                    name: "lastName",
                    placeholder: "Last Name",
                    icon: <User />,
                  },
                  {
                    name: "address",
                    placeholder: "Address ",
                    icon: <MapPin />,
                  },
                 
                
                  { name: "email", placeholder: "Email", icon: <Mail /> },
                  { name: "phone", placeholder: "Phone", icon: <Phone /> },
                ].map(({ name, placeholder, icon }) => (
                  <div key={name} className="space-y-1">
                    {/* Label */}
                    <label
                      htmlFor={name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {placeholder.replace(" (Optional)", "")}
                      {name !== "address2" && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>

                    <div className="relative border-b border-gray-300 focus-within:border-purple-500 transition-colors">
                      <input
                        id={name}
                        type="text"
                        name={name}
                        value={formData[name as FormField]}
                        onChange={handleChange}
                        // placeholder={name !== "address2" ? placeholder + " *" : placeholder}
                        required={name !== "address2"}
                        className="w-full bg-transparent focus:outline-none text-gray-700 text-base py-2 pr-10 placeholder-gray-400"
                      />
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5">
                        {icon}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Message Input */}
                <div className="space-y-1">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative border-b border-gray-300 focus-within:border-purple-500 transition-colors">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      // placeholder="Message *"
                      rows={3}
                      required
                      className="w-full bg-transparent focus:outline-none text-gray-700 text-base py-2 pr-10 placeholder-gray-400 resize-none"
                    />
                    <MessageSquare className="absolute right-0 top-2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                <div className="flex justify-center">
                  <OrangeOutlineButton
                    onClick={() => console.log("submitted")}
                    className="mt-10"
                    label="Contact Us"
                    icon={<ArrowRight className="w-4 h-4" />}
                  />
                </div>
              </form>
            </div>

            {/* Social Links */}
            <div className="mt-8 text-sm text-gray-500 space-y-1">
              <p className="font-semibold">Follow us</p>
              <div className="flex flex-wrap gap-4">
                <span>Facebook /skillyatra</span>
                <span>Twitter /skillyatra</span>
                <span>Instagram /skillyatra</span>
                <span>LinkedIn /skillyatra</span>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default ContactPage;
