"use client";
import { useState, useEffect, useRef } from "react";

export default function MultiTypingBox({ targetText, gameRunning, timeLeft, onFinish }) {
   const [input, setInput] = useState("");
  const textref = useRef();
  
  useEffect(() => {
    if (gameRunning && textref.current) {
      textref.current.focus();
    }
  }, [gameRunning]);

  useEffect(() => {
    if (!gameRunning) {
      if (input.length > 0) {
        const correctChars = input.split("")
          .filter((ch, i) => i < targetText.length && ch === targetText[i])
          .length;
      
        const accuracy = targetText.length > 0 
          ? (correctChars / targetText.length) * 100 
          : 0;

        const targetWords = targetText.trim().split(/\s+/);
        const typedWords = input.trim().split(/\s+/);
      
        let correctWords = 0;
        for (let i = 0; i < Math.min(typedWords.length, targetWords.length); i++) {
          if (typedWords[i] === targetWords[i]) {
            correctWords++;
          }
        }

        const wpm = (correctWords / 0.25) * (accuracy / 10); 

        onFinish?.(Math.round(wpm), Math.round(accuracy));
      }
    }
  }, [gameRunning]);

  useEffect(() => {
    if (!gameRunning) setInput("");
  }, [gameRunning]);

  const getCharColor = (index) => {
    if (index >= input.length) return "text-gray-400"; 
    return input[index] === targetText[index] ? "text-green-400" : "text-red-400";
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg border border-gray-700 w-[90vw] md:w-[40vw] min-h-[200px]">
      <div className="mb-2 text-lg text-gray-100 font-medium whitespace-pre-wrap">
        {targetText.split("").map((char, index) => (
          <span key={index} className={getCharColor(index)}>
            {char}
          </span>
        ))}
      </div>
      <textarea
        className="w-full h-24 bg-gray-800/90 p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-gray-100 placeholder-gray-500"
        value={input}
        onPaste={(e) => {
          e.preventDefault();
          alert("Pasting is not allowed here");
        }}
        ref={textref}
        onChange={(e) => setInput(e.target.value)}
        disabled={!gameRunning}
      />
      <div className="text-right mt-2 text-sm text-indigo-400 font-mono">
        Time Left: {timeLeft}s
      </div>
    </div>
  );
}