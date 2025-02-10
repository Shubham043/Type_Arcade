"use client";
import Error from "next/error";
import { useState, useEffect, useRef } from "react";
import TypingBox from "../utils/page";
import Navbar from "../Navbar/page"; // Import your TypingBox component
import axios from "axios";

export default function TypingTest() {
  const [isTyping, setIsTyping] = useState(false); // State to track if the test is active
  const [showResults, setShowResults] = useState(false); // State to show results
  const [wpm, setWpm] = useState(1); // State to hold the WPM value
  const [animationDuration, setanimationDuration] = useState(3);
  const [timer, setTimer] = useState(15); // Timer in seconds
  const [timerDisplay, setTimerDisplay] = useState("00:15"); 
  const [accuracy, setAccuracy] = useState(0)
  const [targetText, setTargetText] = useState("");
  const audio = useRef(null);

  const timerRef = useRef(null);
  const handleStartTest = async () => {
    try {
      const token = localStorage.getItem("jwttoken");
  
      if(audio.current){
        audio.current.play();
      }
      if (!token) {
        console.log("No token found!");
        return;
      }
      // console.log("Token:", token);

  
      const response = await axios.get("http://localhost:8000/test/starttest", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        console.log(response.data);
        
        setTargetText(response.data.mainText);
        console.log(targetText);
        
        setIsTyping(true);
        setWpm(1);
        setShowResults(false);
        setTimer(15);
      }
    } catch (error) {
      console.log("Error starting test:", error.response ? error.response.data : error.message);
    }
  };
  
  const handleEndTest = async () => {
    try {
      const token = localStorage.getItem("jwttoken");
      //  console.log(token);
       
      if (!token) {
        console.log("No token found!");
        return;
      }
      if(audio.current){
        audio.current.pause();
      }
      if(accuracy<60) {
        alert("Your accuracy is too low, you can't submit the test");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:8000/test/submittest",
        { wpm, accuracy, duration: 15 }, // Ensure duration is a number if needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 201) {
        console.log("Test submitted successfully:", response.data);
        
        setIsTyping(false);
        setanimationDuration(3);
        setShowResults(true); // Show results when the test ends
        if (timerRef.current) clearInterval(timerRef.current); // Clear timer safely
      }
    } catch (error) {
      console.log(
        "Error ending test:",
        error.response ? error.response.data : error.message
      );
    }
  };
  

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
  
    if (!isTyping) {
      handleEndTest();
    }
  }, [isTyping, timer]);

  return (
    
    <div className="overflow-hidden w-full h-screen flex flex-col bg-gradient-to-r from-blue-900 to-black relative">
       <audio ref={audio} src="/raftaarein.mp3" />
      <Navbar />
      <div className="w-screen h-screen flex lg:flex-row items-center justify-center">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 h-screen flex flex-col items-start justify-center p-6">
          {/* <img
            className="w-1/2 h-1/3 border rounded-lg m-4 shadow-lg"
            src="/speedometer.png"
            alt="Speedometer"
          /> */}
          <button
            onClick={handleStartTest}
            className={`relative px-6 py-3 text-white font-bold border rounded-lg
              ${isTyping ? "opacity-0" : "opacity-100"}
              hover:before:opacity-100 hover:before:blur-none hover:scale-105`}
          >
            Start Test
          </button>

          {/* Typing Box */}
          {isTyping && (
            <TypingBox setWpm={setWpm} setanimationDuration={setanimationDuration} setIsTyping={setIsTyping} setAccuracy = {setAccuracy}  target_text ={targetText} />
          )} 

          <button
            onClick={handleEndTest}
            className={`relative px-6 py-3 text-white font-bold border rounded-lg
              ${isTyping ? "opacity-100" : "opacity-0"}  hover:before:opacity-100 hover:before:blur-none hover:scale-105 `}
          >
            End Test
          </button>
        </div>

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
                WPM: <span className="font-semibold">{wpm}</span> 
              </h2>
              <h2 className="text-lg">
                Accuracy: <span className="font-semibold">{accuracy}</span>
              </h2>
              <h2 className="text-lg">
                Duration: <span className="font-semibold">15s</span>
              </h2>
            </div>
          </div>

          {/* Timer Box */}
          {/* {isTyping && (
            <div className="bg-gradient-to-r from-green-500 to-blue-500 border rounded-md p-4">
              <h2 className="text-2xl font-semibold">Time Remaining: {timerDisplay}</h2>
            </div>
          )} */}

          {/* Rocket Animation */}
          {isTyping && (
            <>
              <img
                className="space-animate w-40 absolute bottom-0 right-60 transform rounded-md"
                src="/space1.png"
                style={{ animationDuration: `${animationDuration}s` }}
                alt=""
              />
              <img
                className="rocket-animate w-20 absolute bottom-1 right-60 transform rounded-md"
                src="/vertical_rocket.png"
                style={{ animationDuration: `${animationDuration}s` }}
                alt=""
              />
              <img
                className="space-animate w-40 absolute bottom-0 right-20 transform rounded-md"
                src="/space1.png"
                style={{ animationDuration: `${animationDuration}s` }}
                alt=""
              />
              <img
                className="space-animate w-40 absolute bottom-0 right-80 transform rounded-md"
                src="/space1.png"
                style={{ animationDuration: `${animationDuration}s` }}
                alt=""
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}