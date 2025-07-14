import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// import pages
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
import { useAuth } from "../hooks/useAuth";

function MainLayout() {
  interface Props {
    children: React.ReactNode;
  }

  function PrivateRoute({ children }: Props) {
    const { token } = useAuth();
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-grow mx-auto relative">
        <ScrollToTop />
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/singleCourseBeforeLogin" element={<SingleCoursePage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* private routes */}
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/verify"
            element={
              <PrivateRoute>
                <OtpVerificationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz/:moduleId"
            element={
              <PrivateRoute>
                <QuizPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/course"
            element={
              <PrivateRoute>
                <CourseLearningPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
