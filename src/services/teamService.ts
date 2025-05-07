import axiosInstance from "../api/axiosInstance";

export const getAllTeams = async () => {
  try {
    const response = await axiosInstance.get("team/getAllTeam");
    return response;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

export const createTeam = async (teamData: any) => {
  try {
    const response = await axiosInstance.post("team/createTeam", teamData);
    return response;
  } catch (error) {
    console.error("Error creating team:", error);
    throw error;
  }
};

export const updateTeam = async (teamData: any) => {
  try {
    const response = await axiosInstance.put(
      `${"team/updateTeam"}/${teamData.id}`,
      teamData
    );
    return response;
  } catch (error) {
    console.error("Error updating team:", error);
    throw error;
  }
};

export const deleteTeam = async (id: string | any) => {
  try {
    const response = await axiosInstance.delete(`${"team/deleteTeam"}/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting team:", error);
    throw error;
  }
};

export const deleteAllTeam = async (
  ids: number[]
): Promise<{ message: string }> => {
  try {
    // Using POST method since some servers don't support DELETE with body
    const response = await axiosInstance.post("/team/deleteAll", { ids });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to delete teams. Please try again.");
  }
};
