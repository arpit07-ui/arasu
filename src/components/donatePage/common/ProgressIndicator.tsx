// components/common/ProgressIndicator.tsx
import React from 'react';

type ProgressIndicatorProps = {
  steps: number;
  currentStep: number;
  progressWidth: string;
};

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  steps, 
  currentStep, 
  progressWidth 
}) => {
  return (
    <div className="relative w-4/5 flex justify-between items-center my-6">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300"></div>
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-green-500 transition-all duration-500"
        style={{ width: progressWidth }}
      ></div>
      
      {Array.from({ length: steps }).map((_, index) => (
        <div 
          key={index}
          className={`w-5 h-5 rounded-full ${
            index < currentStep ? 'bg-green-500' : 'bg-gray-300'
          } z-10`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressIndicator;

