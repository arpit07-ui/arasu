// import { useEffect } from "react";

// type RazorpayProps = {
//   amount: number;
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   onBack: () => void;
//   showBackButton: boolean;
// };

// const RazorpayStep: React.FC<RazorpayProps> = ({ amount, fullName, email, phoneNumber }) => {
//   useEffect(() => {
//     const loadRazorpay = () => {
//       const options = {
//         key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key
//         amount: amount * 100, // amount in paise
//         currency: "INR",
//         name: "Your NGO Name",
//         description: "Donation",
//         image: "https://your-logo-url.png",
//         handler: function (response: any) {
//           alert("Payment successful!");
//           console.log("Payment ID:", response.razorpay_payment_id);
//         },
//         prefill: {
//           name: fullName,
//           email: email,
//           contact: phoneNumber,
//         },
//         notes: {
//           address: "Your NGO Address",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     };

//     loadRazorpay();
//   }, []);

//   return null;
// };

// export default RazorpayStep;


import React from 'react';
import qr from "../../../../public/HDFC PAYMENT SCAN CODE.jpeg";

const RazorpayStep = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Complete Your Payment</h2>
      <div className="flex flex-col items-center space-y-4">
        <p className="text-gray-600 text-center">
          Scan the QR code below using your UPI payment app to complete the transaction
        </p>
        
        <div className="p-4 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50">
          <img 
            src={qr} 
            alt="UPI Payment QR Code" 
            className="w-64 h-64 object-contain"
          />
        </div>
        
        <div className="text-sm text-gray-500 text-center">
          <p>After successful payment, you'll receive a confirmation</p>
          <p>Please keep the transaction receipt for reference</p>
        </div>
      </div>
    </div>
  );
};

export default RazorpayStep;