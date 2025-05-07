// components/steps/PaymentFormStep.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define type for payment form values
interface PaymentFormValues {
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

// Define prop type for component
interface PaymentFormStepProps {
  onSubmit: (values: PaymentFormValues) => void;
  onBack: () => void;
  showBackButton: boolean;
}

// Validation schema using Yup
const PaymentFormSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  billingAddress: Yup.string().required("Billing address is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  stateProvince: Yup.string().required("State/Province is required"),
  zipCode: Yup.string().required("ZIP/Postal code is required"),
  country: Yup.string().required("Country is required"),
  panNumber: Yup.string().required("Pan is required"),
  amount: Yup.string().required("Amount is required"),
});

// Initial values for the form
const initialValues: PaymentFormValues = {
  fullName: "",
  email: "",
  billingAddress: "",
  street: "",
  city: "",
  stateProvince: "",
  zipCode: "",
  country: "",
  panNumber: "",
  amount: "",
};

const PaymentFormStep: React.FC<PaymentFormStepProps> = ({
  onSubmit,
  onBack,
  showBackButton,
}) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-lg p-6 mb-6">
      {/* <h2 className="text-green-600 text-xl font-semibold text-center mb-2">Payment Form</h2>
      <p className="text-gray-600 text-sm text-center mb-6">
        Tell us about the kind heart behind the help
      </p> */}

      <Formik
        initialValues={initialValues}
        validationSchema={PaymentFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Field
                  name="fullName"
                  type="text"
                  placeholder="Full Name*"
                  className={`w-full p-3 border ${
                    errors.fullName && touched.fullName
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded bg-gray-100 text-sm`}
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email Address*"
                  className={`w-full p-3 border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded bg-gray-100 text-sm`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <Field
                  name="billingAddress"
                  type="text"
                  placeholder="Billing Address*"
                  className={`w-full p-3 border ${
                    errors.billingAddress && touched.billingAddress
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded bg-gray-100 text-sm`}
                />
                <ErrorMessage
                  name="billingAddress"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <Field
                  name="street"
                  type="text"
                  placeholder="Street*"
                  className={`w-full p-3 border ${
                    errors.street && touched.street
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded bg-gray-100 text-sm`}
                />
                <ErrorMessage
                  name="street"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <Field
                  name="city"
                  type="text"
                  placeholder="City*"
                  className={`w-full p-3 border ${
                    errors.city && touched.city
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded bg-gray-100 text-sm`}
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <Field
                  name="stateProvince"
                  type="text"
                  placeholder="State/Province*"
                  className={`w-full p-3 border ${
                    errors.stateProvince && touched.stateProvince
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded bg-gray-100 text-sm`}
                />
                <ErrorMessage
                  name="stateProvince"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <Field
                  name="zipCode"
                  type="text"
                  placeholder="ZIP/Postal Code*"
                  className={`w-full p-3 border ${
                    errors.zipCode && touched.zipCode
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded bg-gray-100 text-sm`}
                />
                <ErrorMessage
                  name="zipCode"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <div className="relative">
                  <Field
                    as="select"
                    name="country"
                    className={`w-full p-3 border ${
                      errors.country && touched.country
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded bg-gray-100 text-sm appearance-none`}
                  >
                    <option value="" disabled>
                      Country
                    </option>
                    {/* <option value="us">United States</option> */}
                    {/* <option value="ca">Canada</option> */}
                    <option value="in">India</option>
                    {/* <option value="uk">United Kingdom</option> */}
                    {/* Add more countries as needed */}
                  </Field>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <Field
                  name="panNumber"
                  type="text"
                  placeholder="PAN Number"
                  className="w-full p-3 border border-gray-300 rounded bg-gray-100 text-sm"
                />
              </div>

              <div>
                <Field
                  name="amount"
                  type="text"
                  placeholder="Amount*"
                  className={`w-full p-3 border ${
                    errors.amount && touched.amount
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded bg-gray-100 text-sm`}
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              {" "}
              {showBackButton && (
                <button
                  type="button"
                  onClick={onBack}
                  className="bg-white text-gray-700 px-8 py-2 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 text-white px-8 py-2 rounded-full text-sm font-medium"
              >
                {isSubmitting ? "Processing..." : "Next"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentFormStep;
