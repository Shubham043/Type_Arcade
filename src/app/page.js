"use client";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Notification from './utils/Notification';

export default function HomePage() {
  const router = useRouter();
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "error" 
  });

  const handleStart = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwttoken");
    
    if (token) {
      router.push('/Typing');
    } else {
      showNotification("Please login first to start typing!");
      setTimeout(() => router.push('/Login'), 2000);
    }
  };

  const showNotification = (message, type = "error") => {
    setNotification({
      show: true,
      message,
      type
    });
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row md:flex-col items-center justify-center bg-gradient-to-r from-indigo-900 to-black relative">
      {/* Notification */}
      {notification.show && (
        <Notification 
          message={notification.message} 
          type={notification.type}
          onClose={() => setNotification(prev => ({...prev, show: false}))}
        />
      )}

      {/* Buttons on Top-Left */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <Link href="/SignUp" className="text-white border lg:w-auto p-2 h-auto text-center rounded-md text-sm sm:text-1xl cursor-pointer hover:bg-white/10 transition-colors">
          Create account
        </Link>
        <Link href="/Login" className="text-white border lg:w-auto p-2 h-auto text-center rounded-md text-sm sm:text-1xl cursor-pointer hover:bg-white/10 transition-colors">
          Login
        </Link>
      </div>

      {/* Left Section */}
      <div className="flex items-left justify-center flex-col lg:w-1/2 md:w-1/2 w-full h-screen p-8 sm:m-0">
        <h1 className="text-5xl font-extrabold text-white m-4 animate-typing-loop">
          Test Your Typing Speed!
        </h1>
        <p className="text-xl text-start text-gray-200 m-4">
          Challenge yourself and improve your typing skills!
        </p>
        <button 
          onClick={handleStart}
          className="px-6 py-3 w-full lg:w-1/2 m-4 text-white rounded-full text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          Start Test  
        </button>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 w-full h-screen flex items-center justify-center p-1">
        <img 
          className="w-3/5 border rounded-lg animate-bounce cursor-pointer hover:shadow-lg hover:shadow-purple-500/50 transition-shadow" 
          src="/logo.webp" 
          alt="Typing Test Logo" 
        />
      </div>
    </div>
  );
}