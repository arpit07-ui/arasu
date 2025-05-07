// components/common/SecurityFooter.tsx
import React from 'react';

const SecurityFooter: React.FC = () => {
  return (
    <div className="bg-black text-white w-full max-w-4xl rounded-lg p-6">
      <h3 className="text-center mb-4">Support us with confidence</h3>
      <ul className="mb-4">
        <li className="flex items-baseline mb-2">
          <span className="mr-2">•</span>
          This website is 100% secure.
        </li>
        <li className="flex items-baseline mb-2">
          <span className="mr-2">•</span>
          All banking information to process the payment is encrypted using the SSL protocol. 
          It is not stored on our computer systems under any circumstances.
        </li>
      </ul>
      <div className="flex items-center mt-4">
        <span>Feel free to contact us by e-mail:</span>
        <span className="font-bold ml-1">admin@arasubiodiversityfoundation.com</span>
        <div className="inline-flex items-center justify-center w-5 h-5 bg-white rounded-full ml-2">
          <div className="border-solid border-black border-r border-b p-0.5 rotate-45 transform -translate-y-px"></div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFooter;