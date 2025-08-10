"use client";

import axios from "axios";
import Navbar from "../Navbar/page";
import { useState, useEffect } from "react";

export default function LeaderBoard() {
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    const getleaderboard = async () => {
      try {
        const token = localStorage.getItem("jwttoken");
        if (!token) {
          console.log("No token found!");
          alert("Please login first")
          return;
        }
        const response = await axios.get("https://typearcade-backend.onrender.com/test/leaderboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setLeaderboard(response.data);
        }
      } catch (error) {
        console.log("Error fetching leaderboard:", error.response ? error.response.data : error.message);
      }
    };

    getleaderboard();
  }, []); 

  return (
    <div className="w-full h-screen bg-gradient-to-r from-gray-900 to-black flex flex-col items-center justify-center">
      <div><Navbar/></div>    
      <div className="w-11/12 lg:w-2/3 bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white text-center mb-6">Leaderboard</h1>
        <div className="overflow-hidden border border-gray-700 rounded-lg">
          <table className="w-full text-left text-gray-200">
            <thead className="bg-gradient-to-r from-blue-900 to-blue-700">
              <tr>
                <th className="p-4 text-lg">Rank</th>
                <th className="p-4 text-lg">Player</th>
                <th className="p-4 text-lg">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard
                ? leaderboard.map((player, index) => (
                    <tr
                      key={index}
                      className={`transition-all ${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                      } hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500`}
                    >
                      <td className="p-4 font-semibold text-center">{index + 1}</td>
                      <td className="p-4 font-semibold">{player.username}</td>
                      <td className="p-4 font-semibold text-center">{player.maxspeed}</td>
                    </tr>
                  ))
                : <tr><td colSpan="3" className="text-center p-4">Loading...</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-center">
          <button className="px-6 py-3 text-white bg-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-700">
            View Full Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
