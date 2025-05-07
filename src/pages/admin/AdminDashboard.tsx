import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setActiveMenuItem,
  setExpandedMenu,
  setMenuTitle,
} from "../../redux/authSlice";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { MenuItem, menuItems } from "./types";

// Loader Component
const Loader = () => (
  <div className="h-screen flex flex-col justify-center items-center gap-4 bg-white">
    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-green-600 text-2xl font-semibold animate-pulse">
      Loading, please wait...
    </p>
  </div>
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const expandedMenu = useSelector((state: any) => state.auth.expandedMenu);
  const activeMenuItem = useSelector((state: any) => state.auth.activeMenuItem);
  const menu = useSelector((state: any) => state.auth.menuTitle);
  const user = useSelector((state: any) => state.auth.user);

  // Find menu item by ID
  const findMenuItem = (items: MenuItem[], id: string): MenuItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findMenuItem(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Handle menu click
  const handleMenuClick = (menuId: string) => {
    const item: any = findMenuItem(menuItems, menuId);
    if (!item) return;

    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
      return;
    }

    dispatch(setMenuTitle(item.title));

    if (item.children && item.children.length > 0) {
      const newExpanded = expandedMenu === menuId ? null : menuId;
      dispatch(setExpandedMenu(newExpanded));
    } else {
      dispatch(setActiveMenuItem(menuId));
      setMobileMenuOpen(false);
    }
  };

  // Get component to render
  const getCurrentComponent = () => {
    const item = findMenuItem(menuItems, activeMenuItem);
    return item ? item.component : null;
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-300">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-black text-white">
        <div className="flex items-center">
          <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-white text-sm font-semibold">
            SA
          </div>
          <div className="ml-3">
            <div className="font-semibold text-sm">Super Admin</div>
            <div className="text-xs text-gray-300">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-black text-white z-10 md:relative absolute h-full md:h-auto`}
      >
        <div className="hidden md:flex items-center justify-start px-4 py-4 border-b border-gray-700 text-white bg-black">
          <div className="bg-gray-700 rounded-full w-14 h-14 flex items-center justify-center text-white text-lg font-semibold">
            SA
          </div>
          <div className="ml-4">
            <div className="font-semibold text-lg">Super Admin</div>
            <div className="text-sm text-gray-300">{user?.email}</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <div
                  className={`flex items-center px-4 py-3 md:py-2 cursor-pointer ${
                    activeMenuItem === item.id ? " text-[#22E06D]" : ""
                  }`}
                  onClick={() => handleMenuClick(item.id)}
                >
                  <div className="flex items-center flex-grow">
                    {item.icon}
                    <span className="text-sm ml-2">{item.title}</span>
                  </div>
                  {item.children && (
                    <div>
                      {expandedMenu === item.id ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                    </div>
                  )}
                </div>

                {/* Submenu */}
                {item.children && expandedMenu === item.id && (
                  <ul className="ml-8 mt-1">
                    {item.children.map((subItem) => (
                      <li key={subItem.id}>
                        <div
                          className={`flex items-center px-4 py-2 cursor-pointer ${
                            activeMenuItem === subItem.id
                              ? "text-green-500"
                              : "text-white"
                          }`}
                          onClick={() => handleMenuClick(subItem.id)}
                        >
                          <span className="text-xs">• {subItem.title}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white overflow-auto">
        <div className="w-full overflow-x-auto">
          <Suspense fallback={<Loader />}>{getCurrentComponent()}</Suspense>
        </div>
      </div>
    </div>
  );
}
