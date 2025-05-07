import React, { useState, useEffect } from "react";

type OTPVerificationStepProps = {
  onSubmit: (otpCode: string) => Promise<void> | void;
  initialValue: string;
  onBack: () => void;
  onResend?: () => Promise<void> | void;
  showBackButton: boolean;
  phoneNumber: string;
  loading?: boolean;
};

const OTPVerificationStep: React.FC<OTPVerificationStepProps> = ({
  onSubmit,
  initialValue,
  onBack,
  onResend,
  showBackButton,
  phoneNumber,
  loading = false,
}) => {
  const [otpCode, setOtpCode] = useState<string>(initialValue);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Timer for OTP expiration
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otpCode.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    try {
      await onSubmit(otpCode);
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
      console.error("OTP verification failed:", err);
    }
  };

  const handleResendOTP = async () => {
    if (timeLeft > 0 || !onResend) return;
    
    setIsResending(true);
    setError(null);
    try {
      await onResend();
      setTimeLeft(60);
    } catch (err) {
      setError("Failed to resend OTP");
      console.error("Resend failed:", err);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="my-4">
        <p className="text-sm text-gray-600 mb-2">
          Enter the 6-digit OTP sent to {phoneNumber}
        </p>
        <input
          type="text"
          value={otpCode}
          onChange={(e) => {
            setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6));
            setError(null);
          }}
          placeholder="Enter OTP"
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
          required
          disabled={loading}
        />
        {error && (
          <p className="text-xs mt-1 text-red-500">
            {error}
          </p>
        )}
      </div>

      <div className="mt-2 text-sm text-gray-600 flex justify-between items-center">
        <span>
          {timeLeft > 0
            ? `OTP expires in ${timeLeft} seconds`
            : "OTP has expired"}
        </span>
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={timeLeft > 0 || isResending || !onResend}
          className="text-green-600 hover:text-green-700 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {isResending ? "Sending..." : "Resend OTP"}
        </button>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {showBackButton && (
          <button
            type="button"
            onClick={onBack}
            className="bg-white text-gray-700 px-8 py-2 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className={`bg-green-500 text-white px-8 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading || otpCode.length !== 6}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </div>
    </form>
  );
};

export default OTPVerificationStep;