import axiosInstance from "../api/axiosInstance";

export const createGallery = async (data: any) => {
  try {
    const response = await axiosInstance.post("gallery/createGallery", data);
    return response;
  } catch (error) {
    console.error("Error creating events:", error);
    throw error;
  }
};

export const getAllGallery = async () => {
  const response = await axiosInstance.get("gallery/getAll-gallery");
  return response.data;
};

export const updateGallery = async (data: any) => {
  const response = await axiosInstance.put(
    `gallery/update-gallery/${data?.id}`,
    data
  );

  return response.data;
};

export const deleteGallery = async (id: any) => {
  const response = await axiosInstance.delete(`gallery/delete-gallery/${id}`);
  return response.data;
};

export const deleteAllGallery = async (
  ids: number[]
): Promise<{ message: string }> => {
  try {
    // Using POST method since some servers don't support DELETE with body
    const response = await axiosInstance.post("gallery/deleteAll", { ids });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to delete teams. Please try again.");
  }
};
