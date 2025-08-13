"use client";
import Error from "next/error";
import { useState, useEffect, useRef } from "react";
import TypingBox from "../utils/page";
import Navbar from "../Navbar/page";
import axios from "axios";
import { auth } from "../utils/auth";
import { useRouter } from "next/navigation";
import Notification from "../utils/Notification";

export default function TypingTest() {
    const [isTyping, setIsTyping] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [wpm, setWpm] = useState(1);
    const [animationDuration, setanimationDuration] = useState(3);
    const [timer, setTimer] = useState(0);
    const [timerDisplay, setTimerDisplay] = useState(30);
    const [accuracy, setAccuracy] = useState(70);
    const [targetText, setTargetText] = useState("");
    const router = useRouter();
    const [showNotification, setShowNotification] = useState(false);
    const [start, setstart] = useState(false)
    const [NotificationType, setNotificationType] = useState("info")
    const [NotificationMessage, setNotificationMessage] = useState("");
    const [showpage, setshowpage] = useState(false)
    const wpmRef = useRef(1)
    const accuracyref = useRef(10)
    const timerRef = useRef(null);
     const updateWpm = (newWpm,newaccuray) => {
        setWpm(newWpm);
        setAccuracy(newaccuray)
        wpmRef.current = newWpm;
        accuracyref.current = newaccuray
    };
    useEffect(() => {
        if (!auth) {
            setNotificationMessage("Please login first to start typing!");
            setShowNotification(true);
            setshowpage(false)
            router.push('/Login')
        }
        
    }, []);

    useEffect(() => {
        if (timer > 0 && isTyping && start) {
            if (timerRef.current) clearInterval(timerRef.current);

            setTimerDisplay(timer);

            timerRef.current = setInterval(() => {
                setTimerDisplay((prev) => {
                    console.log(prev);
                    if (prev <= 0) {
                        clearInterval(timerRef.current);
                        console.log("I'm Wpm from useeffect------>",wpmRef.current,accuracyref.current)
                        setstart(false)
                        handleEndTest(wpmRef.current,accuracyref.current);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [start]);

    const handleStartTest = async (wpm,accuracy) => {
        try {
            const token = localStorage.getItem("jwttoken");

            if (!token) {
                setNotificationMessage("Please login first to start typing!");
                setNotificationType("error");
                setShowNotification(true);
                setTimeout(() => router.push("/Login"), 2000);
                return;
            }

            const response = await axios.get(
                "https://typearcade-backend.onrender.com/test/starttest",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                console.log(response)
                setTargetText(response.data.mainText);
                setIsTyping(true);
                setWpm(1);
                setShowResults(false);
                setTimer(30);
            }
        } catch (error) {
            alert(error);
            console.log(
                "Error starting test:",
                error.response ? error.response.data : error.message
            );
        }
    };

    const handleEndTest = async (wpm,accuracy) => {
        try {
            const token = localStorage.getItem("jwttoken");
            setTargetText("");
            console.log("I'm wpm from handleendtest---->",wpm);
            if (!token) {
                setNotificationMessage("Please login first to Finish typing test!");
                setShowNotification(true);
                setTimeout(() => router.push("/Login"), 2000);
                return;
            }

            // if (accuracy < 0) {
            //     alert("Your accuracy is too low, you can't submit the test");
            //     return;
            // }

            const response = await axios.post(
                "https://typearcade-backend.onrender.com/test/submittest",
                { wpm, accuracy, duration: 30 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                console.log("Test submitted successfully:", response.data);
                setstart(false)
                setIsTyping(false);
                setanimationDuration(3);
                setShowResults(true);
                if (timerRef.current) clearInterval(timerRef.current);
            }
        } catch (error) {
            console.log(
                "Error ending test:",
                error.response ? error.response.data : error.message
            );
        }
    };

    return (
        <div className="overflow-hidden w-full h-screen flex flex-col bg-gradient-to-r from-blue-900 to-black relative">
            <Navbar />
            {showNotification && (
                <Notification
                    message={NotificationMessage}
                    onClose={() => setShowNotification(false)}
                />
            )}
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
                        <TypingBox
                            handleEndTest={handleEndTest}
                            updateWpm={updateWpm}
                            setanimationDuration={setanimationDuration}
                            setIsTyping={setIsTyping}
                            setAccuracy={setAccuracy}
                            target_text={targetText}
                            setstart = {setstart}
                            
                        />
                    )}

                    <button
                        onClick={handleEndTest}
                        className={`relative px-6 py-3 text-white font-bold border rounded-lg
              ${
                  isTyping ? "opacity-100" : "opacity-0"
              } hover:before:opacity-100 hover:before:blur-none hover:scale-105 `}
                    >
                        End Test
                    </button>
                </div>

                {/* Right Section */}
                <div className=" overflow-hidden w-full lg:w-1/2 flex flex-col items-center justify-center text-white gap-6">
                    <div
                        className={`w-full lg:w-1/2 p-6 ${
                            showResults
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95"
                        } transform transition-all duration-500 ease-out-back bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 border-2 border-gray-600 rounded-xl shadow-2xl overflow-hidden relative`}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-red-400">
                            Your Results
                        </h1>

                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 space-y-4 backdrop-blur-sm">
                            {/* WPM with speed indicator */}
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium text-gray-300">
                                        Words Per Minute
                                    </span>
                                    <span className="text-2xl font-bold text-white">
                                        {wpm}{" "}
                                        <span className="text-sm text-gray-400">
                                            WPM
                                        </span>
                                    </span>
                                </div>
                                <div className="mt-2 w-full bg-gray-700 rounded-full h-2.5">
                                    <div
                                        className="bg-gradient-to-r from-blue-400 to-purple-600 h-2.5 rounded-full"
                                        style={{
                                            width: `${Math.min(wpm / 2, 100)}%`,
                                        }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    {wpm < 30
                                        ? "Beginner"
                                        : wpm < 50
                                        ? "Intermediate"
                                        : wpm < 80
                                        ? "Advanced"
                                        : "Pro Typist"}
                                </p>
                            </div>

                            {/* Accuracy with visual indicator */}
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium text-gray-300">
                                        Accuracy
                                    </span>
                                    <span className="text-2xl font-bold text-white">
                                        {accuracy}%
                                    </span>
                                </div>
                                <div className="mt-2 w-full bg-gray-700 rounded-full h-2.5">
                                    <div
                                        className={`h-2.5 rounded-full ${
                                            accuracy > 90
                                                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                                                : accuracy > 70
                                                ? "bg-gradient-to-r from-yellow-400 to-amber-500"
                                                : "bg-gradient-to-r from-red-400 to-pink-500"
                                        }`}
                                        style={{ width: `${accuracy}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                                <span className="text-lg font-medium text-gray-300">
                                    Duration
                                </span>
                                <span className="text-xl font-semibold text-white">
                                    15 seconds
                                </span>
                            </div>

                            {/* Additional Stats */}
                            <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-gray-700">
                                <div className="text-center">
                                    <p className="text-sm text-gray-400">
                                        Characters
                                    </p>
                                    <p className="text-xl font-bold">
                                        {targetText.length}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-400">
                                        Keystrokes
                                    </p>
                                    <p className="text-xl font-bold">
                                        {Math.round(wpm * 5 * 0.25)}
                                    </p>
                                </div>
                            </div>

                            {/* Share Button */}
                            <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-95">
                                Share Your Results
                            </button>
                        </div>
                    </div>

                    {/* Timer Box */}
                    {isTyping && (
    <div className="absolute left-5 top-20  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 max-w-md mx-auto transition-all duration-300">
        <div className="flex items-center space-x-3">
            {/* Typing indicator dots */}
            <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            
            {/* Text and timer */}
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Someone is typing</p>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Time remaining:</span>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {timerDisplay}
                    </span>
                </div>
            </div>
            
            {/* Progress circle (optional) */}
            <div className="relative w-8 h-8">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                    />
                    <path
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                        strokeDashoffset={timerDisplay}
                    />
                </svg>
            </div>
        </div>
    </div>
)}

                    {/* Rocket Animation */}
                    {isTyping && (
                        <>
                            <img
                                className="space-animate w-40 absolute bottom-0 right-60 transform rounded-md"
                                src="/space1.png"
                                style={{
                                    animationDuration: `${animationDuration}s`,
                                }}
                                alt=""
                            />
                            <img
                                className="rocket-animate w-20 absolute bottom-1 right-60 transform rounded-md"
                                src="/vertical_rocket.png"
                                style={{
                                    animationDuration: `${animationDuration}s`,
                                }}
                                alt=""
                            />
                            <img
                                className="space-animate w-40 absolute bottom-0 right-20 transform rounded-md"
                                src="/space1.png"
                                style={{
                                    animationDuration: `${animationDuration}s`,
                                }}
                                alt=""
                            />
                            <img
                                className="space-animate w-40 absolute bottom-0 right-80 transform rounded-md"
                                src="/space1.png"
                                style={{
                                    animationDuration: `${animationDuration}s`,
                                }}
                                alt=""
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
