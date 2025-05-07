import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Layout,
  LayoutGrid,
  Users,
  CreditCard,
  FileText,
  Calendar,
  Image,
  Users2,
  BookOpen,
  RefreshCw,
} from "lucide-react";
import { getAllUserTrack } from "../../../services/userManagementService";
import { getDashboardSummary } from "../../../services/dashboardService";
import EventsPieChart from "./EventsPieChart";

// Mock data - would be replaced with API calls
const initialData = {
  contentManagement: {
    projects: 24,
    events: 18,
    blogs: 36,
    gallery: 42,
    team: 15,
  },
  paymentManagement: {
    revenue: 15800,
    pending: 2200,
  },
  userManagement: {
    subscribers: 245,
    visitors: 1893,
  },
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function DashboardManagement() {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  // Function to fetch data from API
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch user data from API
      const userResponse = await getAllUserTrack();
      if (userResponse?.data?.data) {
        const users = userResponse.data.data;
        setUserData(users);
        setTotalUsers(users.length);
      }

      // Fetch dashboard summary
      const dashboardResponse = await getDashboardSummary();
      if (dashboardResponse?.data) {
        const summary = dashboardResponse.data;

        // Map the API response to your dashboard structure
        setData((prevData) => ({
          ...prevData,
          contentManagement: {
            projects: summary.totalProjects || 0,
            events: summary.totalEvents || 0,
            blogs: summary.totalBlogs || 0,
            gallery: summary.totalGallery || 0,
            team: summary.totalTeam || 0,
          },
          // Keep payment and user management as is if not in API
          paymentManagement: prevData.paymentManagement,
          userManagement: prevData.userManagement,
        }));
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Format content management data for pie chart using actual values
  const contentManagementData = [
    { name: "Projects", value: data.contentManagement.projects },
    { name: "Events", value: data.contentManagement.events },
    { name: "Blogs", value: data.contentManagement.blogs },
    { name: "Gallery", value: data.contentManagement.gallery },
    { name: "Team", value: data.contentManagement.team },
  ];

  // Format payment management data for pie chart
  const paymentManagementData = Object.entries(data.paymentManagement).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700">Dashboard</h1>
        <button
          onClick={fetchData}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          disabled={isLoading}
        >
          <RefreshCw
            size={16}
            className={`mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh Data
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <FileText size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Content</p>
                <p className="text-xl font-semibold">
                  {Object.values(data.contentManagement).reduce(
                    (a, b) => a + b,
                    0
                  )}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <CreditCard size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-xl font-semibold">
                  ₹{data.paymentManagement.revenue}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="rounded-full bg-yellow-100 p-3 mr-4">
                <Users size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-xl font-semibold">
                  {totalUsers > 0
                    ? totalUsers
                    : Object.values(data.userManagement).reduce(
                        (a, b) => a + b,
                        0
                      )}
                </p>
              </div>
            </div>

            {/* <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <Calendar size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Events</p>
                <p className="text-xl font-semibold">
                  {data.contentManagement.events}
                </p>
              </div>
            </div> */}
          </div>

          {/* Content Management Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6 ">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Layout size={20} className="mr-2 text-green-600" />
              Content Management
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
              {/* Content Distribution */}
              <div className="h-72 bg-gray-100">
                <h3 className="text-lg text-center mb-4">
                  Content Distribution
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentManagementData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {contentManagementData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} items`, "Count"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Events Distribution */}
              <EventsPieChart />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-24">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <LayoutGrid size={20} className="text-blue-600" />
                </div>
                <h4 className="font-semibold text-sm">Projects</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {data.contentManagement.projects}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <Calendar size={20} className="text-green-600" />
                </div>
                <h4 className="font-semibold text-sm">Events</h4>
                <p className="text-2xl font-bold text-green-600">
                  {data.contentManagement.events}
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <BookOpen size={20} className="text-yellow-600" />
                </div>
                <h4 className="font-semibold text-sm">Blogs</h4>
                <p className="text-2xl font-bold text-yellow-600">
                  {data.contentManagement.blogs}
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <Image size={20} className="text-orange-600" />
                </div>
                <h4 className="font-semibold text-sm">Gallery</h4>
                <p className="text-2xl font-bold text-orange-600">
                  {data.contentManagement.gallery}
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <Users2 size={20} className="text-purple-600" />
                </div>
                <h4 className="font-semibold text-sm">Team</h4>
                <p className="text-2xl font-bold text-purple-600">
                  {data.contentManagement.team}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Management Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <CreditCard size={20} className="mr-2 text-green-600" />
              Payment Management
            </h2>

            <div className="h-64 bg-gray-100">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentManagementData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {paymentManagementData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-sm">Revenue</h4>
                <p className="text-xl font-bold text-green-600">
                  ₹{data.paymentManagement.revenue}
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-sm">Pending</h4>
                <p className="text-xl font-bold text-yellow-600">
                  ₹{data.paymentManagement.pending}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
