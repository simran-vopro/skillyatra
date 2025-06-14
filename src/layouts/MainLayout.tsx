import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// import pages here
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import CartPage from "../pages/cartPage";
import ContactPage from "../pages/contactPage";
import { ScrollToTop } from "../router/AppRouter";
import TermsPage from "../pages/Terms";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import UserProfile from "../pages/UserProfile";
import OtpVerificationPage from "../pages/OtpVerificationPage";
import SingleCoursePage from "../pages/SingleCoursePage";
import QuizPage from "../pages/QuizPage";
import CourseLearningPage from "../pages/CourseLearningPage";

function MainLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-grow mx-auto relative">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
         
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/account" element={<UserProfile />} />
          <Route path="/verify" element={<OtpVerificationPage />} />
          <Route path="/singleCourseBeforeLogin" element={<SingleCoursePage />} />
          <Route path="/quiz/:moduleId" element={<QuizPage />} />
          <Route path="/course/:id" element={<CourseLearningPage />} />


         
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
