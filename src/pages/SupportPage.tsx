// App.tsx - Main Application Component
import { useEffect, useState } from "react";
import PhoneVerificationStep from "../components/donatePage/steps/PhoneVerificationStep";
import OTPVerificationStep from "../components/donatePage/steps/OtpVerificationStep";
import PaymentFormStep from "../components/donatePage/steps/PaymentFormStep";
import SecurityFooter from "../components/donatePage/common/SecurityFooter";
import ProgressIndicator from "../components/donatePage/common/ProgressIndicator";
import RazorpayStep from "../components/donatePage/steps/RazorpayStep";
import {
  FormContainer,
  MainPanel,
  SidePanel,
} from "../components/donatePage/Layout";
import { createpaymentForm } from "../services/paymentFormStepService";
import { ConfirmationResult } from "firebase/auth";
import toast from "react-hot-toast";

// Define our steps
enum FormStep {
  PHONE_VERIFICATION = 1,
  OTP_VERIFICATION = 2,
  PAYMENT_FORM = 3,
  RAZOR_FORM = 4,
}


const Support = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>(
    FormStep.PHONE_VERIFICATION
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otpCode, setOtpCode] = useState<string>("");
  const [heading, setHeading] = useState("Phone Verification");
  const [paymentData, setPaymentData] = useState<any | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  useEffect(() => {
    setHeading("Phone Verification");
  }, []);

  const handlePhoneSubmit = async (
    phone: string,
    confirmation: ConfirmationResult
  ) => {
    setPhoneNumber(phone);
    setConfirmationResult(confirmation);
    setCurrentStep(FormStep.OTP_VERIFICATION);
    setHeading("OTP Verification");
  };

  const handleOtpSubmit = async (otp: string) => {
    if (!confirmationResult) {
      toast.custom("No OTP verification in progress");
      return;
    }

    setIsVerifying(true);
    try {
      const result = await confirmationResult.confirm(otp);
      if (result.user) {
        setCurrentStep(FormStep.PAYMENT_FORM);
        setHeading("Payment Details");
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePaymentForm = async (data: any) => {
    const paymentPayload = {
      fullName: data.fullName,
      email: data.email,
      billingAddress: data.billingAddress,
      street: data.street,
      city: data.city,
      state: data.stateProvince,
      zip: data.zipCode,
      country: data.country,
      pan: data.panNumber,
      amount: data.amount,
    };

    try {
      const response = await createpaymentForm(paymentPayload);
      console.log("Payment form submitted:", response);

      setPaymentData({ ...data, phoneNumber });
      setCurrentStep(FormStep.RAZOR_FORM);
      setHeading("RazorPay");
    } catch (error: any) {
      console.error("Error submitting payment form:", error.message);
      toast.error("Failed to process payment form. Please try again.");
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case FormStep.OTP_VERIFICATION:
        setCurrentStep(FormStep.PHONE_VERIFICATION);
        setHeading("Phone Verification");
        setConfirmationResult(null);
        break;
      case FormStep.PAYMENT_FORM:
        setCurrentStep(FormStep.OTP_VERIFICATION);
        setHeading("OTP Verification");
        break;
      case FormStep.RAZOR_FORM:
        setCurrentStep(FormStep.PAYMENT_FORM);
        setHeading("Payment Details");
        break;
      default:
        break;
    }
  };

  const getProgressPercent = (): string => {
    switch (currentStep) {
      case FormStep.PHONE_VERIFICATION:
        return "20%";
      case FormStep.OTP_VERIFICATION:
        return "50%";
      case FormStep.PAYMENT_FORM:
        return "75%";
      case FormStep.RAZOR_FORM:
        return "85%";
      default:
        return "0%";
    }
  };

  return (
    <div className="bg-green-50 min-h-screen p-6 flex flex-col items-center">
      <FormContainer>
        <SidePanel />
        <MainPanel>
          <h2 className="text-green-600 text-xl font-semibold mb-2">
            {heading}
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            {currentStep === FormStep.PHONE_VERIFICATION
              ? "Let's verify your phone number"
              : currentStep === FormStep.OTP_VERIFICATION
                ? `Enter the verification code sent to ${phoneNumber}`
                : "Complete your donation"}
          </p>
          <ProgressIndicator
            steps={4}
            currentStep={currentStep}
            progressWidth={getProgressPercent()}
          />
          {currentStep === FormStep.PHONE_VERIFICATION && (
            <PhoneVerificationStep
              onSubmit={handlePhoneSubmit}
              initialValue={phoneNumber}
            />
          )}
          {currentStep === FormStep.OTP_VERIFICATION && (
            <OTPVerificationStep
              onSubmit={handleOtpSubmit}
              onBack={handleBack}
              initialValue={otpCode}
              showBackButton={true}
              phoneNumber={phoneNumber}
              loading={isVerifying}
            />
          )}
          {currentStep === FormStep.PAYMENT_FORM && (
            <PaymentFormStep
              onSubmit={handlePaymentForm}
              onBack={handleBack}
              showBackButton={true}
            />
          )}
          {currentStep === FormStep.RAZOR_FORM && paymentData && (
            <RazorpayStep
              // amount={parseFloat(paymentData.amount)}
              // fullName={paymentData.fullName}
              // email={paymentData.email}
              // phoneNumber={paymentData.phoneNumber}
              // onBack={handleBack}
              // showBackButton={true}
            />
          )}
        </MainPanel>
      </FormContainer>
      <SecurityFooter />
    </div>
  );
};

export default Support;
