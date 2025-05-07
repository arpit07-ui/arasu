// components/steps/PhoneVerificationStep.tsx
import React, { useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "../../../firebase";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";

type PhoneVerificationStepProps = {
  onSubmit: (
    phoneNumber: string,
    confirmationResult: ConfirmationResult
  ) => void;
  initialValue: string;
};

const PhoneVerificationStep: React.FC<PhoneVerificationStepProps> = ({
  onSubmit,
  initialValue,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(initialValue);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      toast.custom("Please enter a valid phone number");
      return;
    }

    try {
      setIsSubmitting(true);

      // Format phone number (already includes country code from the library)
      const formattedPhone = `+${phoneNumber}`;

      // Create a new RecaptchaVerifier instance for each verification attempt
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA verified");
          },
          "expired-callback": () => {
            
          },
        }
      );

      // Render the reCAPTCHA widget
      await recaptchaVerifier.render();

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptchaVerifier
      );

      // Clear recaptcha after successful OTP send
      recaptchaVerifier.clear();
      onSubmit(formattedPhone, confirmationResult);
    } catch (error: any) {
      console.error("Error sending OTP:", error);

      let errorMessage = "Failed to send OTP";
      switch (error.code) {
        case "auth/invalid-phone-number":
          errorMessage = "Invalid phone number format";
          break;
        case "auth/quota-exceeded":
          errorMessage = "Too many attempts. Try again later";
          break;
        case "auth/captcha-check-failed":
          errorMessage = "Security check failed. Please try again";
          break;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="w-4/5">
        <div className=" my-2">
          <PhoneInput
            country={"in"} // Default country
            value={phoneNumber}
            onChange={(phone, country, e, formattedValue) => {
              setPhoneNumber(phone);
              setIsValid(phone.length >= 10);
            }}
            inputProps={{
              required: true,
              disabled: isSubmitting,
            }}
            containerClass="w-full"
            inputClass="w-full  p-3 border border-gray-300 rounded bg-gray-100 text-sm"
            buttonClass="border border-gray-300 rounded bg-gray-100"
            disabled={isSubmitting}
            placeholder="Enter phone number"
            specialLabel=""
            countryCodeEditable={false}
          />
        </div>
        <div id="recaptcha-container" className="mb-4"></div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-8 py-2 rounded-full mt-6 text-sm font-medium disabled:opacity-50"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "Sending OTP..." : "Get OTP"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhoneVerificationStep;
