import axiosInstance from "../api/axiosInstance";

export const createUserTrcak = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      "userTrack/createUserTrack",
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating team:", error);
    throw error;
  }
};

export const getAllUserTrack = async () => {
  try {
    const response = await axiosInstance.get("userTrack/getAllUserTrack");
    return response;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

export const deleteUserTrack = async (id: string | any) => {
  try {
    const response = await axiosInstance.delete(
      `${"userTrack/deleteUserTrack"}/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting team:", error);
    throw error;
  }
};

export const deleteAllUser = async (
  ids: number[]
): Promise<{ message: string }> => {
  try {
    // Using POST method since some servers don't support DELETE with body
    const response = await axiosInstance.post("/userTrack/deleteAllUser", { ids });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to delete teams. Please try again.");
  }
};
