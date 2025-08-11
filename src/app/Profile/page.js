"use client";

import { useEffect, useState } from "react";
import Navbar from "../Navbar/page";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('jwttoken');
    router.push('/Login'); 
  };

  const getUserProfile = async () => {
    const token = localStorage.getItem("jwttoken");
    
    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      router.push('/Login');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        "https://typearcade-backend.onrender.com/auth/getUserProfile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000 
        }
      );

      if (response.status === 200) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      setError(error.response?.data?.message || "Failed to load profile");
      if (error.response?.status === 401) {
        handleLogout(); 
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen bg-gradient-to-r from-blue-800 to-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen bg-gradient-to-r from-blue-800 to-black flex flex-col items-center justify-center">
        <div className="text-red-400 text-xl mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-2 overflow-hidden w-full h-screen bg-gradient-to-r from-blue-800 to-black flex flex-col items-center justify-center">
      {/* Navbar */}
      <div className="absolute top-0 w-full">
        <Navbar />
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-12 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Log Out
      </button>

      {/* Profile Section */}
          <div className="w-11/12 h-3/4 lg:w-2/3 bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <img
            className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-lg"
            src={profile.profilePic || "/logo.webp"} // Use profile picture from data or fallback
            alt="Profile"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">{profile.username}</h1>
            <p className="text-gray-300">{profile.email}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-around text-white mb-8">
          <div className="flex flex-col items-center p-4 bg-gradient-to-r from-green-600 to-blue-700 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Highest WPM</h2>
            <p className="text-2xl font-bold">{profile.maxspeed}</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gradient-to-r from-purple-600 to-pink-700 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Average WPM</h2>
            <p className="text-2xl font-bold">{profile.avg_speed}</p>
          </div>
        </div>

        {/* Test History Table */}
        <div className="overflow-x-auto border border-gray-700 rounded-lg">
          <table className="w-full text-left text-gray-200">
            <thead className="bg-gradient-to-r from-blue-900 to-blue-700">
              <tr>
                <th className="p-4 text-lg">Date</th>
                <th className="p-4 text-lg">Wpm</th>
                <th className="p-4 text-lg">Accuracy</th>
                {/* <th className="p-4 text-lg">duration</th> */}
              </tr>
            </thead>
            <tbody>
              {profile.typinghistory && profile.typinghistory.length > 0 ? (
                profile.typinghistory.map((test, index) => (
                  <tr
                    key={test._id || index} // Fallback to index if _id is not present
                    className={`transition-all ${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    } hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500`}
                  >
                    <td className="p-4 font-semibold"> {new Date(test.date).toLocaleDateString()}</td>
                    <td className="p-4 font-semibold">
                      {test.wpm} {/* Format date */}
                    </td>
                    <td className="p-4 font-semibold">{test.accuracy}</td>
                    <td className="p-4 font-semibold">{test.duration}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No typing history available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* View All Button */}
        <div className="mt-6 text-center">
          <button className="px-6 py-3 text-white bg-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-700">
            View Full History
          </button>
        </div>
      </div>
    </div>
  );
}