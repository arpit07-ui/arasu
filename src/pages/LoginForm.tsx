import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../services/authService";
import { LoginCredentials } from "../types/authTypes";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import toast from "react-hot-toast";

const LoginForm: React.FC = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues: LoginCredentials = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: LoginCredentials,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError("");
    try {
      const user = await loginUser(values);
      const admin = {
        email: user?.admin?.email,
        token: user?.token,
        id: user?.admin?.id,
      };
      dispatch(login(admin));
      toast.success("Logged in successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="font-rethink flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-green-900 via-black to-blue-900 px-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">
            <h2 className="text-2xl font-semibold text-center text-white mb-2 tracking-wide">
              Welcome back
            </h2>
            <p className="text-sm text-center text-gray-300 mb-6">
              Login to your account
            </p>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            {/* Email Field */}
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/30 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-white"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            {/* Divider */}
            {/* <div className="my-4 flex items-center justify-center">
              <hr className="w-[50%] border-gray-500 ml-10" />
              <span className="px-2 text-sm text-white">or</span>
              <hr className="w-[50%] border-gray-500 mr-10" />
            </div> */}

            {/* Google Login Placeholder */}
            {/* <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 py-2 rounded-md hover:bg-white/20 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Login with Google
            </button> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
