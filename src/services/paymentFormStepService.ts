import axiosInstance from "../api/axiosInstance";

export const createpaymentForm = async (data: any) => {
    console.log(data)
  const response = await axiosInstance.post(
    "paymentUser/createpaymentUser",
    data
  );
  return response.data;
};

export const getAllPaymentUser = async (data: any) => {
  const response = await axiosInstance.post(
    "paymentUser/getAll-payment-user",
    data
  );
  return response.data;
};
