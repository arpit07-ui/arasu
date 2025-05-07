import axiosInstance from "../api/axiosInstance";

export const getDashboardSummary = async () => {
    try {
      const response = await axiosInstance.get("admin/dashboard");
      return response;
    } catch (error) {
      console.error("Error creating events:", error);
      throw error;
    }
  };
  