"use client";

import { useEffect, useState } from "react";
import Navbar from "../Navbar/page";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  const getuserprofile = async () => {
    const token = localStorage.getItem("jwttoken");
    if (!token) {
      console.log("No token found!");
      return;
    }
    try {
      const response = await axios.get("http://localhost:8000/auth/getUserProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        setProfile(response.data);
      }
    } catch (error) {
      console.log("Error getting user profile:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    getuserprofile();
  },[]);

  if (!profile) {
    return <div>Loading...</div>; // Show a loading state while profile is being fetched
  }

  return (
    <div className="p-2 overflow-hidden w-full h-screen bg-gradient-to-r from-blue-800 to-black flex flex-col items-center justify-center">
      {/* Navbar */}
      <div className="absolute top-0 w-full">
        <Navbar />
      </div>

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
