// types/index.ts
export interface PhoneVerificationData {
    phoneNumber: string;
  }
  
  export interface OTPVerificationData {
    phoneNumber: string;
    otpCode: string;
  }
  
  export interface VerificationResult {
    success: boolean;
    message: string;
    verified: boolean;
  }
  
  export interface PaymentFormData {
    fullName: string;
    email: string;
    billingAddress: string;
    street: string;
    city: string;
    stateProvince: string;
    zipCode: string;
    country: string;
    panNumber: string;
    amount: string;
  }
  
  export interface StepComponentProps<T> {
    initialValues: T;
    onSubmit: (values: T) => void;
  }