import React, { useState } from "react";
import { Download, Trash2, Eye, X } from "lucide-react";

interface Payment {
  id: number | any;
  srNo: string;
  receiptId: string;
  userName: string;
  dateTime: string;
  address: string;
  panNumber: string;
  amount: string;
  otpVerified: boolean;
  selected?: boolean;
}

export default function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      srNo: "01",
      receiptId: "R1",
      userName: "Luca Moretti",
      dateTime: "March 10, 2025 - 10:30 AM",
      address: "Bandra, Mumbai - 400050",
      panNumber: "ABCDE1234F",
      amount: "₹19,500",
      otpVerified: true,
    },
    {
      id: "2",
      srNo: "02",
      receiptId: "R2",
      userName: "Aniya El-Sayed",
      dateTime: "April 5, 2024 - 3:45 PM",
      address: "Green Park, New Delhi - 110016",
      panNumber: "ABCDE1234F",
      amount: "₹13,000",
      otpVerified: false,
    },
    {
      id: "3",
      srNo: "03",
      receiptId: "R3",
      userName: "Mateo Rodriguez",
      dateTime: "June 15, 2024 - 7:00 AM",
      address: "Indiranagar, Bengaluru - 560038",
      panNumber: "ABCDE1234F",
      amount: "₹7,000",
      otpVerified: false,
    },
    {
      id: "4",
      srNo: "04",
      receiptId: "R4",
      userName: "Hope Miller",
      dateTime: "September 1, 2024 - 5:15 PM",
      address: "Adyar, Chennai - 600020",
      panNumber: "ABCDE1234F",
      amount: "₹12,000",
      otpVerified: false,
    },
    {
      id: "5",
      srNo: "05",
      receiptId: "R5",
      userName: "Yuki Tanaka",
      dateTime: "September 22, 2025 - 8:45 AM",
      address: "Park Street, Kolkata - 700016",
      panNumber: "ABCDE1234F",
      amount: "₹21,000",
      otpVerified: true,
    },
    {
      id: "6",
      srNo: "06",
      receiptId: "R6",
      userName: "Aleksandr Petrov",
      dateTime: "July 4, 2024 - 12:00 PM",
      address: "Jubilee Hills, Hyderabad - 500033",
      panNumber: "ABCDE1234F",
      amount: "₹5,000",
      otpVerified: false,
    },
    {
      id: "7",
      srNo: "07",
      receiptId: "R7",
      userName: "Isla McKenzie",
      dateTime: "May 18, 2026 - 6:30 PM",
      address: "Korhrud, Pune - 411038",
      panNumber: "ABCDE1234F",
      amount: "₹10,000",
      otpVerified: false,
    },
    {
      id: "8",
      srNo: "08",
      receiptId: "R8",
      userName: "Omar Al-Farsi",
      dateTime: "November 9, 2025 - 9:15 AM",
      address: "Vastrapur, Ahmedabad - 380015",
      panNumber: "ABCDE1234F",
      amount: "₹25,000",
      otpVerified: true,
    },
    {
      id: "9",
      srNo: "09",
      receiptId: "R9",
      userName: "Thiago Souza",
      dateTime: "August 30, 2024 - 11:00 AM",
      address: "Arera Colony, Bhopal - 462016",
      panNumber: "ABCDE1234F",
      amount: "₹32,000",
      otpVerified: true,
    },
    {
      id: "10",
      srNo: "10",
      receiptId: "R10",
      userName: "Frida Lindström",
      dateTime: "February 14, 2026 - 2:00 PM",
      address: "Malviya Nagar, Jaipur - 302017",
      panNumber: "ABCDE1234F",
      amount: "₹17,000",
      otpVerified: true,
    },
  ]);

  const [selectedReceipt, setSelectedReceipt] = useState<Payment | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const handleDeletePayment = (id: number) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  const handleViewReceipt = (payment: Payment) => {
    setSelectedReceipt(payment);
    setShowReceiptModal(true);
  };

  const closeModal = () => {
    setShowReceiptModal(false);
    setSelectedReceipt(null);
  };

  const downloadReceipt = () => {
    // In a real application, this would generate and download a PDF
    alert(`Downloading receipt for ${selectedReceipt?.userName}`);
  };

  const upadteCheckbox = (idToUpdate: number, e: any) => {
    const updatedCheckbox = payments.map((prev) =>
      prev.id === idToUpdate ? { ...prev, selected: e } : prev
    );
    setPayments(updatedCheckbox);
  };

  const updateCheck = (event: boolean) => {
    const updatedCheck = payments.map((prev) => {
      return { ...prev, selected: event };
    });
    setPayments(updatedCheck);
  };

  return (
    <div className="bg-white p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-3xl font-bold">Payment Management</h2>
        <button
          className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm md:text-base w-full sm:w-auto justify-center"
          onClick={() => alert("Downloading full report")}
        >
          <span>Download Report</span>
          <Download size={16} />
        </button>
      </div>

      {/* Table container with horizontal scroll on small screens */}
      <div className="w-full overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th
                scope="col"
                className="w-12 px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <input
                  onChange={(e) => {
                    updateCheck(e.target.checked);
                  }}
                  type="checkbox"
                  className="h-4 w-4"
                />
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sr.No
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Receipt
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User Name
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date/Time
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                PAN Number
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                OTP Verification
              </th>
              <th
                scope="col"
                className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
              <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 size={17} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                  <input
                    onChange={(e) =>
                      upadteCheckbox(payment.id, e.target.checked)
                    }
                    checked={Boolean(payment.selected)}
                    type="checkbox"
                    className="h-4 w-4"
                  />
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                  {payment.srNo}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                  <button
                    className="bg-red-100 text-red-500 h-5 w-5 md:h-6 md:w-6 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => handleViewReceipt(payment)}
                  >
                    <Eye size={14} className="stroke-red-500" />
                  </button>
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                  {payment.userName}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                  {payment.dateTime}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                  {payment.address}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                  {payment.panNumber}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                  {payment.amount}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                  <span
                    className={`h-3 w-3 md:h-4 md:w-4 rounded-full ${
                      payment.otpVerified ? "bg-green-500" : "bg-red-500"
                    } inline-block`}
                  ></span>
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeletePayment(payment.id)}
                  >
                    <Trash2 size={8} className="md:size-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive Receipt Modal */}
      {showReceiptModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold">Receipt Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="border rounded-lg p-3 md:p-4 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Receipt ID</p>
                  <p className="font-medium text-sm md:text-base">
                    {selectedReceipt.receiptId}
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Date/Time</p>
                  <p className="font-medium text-sm md:text-base">
                    {selectedReceipt.dateTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">User Name</p>
                  <p className="font-medium text-sm md:text-base">
                    {selectedReceipt.userName}
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">PAN Number</p>
                  <p className="font-medium text-sm md:text-base">
                    {selectedReceipt.panNumber}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs md:text-sm text-gray-500">Address</p>
                  <p className="font-medium text-sm md:text-base">
                    {selectedReceipt.address}
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Amount</p>
                  <p className="font-medium text-sm md:text-base">
                    {selectedReceipt.amount}
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">
                    OTP Verification
                  </p>
                  <p
                    className={`font-medium text-sm md:text-base ${
                      selectedReceipt.otpVerified
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {selectedReceipt.otpVerified ? "Verified" : "Not Verified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={downloadReceipt}
                className="bg-blue-500 text-white px-3 py-2 md:px-4 md:py-2 rounded hover:bg-blue-600 flex items-center gap-2 text-sm md:text-base ml-auto"
              >
                <Download size={16} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
