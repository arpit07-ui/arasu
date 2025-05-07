import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Edit, X } from "lucide-react";
import { updateAdmin, getAdminById } from "../../../services/authService";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import toast from "react-hot-toast";

interface AdminData {
  id: string;
  email: string;
  role?: string;
  password: string;
}

const AdminProfile: React.FC = () => {
  // Get auth state from Redux
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [adminData, setAdminData] = useState<AdminData>({
    id: "",
    email: "",
    role: "Super Admin",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        if (!user) {
          throw new Error("No user authenticated");
        }
        const data = await getAdminById(user.id); // Using email as identifier

        setAdminData({
          id: data.id,
          email: data.email,
          role: data.role || "Super Admin",
          password: data.password,
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError("Failed to load admin data");
        setIsLoading(false);
      }
    };
    fetchAdminData();
  }, [isModalOpen]);

  const openModal = () => {
    setEditFormData({
      email: adminData.email,
      newPassword: "",
      confirmPassword: "",
    });
    setIsModalOpen(true);
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editFormData.newPassword !== editFormData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const payload = {
        id: adminData.id,
        email: editFormData.email,
        password: editFormData.confirmPassword,
      };

      if (editFormData.email !== adminData.email) {
        payload.email = editFormData.email;
      }

      if (editFormData.newPassword) {
        payload.password = editFormData.newPassword;
      }

      const updatedAdmin = await updateAdmin(payload);

      setAdminData((prev) => ({
        ...prev,
        email: editFormData.email || prev.email,
      }));

      // setSuccess("Profile updated successfully");
      toast.success("Profile updated successfully");
      closeModal();
    } catch (err) {
      console.error("Update error:", err);
      // setError(err.response?.data?.message || "Failed to update admin");
      toast.error("Failed to update admin");
    }
  };

  if (isLoading) return <div className="p-6">Loading admin data...</div>;
  if (!user)
    return (
      <div className="p-6 text-red-500">Please login to view this page</div>
    );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Profile</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Personal Information</h2>
          <button
            onClick={openModal}
            className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-600 transition-colors"
            disabled={isLoading}
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">User Role</p>
            <p className="text-gray-900">{adminData.role}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">E-mail Address</p>
            <p className="text-gray-900">{adminData.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Password</p>
            <div className="flex items-center">
              <p className="text-gray-900">**********</p>
              {/* <button
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Edit Profile</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-2 bg-green-100 text-green-700 rounded text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-1">
                  E-mail Address
                </label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4 relative">
                <label className="block text-sm text-gray-500 mb-1">
                  New Password (leave blank to keep current)
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={editFormData.newPassword}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                  placeholder="New password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="mb-6 relative">
                <label className="block text-sm text-gray-500 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={editFormData.confirmPassword}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                  placeholder="Confirm new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
