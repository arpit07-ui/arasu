import { Home, FileText, Users, User, LogOut } from "lucide-react";
import { lazy } from "react";
import { FaRupeeSign } from "react-icons/fa";

// Interface for MenuItem
export interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  children?: MenuItem[];
  component: React.ReactNode;
}

// Lazy imports for all components
const Projects = lazy(() => import("./contentMangement/Projects"));
const PaymentManagement = lazy(() => import("./paymentMangement/PaymentManagement"));
const Blogs = lazy(() => import("./contentMangement/Blogs"));
const Team = lazy(() => import("./contentMangement/Team"));
const Event = lazy(() => import("./contentMangement/Events"));
const GalleryManagement = lazy(() => import("./contentMangement/Gallery"));
const AdminProfile = lazy(() => import("./adminProfile/AdminProfile"));
const UserManagement = lazy(() => import("./userManagement/UserManagement"));
const DashboardManagement = lazy(() => import("./dashboardManagement/DashboardManagement"));

// Define menu data structure
export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home size={18} className="mr-2" />,
    component: <DashboardManagement />,
  },
  {
    id: "content-management",
    title: "Content Management",
    icon: <FileText size={18} className="mr-2" />,
    children: [
      {
        id: "projects",
        title: "Projects",
        icon: null,
        component: <Projects />,
      },
      {
        id: "events",
        title: "Events",
        icon: null,
        component: <Event />,
      },
      {
        id: "blogs",
        title: "Blogs",
        icon: null,
        component: <Blogs />,
      },
      {
        id: "gallery",
        title: "Gallery",
        icon: null,
        component: <GalleryManagement />,
      },
      {
        id: "team",
        title: "Team",
        icon: null,
        component: <Team />,
      },
    ],
    component: (
      <div className="p-4">
        <h1 className="text-xl font-bold">Content Management Overview</h1>
      </div>
    ),
  },
  {
    id: "payment-management",
    title: "Payment Management",
    icon: <FaRupeeSign size={18} className="mr-2" />,
    component: <PaymentManagement />,
  },
  {
    id: "user-management",
    title: "User Management",
    icon: <Users size={18} className="mr-2" />,
    component: <UserManagement />,
  },
  {
    id: "admin-profile",
    title: "Admin Profile",
    icon: <User size={18} className="mr-2" />,
    component: <AdminProfile />,
  },
  {
    id: "logout",
    title: "Logout",
    icon: <LogOut size={18} className="mr-2" />,
    component: <></>, // No component, just triggers logout
  },
];
