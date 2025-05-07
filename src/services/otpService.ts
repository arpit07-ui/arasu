import axiosInstance from "../api/axiosInstance";

interface OTPSendRequest {
  phoneNumber: string;
}

interface OTPVerifyRequest {
  phoneNumber: string;
  otpCode: string;
}

export const sendNotificationAPI = async (data: OTPSendRequest) => {
  const response = await axiosInstance.post("otp/send-otp", data);
  return response.data;
};

export const verifyNotificationAPI = async (data: OTPVerifyRequest) => {
  const response = await axiosInstance.post("otp/verify-otp", data);
  return response.data;
};
