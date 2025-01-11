"use client";

import { useState } from "react";

export default function TypingTest() {
  const targetText = "The quick brown fox jumps over the lazy dog.";
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleStartTest = () => {
    setIsTyping(true);
    setUserInput("");
    setShowResults(false);
  };

  const handleEndTest = () => {
    setIsTyping(false);
    setShowResults(true);
  };

  const handleTyping = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-900 to-black relative">
      <div className="w-screen h-screen flex lg:flex-row items-center justify-center">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 h-screen flex flex-col items-start justify-center p-6">
          <img
            className="w-full h-1/3 border rounded-lg m-4 shadow-lg"
            src="/speedometer.png"
            alt="Speedometer"
          />
         <button
  onClick={handleStartTest}
  className="relative px-6 py-3 text-white font-bold 
    bg-gradient-to-r from-blue-500 to-purple-600 
    rounded-none text-sm sm:text-lg cursor-pointer transform transition-all duration-300
    before:absolute before:inset-0 before:rounded-none before:border-2 before:border-t-4 before:border-r-4 
    before:border-b-4 before:border-l-4 before:border-solid 
    before:border-red-500 before:opacity-50 before:blur-sm
    hover:before:opacity-100 hover:before:blur-none hover:scale-105"
>
  Start Test
</button>


          {isTyping && (
            <textarea
              className="w-full h-1/3 p-4  text-lg leading-6 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder={targetText}
              value={userInput}
              onChange={handleTyping}
            />
          )}
<button
  onClick={handleEndTest}
  className="relative px-6 py-3 text-white font-bold 
    bg-gradient-to-r from-blue-500 to-purple-600 
    rounded-none text-sm sm:text-lg cursor-pointer transform transition-all duration-300
    before:absolute before:inset-0 before:rounded-none before:border-2 before:border-t-4 before:border-r-4 
    before:border-b-4 before:border-l-4 before:border-solid 
    before:border-red-500 before:opacity-50 before:blur-sm
    hover:before:opacity-100 hover:before:blur-none hover:scale-105"
>
  End Test
</button>

        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-white gap-6">
          <div
            className={`w-full lg:w-1/2 p-6 ${
              showResults ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500 bg-gradient-to-r from-yellow-500 to-red-600 border rounded-md text-white`}
          >
            <h1 className="text-4xl font-semibold mb-4">Result:</h1>
            <div className="bg-gradient-to-r from-black to-yellow-400 border rounded-md p-4 space-y-3">
              <h2 className="text-lg">
                WPM: <span className="font-semibold">120</span>
              </h2>
              <h2 className="text-lg">
                Accuracy: <span className="font-semibold">95%</span>
              </h2>
              <h2 className="text-lg">
                Duration: <span className="font-semibold">2 min</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Rocket Animation */}
        {isTyping && (
          <img
            className="rocket-animate w-20 absolute bottom-1 right-60 transform rounded-md"
            src="/vertical_rocket.png"
            alt=""
          />
        )}
      </div>
    </div>
  );
}
