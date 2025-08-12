"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Preloader from "../utils/Preloader";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showemailtext, setshowemailtext] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://typearcade-backend.onrender.com/auth/signUp",
        formData
      );
      
      if (response.status === 201) {
        setshowemailtext(true);
        console.log(response)
        setIsLoading(false);
        // router.push("/Login");
      }
    } catch (error) {
      console.log("In Catch block----->",error.response.data.error)

      // console.error("Error signing up:", error.response.data.error);
      setError(error.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-black">
      {isLoading && <Preloader />}
      
      <div className="w-full max-w-screen-md p-8 h-auto flex flex-col md:flex-col lg:flex-row items-center justify-between rounded-lg bg-yellow-500/10 shadow-lg">
        {/* Form Section */}
        <div className="w-full md:w-1/2 lg:w-1/2">
          <h1 className="text-2xl font-bold text-center text-white mb-8">Sign Up</h1>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center gap-4 my-2">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              minLength={6}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <h4>Already Have an Account! 
             <Link className=" ml-2 text-blue-500" href="/Login"> Login Here</Link>
            </h4>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-green-500 px-4 py-2 mt-4 text-white font-semibold rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Processing..." : "Submit"}
            </button>
            {showemailtext && (
  <div className="mb-4 p-2 bg-green-100 text-green-800 rounded-md">
    Verification email sent to your email.Please verify!
  </div>
)}
          </form>
        </div>

        {/* Logo Section */}
        <div className="w-full md:w-1/2 lg:w-1/2 flex items-center justify-center mt-6 md:mt-0">
          <img
            src="/logo.webp"
            alt="Website Logo"
            className="w-48 h-48 object-contain"
          />
        </div>
      </div>
    </div>
  );
}