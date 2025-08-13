"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Preloader from "../utils/Preloader";
import Link from "next/link";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const[isLoading,setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log("im in login--->")
    e.preventDefault();
    setIsLoading(true);
    try {
    const response = await axios.post("https://typearcade-backend.onrender.com/auth/signIn",{email,password});
    if(response.status===200){
      localStorage.setItem("jwttoken",response.data.token)
      console.log(response.data)
      setIsLoading(false);
      router.push("/");
    }
    }
   catch (error) {
    setError(error.response?.data?.error || "Signup failed. Please try again.");
   }
 finally{
  setIsLoading(false);
 }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 to-black">
       {isLoading && <Preloader />}
      <div className="w-full max-w-screen-md p-8 h-auto flex flex-col md:flex-col lg:flex-row items-center justify-between rounded-lg bg-yellow-500/10 shadow-lg">
        {/* Form Section */}
         {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
        <div className="w-full md:w-1/2 lg:w-1/2">
          <h1 className="text-2xl font-bold text-center text-white mb-8">Login Here!</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center gap-4 my-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 input-fire"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 input-fire"
            />

             <h4>Don't Have an Account! 
             <Link className=" ml-2 text-blue-500" href="/SignUp"> SignUp Here</Link>
            </h4>
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
