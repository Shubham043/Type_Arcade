"use client";
import { useState, useEffect } from "react";

export default function MultiTypingBox({ targetText, gameRunning, timeLeft, onFinish }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!gameRunning) {
      if (input.length > 0) {
        const words = input.trim().split(/\s+/).length;
        const wpm = (words / 15) * 60;
        const correctChars = input.split("").filter((ch, i) => ch === targetText[i]).length;
        const accuracy = (correctChars / targetText.length) * 100;
        onFinish?.(Math.round(wpm), accuracy);
      }
    }
  }, [gameRunning]);

  useEffect(() => {
    if (!gameRunning) setInput("");
  }, [gameRunning]);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg border border-gray-700 w-[90vw] md:w-[40vw] min-h-[200px]">
      <p className="mb-2 text-lg text-gray-100 font-medium">{targetText}</p>
      <textarea
        className="w-full h-24 bg-gray-800/90 p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-gray-100 placeholder-gray-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={!gameRunning}
      />
      <div className="text-right mt-2 text-sm text-indigo-400 font-mono">
        Time Left: {timeLeft}s
      </div>
    </div>
  );
}