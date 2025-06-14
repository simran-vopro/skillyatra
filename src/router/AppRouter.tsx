import { BrowserRouter, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";
import { useEffect } from "react";

export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
};

const AppRouter = () => {

  return (
    <BrowserRouter>
      <MainLayout />
      <Toaster />
    </BrowserRouter>
  );
};

export default AppRouter;
