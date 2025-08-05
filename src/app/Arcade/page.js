"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import GameContext from "../context/page";
import MultiTypingBox from "../MultiTyping/page";
import OpponentTypingBox from "../Opponent/page";
import Navbar from "../Navbar/page";
import { targetText } from "../utils/targettext";

export default function Arcade() {
 const [target_text, settarget_text] = useState("Hey How you doing");

  useEffect(() => {
    const fetchText = async () => {
      const text = await targetText();
      console.log(text)
      if (text) settarget_text(text);
    };

    fetchText();
  }, []);
  const duration = 25;
  const [timeLeft, setTimeLeft] = useState(duration);
  const [gameRunning, setGameRunning] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const {
    username,
    opponent,
    waiting,
    isReady,
    opponentReady,
    countdown,
    gameStarted,
    joinCompetition,
    setReady,
    opponentScore,
    sendScore
  } = useContext(GameContext);

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("jwttoken");
      if (!token) return;

      try {
        const response = await axios.get("https://typearcade-backend.onrender.com/auth/getUserProfile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
          joinCompetition(response.data.username);
        }
      } catch (error) {
        console.log("Error getting user profile:", error);
      }
    };

    fetchUsername();
  }, []);


  const resetGame = () => {
  setWPM(0);
  setAccuracy(0);
  setShowResults(false);
  setTimeLeft(duration);
  setGameRunning(false);

};


  // Start timer when both are ready
  useEffect(() => {
  if (isReady && opponentReady) {
    setGameRunning(true);
    setTimeLeft(duration);
    setShowResults(false);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameRunning(false);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }
}, [isReady, opponentReady]);

  const handleFinish = (wpm, acc) => {
 
    sendScore(wpm);
    setWPM(wpm);
    setAccuracy(acc);
  };

  return (
    <div className="relative p-4 overflow-hidden w-full h-screen bg-gradient-to-r from-blue-800 to-black flex flex-col items-center justify-center space-y-6">
      <div className="absolute top-4 right-4 z-10">
        <Navbar />
      </div>

      <div className="text-white text-center text-4xl font-semibold animate-pulse p-2 rounded-md">
        Typing Arcade!!
      </div>

      {gameStarted &&
        isReady && opponentReady  ? (
          <div className="w-screen flex flex-col md:flex-row items-center justify-center md:space-x-8">
            <div>
              <MultiTypingBox
                targetText={target_text}
                gameRunning={gameRunning}
                timeLeft={timeLeft}
                onFinish={handleFinish}
              />
              <h1 className="text-white p-1 text-xl">
                {username} {isReady ? "✅" : "❌"}
              </h1>
            </div>
            <div>
              <OpponentTypingBox
                targetText={target_text}
                gameStarted={gameStarted}
                isReady={isReady}
              />
              <h2 className="text-white p-1 text-xl">
                {opponent} {opponentReady ? "✅" : "❌"}
              </h2>
            </div>
          </div>
        ) : (
        <div className="text-white text-lg font-medium">Waiting for an opponent...</div>
      )}

{showResults && (
  <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-xl max-w-md mx-auto">
    {/* Player Cards Container */}
    <div className="flex flex-row space-y-4">
      {/* Your Score Card */}
      <div className="bg-gray-800/60 p-4 rounded-lg border-l-4 border-cyan-400">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-300">You</h3>
            <h2 className="text-xl font-bold text-white">{username}</h2>
          </div>
          <div className="text-right">
            <p className="text-2xl ml-2 p-2 font-mono font-bold text-cyan-400">{WPM} <span className="text-sm text-gray-400">WPM</span></p>
            {/* <p className="text-sm text-gray-300">Accuracy: <span className="font-medium text-white">{accuracy.toFixed(1)}%</span></p> */}
          </div>
        </div>
      </div>

      {/* VS Divider */}
      <div className="relative flex justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700/50"></div>
        </div>
        <div className="relative px-2 bg-gray-900/80 text-xs font-medium text-gray-400 rounded-full">VS</div>
      </div>

      {/* Opponent Score Card */}
      <div className="bg-gray-800/60 p-4 rounded-lg border-l-4 border-purple-400">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-300">Opponent</h3>
            <h2 className="text-xl font-bold text-white">{opponent}</h2>
          </div>
          <div className="text-right">
            <p className="text-2xl ml-2 p-2 font-mono font-bold text-purple-400">{opponentScore} <span className="text-sm text-gray-400">WPM</span></p>
            {/* <p className="text-sm text-gray-300">Accuracy: <span className="font-medium text-white">{accuracy.toFixed(1)}%</span></p> */}
          </div>
        </div>
      </div>
    </div>

    {/* Winner Badge (appears automatically based on scores) */}
    <div className={`mt-4 text-center py-2 rounded-md font-medium ${WPM > opponentScore ? 'bg-cyan-900/30 text-cyan-400' : WPM < opponentScore ? 'bg-purple-900/30 text-purple-400' : 'bg-gray-800 text-gray-400'}`}>
      {WPM > opponentScore ? 'You won!' : WPM < opponentScore ? `${opponent} won!` : 'Tie game!'}
    </div>
  </div>
)}

      {gameStarted ? (
        <div className="text-white text-lg font-medium mt-4">Game in Progress...</div>
      ) : countdown !== null ? (
        <div className="text-white text-lg font-medium mt-4">Starting in {countdown}...</div>
      ) : waiting ? (
        <button
          onClick={() => joinCompetition(username)}
          className="text-white bg-blue-600 hover:bg-blue-700 border p-3 text-xl rounded-md mt-4"
        >
          Join Competition
        </button>
      ) : !isReady ? (
        <button
          onClick={() => setReady()}
          className="text-white bg-green-600 hover:bg-green-700 p-3 text-xl rounded-md mt-4"
        >
          Ready Up
        </button>
      ) : (
        <div className="text-white text-lg font-medium mt-4">Waiting for opponent to Ready...</div>
      )}
    </div>
  );
}
