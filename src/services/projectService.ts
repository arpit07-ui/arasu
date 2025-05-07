import axiosInstance from "../api/axiosInstance";

export const createProject = async (data: any) => {
  try {
    const response = await axiosInstance.post("post/createPost", data);
    return response;
  } catch (error) {
    console.error("Error creating events:", error);
    throw error;
  }
};

export const getAllProjects = async () => {
  const response = await axiosInstance.get("post/getAll-post");
  return response.data;
};

export const updateProject = async (data: any) => {
  // console.log(data);
  const response = await axiosInstance.put(
    `post/update-post/${data?.id}`,
    data
  );

  return response.data;
};

export const deleteProject = async (id: any) => {
  const response = await axiosInstance.delete(`post/delete-post/${id}`);
  return response.data;
};

export const deleteAllProject = async (
  ids: number[]
): Promise<{ message: string }> => {
  try {
    // Using POST method since some servers don't support DELETE with body
    const response = await axiosInstance.post("/post/deleteAll", { ids });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to delete teams. Please try again.");
  }
};
