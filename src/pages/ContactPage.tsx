import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ContactFormValues,
  initialContactFormValues,
} from "../types/contactType";
import mailImg from "../../public/assets/icons/mail.svg";
import locationImg from "../../public/assets/icons/location.svg";
import editImg from "../../public/assets/icons/edit.svg";
import Whatsapp from "../components/Whatsapp";
import { createContact } from "../services/contactService";
import toast from "react-hot-toast";

interface ContactInfo {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const ContactForm: React.FC = () => {
  const [contactDetails] = useState<ContactInfo[]>([
    {
      image: mailImg,
      title: "Email",
      description: "admin@saadashrafiyfoundations.com",
      subtitle: "Our friendly team is here to help",
    },
    {
      image: locationImg,
      title: "Office",
      description:
        "53 (OLD 28) FIRST FLOOR, BHARATHI PARK CR RD 6,SAIBABA COLONY, COIMBATORE 641011, TN, INDIA",
      subtitle: "Come say hello at our office HQ.",
    },
    {
      image: editImg,
      title: "Phone",
      description: "0422-3586004",
      subtitle: "Mon-Sat from 10am to 7pm.",
    },
  ]);

  const formik = useFormik<ContactFormValues>({
    initialValues: initialContactFormValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      message: Yup.string().required("Message is required"),
      agree: Yup.boolean().oneOf(
        [true],
        "You must agree to the privacy policy"
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phone,
          message: values.message,
        };
    
        const response = await createContact(payload);
        console.log("API Response:", response.data);
    
        toast.success("Thank you for contacting us!");
        resetForm(); 
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    },
    
  });

  return (
    <>
      <div className="font-rethink bg-[#4E9F3D] bg-opacity-10 py-12 mb-5 px-4 md:px-20">
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-2 tracking-wider">
          Reach out to us – Your enquiry matters!
        </h2>
        <p className="text-center mb-10">
          Fill out the form below, and we’ll get back to you as soon as
          possible!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="md:col-span-3 lg:col-span-2 bg-white p-6 rounded-3xl shadow-md space-y-6 text-center">
            {contactDetails.map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center bg-[#F1F1F1] border rounded-full w-14 h-14">
                  <div className="w-11 h-11 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500 bg-[#4E9F3D26] text-xl shadow-sm">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </div>
                <h4 className="font-medium tracking-wide text-[#4E9F3D] text-[21px]">
                  {item.title}
                </h4>
                <p className="text-[#696969] text-sm">{item.subtitle}</p>
                <p className="text-sm text-black font-[500] whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <form
            onSubmit={formik.handleSubmit}
            className="md:col-span-3 lg:col-span-3 bg-white p-5  rounded-3xl shadow-md"
          >
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Get in Touch
              </h3>
              <p className="mb-4 text-md text-[#696969]">
                Have a question? Fill out the form and we'll reply shortly!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  className="w-full border px-3 py-2  rounded bg-[#EFEEEE]"
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.firstName}
                  </div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name*"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  className="w-full border px-3 py-2 rounded bg-[#EFEEEE]"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full border px-3 py-2 rounded bg-[#EFEEEE]"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number*"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className="w-full border px-3 py-2 rounded bg-[#EFEEEE]"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.phone}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <textarea
                name="message"
                placeholder="Message*"
                rows={4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className="w-full border px-3 py-2 rounded bg-[#EFEEEE]"
              />
              {formik.touched.message && formik.errors.message && (
                <div className="text-red-500 text-sm">
                  {formik.errors.message}
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center space-x-2">
              <input
                type="checkbox"
                name="agree"
                onChange={formik.handleChange}
                checked={formik.values.agree}
                className="w-4 h-4 "
              />
              <label
                htmlFor="agree"
                className="text-sm text-[#696969] font-medium"
              >
                You agree to our friendly{" "}
                <span className="font-semibold underline">
                  [Privacy Policy]
                </span>
              </label>
            </div>
            {formik.touched.agree && formik.errors.agree && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.agree}
              </div>
            )}

            <div className="flex justify-center pt-7">
              <button
                type="submit"
                className="mt-4 bg-[#4E9F3D] text-white px-7 py-2 rounded-3xl hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Whatsapp/>
    </>
  );
};

export default ContactForm;
