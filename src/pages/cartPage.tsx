import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Trash } from "lucide-react";
import OrangeOutlineButton from "../components/Button/OrangeOutlineButton";

const mockCourses = [
  {
    _id: "course1",
    title: "React for Beginners",
    code: "REACT-101",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPB1fsoQykBFtGM19eymE52pQ_pCP3x1sK_dqKi_yO8TKJGhXVg3kdtYrn_9jqobit-BA&usqp=CAU",
  },
  {
    _id: "course2",
    title: "Advanced JavaScript",
    code: "JS-ADV-202",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IEJfQG9Ne8SbMuqjdZ73212jXY9hYLG63g&s",
  },
];

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(mockCourses);

  const handleRemoveItem = (courseId: string) => {
    const updated = cartItems.filter((item) => item._id !== courseId);
    setCartItems(updated);
  };

  return (
    <div className="container-padding section-space">
      <div className="bg-white overflow-hidden flex flex-col lg:flex-row border border-gray-200">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3 p-6">
          <h2 className="text-2xl font-bold mb-6">Review Your Courses</h2>

          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500">
              Your cart is empty. Explore courses to get started.
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                 onClick={() => navigate(`/singleCourseBeforeLogin`)}
                key={item._id}
                className="flex items-center border border-gray-200 rounded-lg p-4 mb-4 gap-4 relative"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />

                <div
                  onClick={() => navigate(`/course/${item._id}`)}
                  className="flex-1 cursor-pointer"
                >
                  <h4 className="text-lg font-medium text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500">Code: {item.code}</p>
                </div>

                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 hover:text-red-700 transition duration-150 ml-4"
                  title="Remove item"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            ))
          )}

          <div className="mt-4">
            <div
              onClick={() => navigate("/")}
              className="text-indigo-600 hover:underline text-sm cursor-pointer"
            >
              ← Continue Learning
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-6 border-t lg:border-l lg:border-t-0 border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Enrollment Summary</h2>

          <div className="flex justify-between text-gray-700 text-lg mb-4 font-medium">
            <span>Total Courses</span>
            <span className="text-purple-600 font-bold">{cartItems.length}</span>
          </div>

          {cartItems.length > 0 && (
            <OrangeOutlineButton
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate("/checkout", { state: cartItems })}
              className="mt-10"
              label="Proceed to Checkout"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
