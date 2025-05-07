// Simulated API call (replace later with real API)
import axiosInstance from "../api/axiosInstance";
import store from "../redux/store";

export const createBlog = async (formData: FormData) => {
  const state = store.getState();
  const token = state.auth.token;
  const response = await axiosInstance.post("blog/createBlog", formData);
  return response.data;
};

export const getAllBlog = async () => {
  const response = await axiosInstance.get("blog/getAll-blog");
  return response.data;
};

export const getBlogById = async () => {
  const response = await axiosInstance.get("blog/getById-blog/:id");
  return response.data;
};

export const updateBlog = async (data: any) => {
  // console.log(data);
  const response = await axiosInstance.put(`blog/updateBlog/${data?.id}`, data);

  return response.data;
};

export const deleteBlog = async (id: any) => {
  const response = await axiosInstance.delete(`blog/deleteBlog/${id}`);
  return response.data;
};

export const deleteAllBlog = async (
  ids: number[]
): Promise<{ message: string }> => {
  try {
    // Using POST method since some servers don't support DELETE with body
    const response = await axiosInstance.post("/blog/deleteAll", { ids });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to delete teams. Please try again.");
  }
};
