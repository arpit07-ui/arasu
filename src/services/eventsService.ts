import axiosInstance from "../api/axiosInstance";

export const createEvent = async (eventData: any) => {
  try {
    const response = await axiosInstance.post("events/createEvent", eventData);
    return response;
  } catch (error) {
    console.error("Error creating events:", error);
    throw error;
  }
};

export const getAllEvents = async () => {
  const response = await axiosInstance.get("events/getAll-events");
  return response.data;
};

export const updateEvents = async (data: any) => {
  // console.log(data);
  const response = await axiosInstance.put(
    `events/updateEvent/${data?.id}`,
    data
  );

  return response.data;
};

export const deleteEvent = async (id: any) => {
  const response = await axiosInstance.delete(`events/deleteEvent/${id}`);
  return response.data;
};

export const deleteAllEvents = async (
  ids: number[]
): Promise<{ message: string }> => {
  try {
    // Using POST method since some servers don't support DELETE with body
    const response = await axiosInstance.post("/events/deleteAll", { ids });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to delete teams. Please try again.");
  }
};
