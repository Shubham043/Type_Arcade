"use client";
import { useRouter } from "next/navigation";
import { useState,setError } from "react";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e)=> {
    e.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:8000/auth/signUp",formData);
      if(response.status=== 201){
        console.log("signed up successfully",response.data);
        router.push("/Login"); 
      }
      else {
      console.log("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      // setError(error.response?.data?.message || "Something went wrong. Please try again.");
    }

    // console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-black">
      <div className="w-full max-w-screen-md p-8 h-auto flex flex-col md:flex-col lg:flex-row items-center justify-between rounded-lg bg-yellow-500/10 shadow-lg">
        {/* Form Section */}
        <div className="w-full md:w-1/2 lg:w-1/2">
          <h1 className="text-2xl font-bold text-center text-white mb-8">Sign Up</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center gap-4 my-2">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-green-500 px-4 py-2 mt-4 text-white font-semibold rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400"
            >
              Submit
            </button>
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
