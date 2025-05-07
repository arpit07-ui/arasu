import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import AdminDashboard from "../pages/admin/AdminDashboard";
import { useSelector } from "react-redux";

// Lazy Load Pages
const Home = lazy(() => import("../pages/HomePage"));
const Foundation = lazy(() => import("../pages/FoundationPage"));
const Projects = lazy(() => import("../pages/ProjectsPage"));
const AboutUs = lazy(() => import("../pages/AboutUsPage"));
const Team = lazy(() => import("../pages/Team"));
const Contact = lazy(() => import("../pages/ContactPage"));
const Blogs = lazy(() => import("../pages/BlogsPage"));
const Login = lazy(() => import("../pages/LoginForm"));
const Support = lazy(() => import("../pages/SupportPage"));
const Privacy = lazy(() => import("../pages/footerPages/Privacy"));
const Terms = lazy(() => import("../pages/footerPages/Terms"));

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  return (
    <main className={`${!isAuthenticated ? "pt-16" : ""}`}>
      <Suspense
        fallback={
          <div className="h-96 flex flex-col justify-center items-center gap-4 bg-white">
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-green-600 text-2xl font-semibold animate-pulse">
              Loading, please wait...
            </p>
          </div>
        }
      >
        <ScrollToTop />
        {/* <SubscribePopup /> */}
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/foundation" element={<Foundation />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Auth Pages */}

          <Route path="/login" element={<Login />} />

          {/* Admin Pages */}
          {/* <Route path="/admin/dashboard" element={<ProtectedRoutes> <AdminDashboard /> </ProtectedRoutes>} /> */}

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default AppRouter;
