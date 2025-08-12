"use client";

import axios from "axios";
import Navbar from "../Navbar/page";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LeaderBoard() {
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getleaderboard = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwttoken");
        if (!token) {
          setError("Please login to view leaderboard");
          router.push("/Login");
          return;
        }
        
        const response = await axios.get(
          "https://typearcade-backend.onrender.com/test/leaderboard", 
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setLeaderboard(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setError(error.response?.data?.message || "Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    getleaderboard();
  }, [router]); 

  // Medal colors for top 3 positions
  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-400";
      case 3: return "bg-gradient-to-r from-amber-600 to-amber-800";
      default: return "bg-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-3">
              Global Leaderboard
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See how you stack up against the fastest typers in the community
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h3 className="text-gray-400 text-sm uppercase tracking-wider">Total Players</h3>
              <p className="text-3xl font-bold text-white mt-2">
                {leaderboard ? leaderboard.length : "..."}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h3 className="text-gray-400 text-sm uppercase tracking-wider">Top Score</h3>
              <p className="text-3xl font-bold text-white mt-2">
                {leaderboard?.[0]?.maxspeed || "..."} WPM
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h3 className="text-gray-400 text-sm uppercase tracking-wider">Average</h3>
              <p className="text-3xl font-bold text-white mt-2">
                {leaderboard ? Math.round(leaderboard.reduce((acc, curr) => acc + curr.maxspeed, 0) / leaderboard.length) : "..."} WPM
              </p>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-gradient-to-r from-blue-900 to-blue-800 p-4 items-center">
              <div className="col-span-1 text-center font-semibold text-gray-200">Rank</div>
              <div className="col-span-7 md:col-span-8 font-semibold text-gray-200">Player</div>
              <div className="col-span-4 md:col-span-3 text-center font-semibold text-gray-200">WPM Score</div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-400">Loading leaderboard...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="p-8 text-center text-red-400">
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Leaderboard Data */}
            {!loading && !error && leaderboard && (
              <div className="divide-y divide-gray-700">
                {leaderboard.map((player, index) => (
                  <div 
                    key={player._id || index}
                    className={`grid grid-cols-12 p-4 items-center hover:bg-gray-750 transition-colors ${index < 3 ? getRankColor(index + 1) : ""}`}
                  >
                    <div className="col-span-1 text-center font-medium">
                      {index < 3 ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-20">
                          {index + 1}
                        </span>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="col-span-7 md:col-span-8 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium">
                          {player.username?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                      <span className="font-medium truncate">
                        {player.username || "Anonymous"}
                      </span>
                    </div>
                    <div className="col-span-4 md:col-span-3 text-center font-bold">
                      <span className="px-3 py-1 rounded-full bg-gray-700 text-white">
                        {player.maxspeed} WPM
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination Controls (for future implementation) */}
          <div className="mt-8 flex justify-center space-x-2">
            <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>TypeArcade © {new Date().getFullYear()} - Test your typing speed</p>
      </footer>
    </div>
  )}
