import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NavbarData, initialNavbarData } from "../types/headerType";
import title from "../../public/assets/ABF.svg";
import { logout } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Header: React.FC = () => {
  const [navbarData, setNavbarData] = useState<NavbarData>(initialNavbarData);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch(); // Add dispatch hook

  const { isAuthenticated } = useSelector((state: any) => state.auth);

  useEffect(() => {
    setNavbarData(initialNavbarData); // Replace with real fetch in future
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    dispatch(logout()); // Properly dispatch the logout action
    navigate("/");
  };

  return (
    <nav className="font-rethink bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-2 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink">
            <NavLink to="/" onClick={scrollToTop} className="flex items-center">
              <img
                src={title}
                alt="title"
                className="h-24 scale-x-110 w-auto"
              />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-6 md:space-x-4 lg:space-x-11 items-center">
            {/* Always show Home */}
            {navbarData.menuItems.length > 0 && (
              <NavLink
                to={navbarData.menuItems[0].path}
                className={({ isActive }) =>
                  `font-medium transition hover:text-[#4E9F3D] ${
                    isActive
                      ? "text-[#4E9F3D] font-semibold"
                      : "text-[#696969] "
                  }`
                }
              >
                {navbarData.menuItems[0].label}
              </NavLink>
            )}

            {/* Conditionally show Dashboard */}
            {isAuthenticated && (
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `font-medium transition hover:text-[#4E9F3D] ${
                    isActive ? "text-[#4E9F3D] font-semibold" : "text-[#696969]"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}

            {/* Other Menu Items */}
            {navbarData.menuItems.slice(1).map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition hover:text-[#4E9F3D] ${
                    isActive ? "text-[#4E9F3D] font-semibold" : "text-[#696969]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex space-x-3 md:space-x-4">
            {/* Donate Button */}
            {location.pathname !== "/support" &&
              navbarData.buttons.find((btn) => btn.label === "Support") && (
                <NavLink
                  to="/support"
                  className="px-4 py-2 rounded-md font-medium bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Support
                </NavLink>
              )}

            {!isAuthenticated && (
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-md border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
              >
                Login
              </NavLink>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md font-medium bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-[#696969]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Fixed positioning and improved styling */}
      {isOpen && (
        <div className="sm:hidden bg-white shadow-md fixed top-16 left-0 right-0 z-50 h-auto max-h-screen overflow-y-auto">
          <div className="flex flex-col space-y-4 p-4">
            {/* Always show Home */}
            {navbarData.menuItems.length > 0 && (
              <NavLink
                to={navbarData.menuItems[0].path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `py-2 px-3 rounded transition ${
                    isActive
                      ? "text-[#4E9F3D] font-semibold bg-green-50"
                      : "text-[#696969] hover:bg-gray-50"
                  }`
                }
              >
                {navbarData.menuItems[0].label}
              </NavLink>
            )}

            {/* Dashboard when logged in */}
            {isAuthenticated && (
              <NavLink
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `py-2 px-3 rounded transition ${
                    isActive
                      ? "text-[#4E9F3D] font-semibold bg-green-50"
                      : "text-[#696969] hover:bg-gray-50"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}

            {/* Remaining Menu Items */}
            {navbarData.menuItems.slice(1).map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `py-2 px-3 rounded transition ${
                    isActive
                      ? "text-[#4E9F3D] font-semibold bg-green-50"
                      : "text-[#696969] hover:bg-gray-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="pt-2 border-t border-gray-200">
              {/* Support Button */}
              {location.pathname !== "/support" &&
                navbarData.buttons.find((btn) => btn.label === "Support") && (
                  <NavLink
                    to="/support"
                    className="block w-full my-2 px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 text-center font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Support
                  </NavLink>
                )}

              {/* Login/Logout Buttons */}
              {!isAuthenticated ? (
                <NavLink
                  to="/login"
                  className="block w-full my-2 px-4 py-2 rounded-md text-green-600 border border-green-600 hover:bg-green-600 hover:text-white text-center font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full my-2 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition text-center font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
