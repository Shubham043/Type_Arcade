"use client";

import { useState,useEffect } from "react";
import TypingBox from "../utils/page";
import Navbar from "../Navbar/page";  // Import your TypingBox component

export default function TypingTest() {
  const [isTyping, setIsTyping] = useState(false); // State to track if the test is active
  const [showResults, setShowResults] = useState(false); // State to show results
  const [wpm, setWpm] = useState(1); // State to hold the WPM value
  const [animationDuration, setanimationDuration] = useState(3)

  const handleStartTest = () => {
    setIsTyping(true);
    setWpm(1);
    setShowResults(false); // Hide results when starting the test
  };

  const handleEndTest = () => {
    setIsTyping(false);
    setanimationDuration(3);
    setShowResults(true); // Show results when the test ends
  };
 
 


  return (
    <div className="overflow-hidden w-full h-screen bg-gradient-to-r from-blue-900 to-black relative">
     <Navbar />
      <div className="w-screen h-screen flex lg:flex-row items-center justify-center">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 h-screen flex flex-col items-start justify-center p-6">
          <img
            className="w-1/2 h-1/3 border rounded-lg m-4 shadow-lg"
            src="/speedometer.png"
            alt="Speedometer"
          />
          <button
            onClick={handleStartTest}
            className="relative px-6 py-3 text-white font-bold
              hover:before:opacity-100 hover:before:blur-none hover:scale-105"
          >
            Start Test
          </button>

          {/* Typing Box */}
          {isTyping && <TypingBox setWpm={setWpm} setanimationDuration = {setanimationDuration}/>} {/* Pass setWpm to TypingBox */}

          <button
            onClick={handleEndTest}
            className="relative px-6 py-3 text-white font-bold
              hover:before:opacity-100 hover:before:blur-none hover:scale-105"
          >
            End Test
          </button>
        </div>

        {/* <div className="text-center text-red-400 border rounded-md p-3">
          Result : {wpm}
        </div> */}

        {/* Right Section */}
        <div className=" overflow-hidden w-full lg:w-1/2 flex flex-col items-center justify-center text-white gap-6">
        
          <div
            className={`w-full lg:w-1/2 p-6 ${
              showResults ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500 bg-gradient-to-r from-gray-500 to-red-400 border rounded-md text-white`}
          >
            <h1 className="text-4xl font-semibold mb-4">Result:</h1>
            <div className="bg-gradient-to-r from-black to-yellow-200 border rounded-md p-4 space-y-3">
              <h2 className="text-lg">
                WPM: <span className="font-semibold">{wpm}</span> {/* Display real WPM */}
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
            className="space-animate3 w-40 absolute bottom-0 right-60 transform rounded-md"
            src="/space1.png"
            style={{
              animationDuration: `${animationDuration}s`,
            }}
            alt=""
          />
        )}
        {isTyping && (
          
          <img
            className="rocket-animate w-20 absolute bottom-1 right-60 transform rounded-md"
            src="/vertical_rocket.png"
            alt=""
            style={{
              animationDuration: `${animationDuration}s`,
            }}
          />
        )}
         {isTyping && (
          
          <img
            className="space-animate2 w-40 absolute bottom-0 right-20 transform rounded-md"
            src="/space1.png"
            style={{
              animationDuration: `${animationDuration}s`,
            }}
            alt=""
          />
        )}
        {isTyping && (
          
          <img
            className="space-animate1 w-40 absolute bottom-0 right-80 transform rounded-md"
            src="/space1.png"
            style={{
              animationDuration: `${animationDuration}s`,
            }}
            alt=""
          />
        )}
      </div>
    </div>
  );
}
