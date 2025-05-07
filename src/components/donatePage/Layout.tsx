// components/layout/index.tsx
import React, { ReactNode, useState } from "react";

type FormContainerProps = {
  children: ReactNode;
};

export const FormContainer: React.FC<FormContainerProps> = ({ children }) => (
  <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 mb-6">
    {children}
  </div>
);

export const SidePanel = () => {
  const [isPdfExpanded, setIsPdfExpanded] = useState(false);
  const pdfUrl = "/public/FORM10C.pdf";

  const handlePdfClick = () => {
    setIsPdfExpanded(true);
  };

  const handleClose = () => {
    setIsPdfExpanded(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 flex-1">
      <p className="text-green-600 text-center mb-6 leading-relaxed">
        We sincerely appreciate your interest in our foundation and look forward
        to your support through CSR funding and partnerships.
      </p>
      <p className="text-sm mb-4">
        FORM 10AC PDF is available below for reference.
      </p>

      {/* PDF Preview (Static) */}
      {!isPdfExpanded && (
        <div
          className="w-full h-48 mb-4 cursor-pointer relative"
          onClick={handlePdfClick}
        >
          <object
            data={pdfUrl}
            type="application/pdf"
            className="w-full h-full border border-gray-300 rounded pointer-events-none"
          >
            <div className="bg-gray-100 w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <p className="font-medium text-gray-700 mb-2">
                PDF cannot be displayed directly.
              </p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Click here to open the PDF in a new tab
              </a>
            </div>
          </object>

          <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
            <div className="bg-white bg-opacity-90 px-4 py-2 rounded-md text-gray-700 shadow-md">
              Click to view PDF
            </div>
          </div>
        </div>
      )}

      {/* Expanded PDF View */}
      {isPdfExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            // Close modal when clicking the backdrop (outside the modal)
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <div className="bg-white rounded-lg w-full max-w-4xl h-[100%] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-medium">FORM 10AC PDF</h3>
              <button
                onClick={handleClose}
                className="text-gray-600 hover:text-gray-900"
              >
                Close
              </button>
            </div>
            <div className="flex-1 p-2">
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="FORM 10AC PDF"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidePanel;

type MainPanelProps = {
  children: ReactNode;
};

export const MainPanel: React.FC<MainPanelProps> = ({ children }) => (
  <div className="bg-white rounded-lg p-6 flex-2 md:w-2/3 flex flex-col items-center">
    {children}
  </div>
);
