import axiosInstance from "../api/axiosInstance";

export const createContact = async (data: any) => {
    try {
      const response = await axiosInstance.post("contact/createContact", data);
      return response;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  };
