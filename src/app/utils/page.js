"use client";

import { useState, useEffect } from "react";

const TypingBox = ({ setWpm ,setanimationDuration, setIsTyping, setAccuracy,target_text}) => {
  const targetText = target_text;
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const maxDuration = 15000;
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  useEffect(() => {
    if (!startTime && input.length > 0) {
      setStartTime(Date.now()); 
    }

    if (startTime) {
      const elapsedTime = Date.now() - startTime; 

      if (elapsedTime > maxDuration) {
        let wrongWords = 0;
      
      for (let index = 0; index < targetText.length; index++) {
        if (input[index] !== targetText[index]) wrongWords++;
      }
      
      const calculatedAccuracy = Math.floor(((targetText.length - wrongWords) / targetText.length) * 100);
      setAccuracy(calculatedAccuracy);
      setIsTyping(false); 
        return;
      }

      const elapsedTimeInMinutes = elapsedTime / 60000; 
      const typedWords = input.trim().split(/\s+/).length;
      const currWpm = Math.floor(typedWords / elapsedTimeInMinutes);
      if(currWpm<=50) setanimationDuration(3);   
   if(currWpm>50) setanimationDuration(1.5);
   if(currWpm>60) setanimationDuration(1);
   if(currWpm>70) setanimationDuration(0.5);
   if(currWpm>80) setanimationDuration(0.3);
   if(currWpm>100) setanimationDuration(0.1);
      setWpm(currWpm)
    }
  }, [input]);

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Box for displaying the target text */}
      <div className="w-full max-w-2xl p-4 border rounded-lg bg-gray-100">
        <div className="text-xl font-mono whitespace-pre-wrap">
          {targetText.split("").map((char, index) => {
            const userChar = input[index];
            let className = "text-gray-400"; // Default color for untyped text

            if (index < input.length) {
              className = userChar === char ? "text-black" : "text-red-500";
            }

            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Box for typing */}
      <div className="w-full max-w-2xl">
        <textarea
          value={input}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 font-mono text-xl bg-white border rounded-lg focus:outline-none text-black"
          style={{
            resize: "none",
          }}
          placeholder="Type here..."
        />
      </div>
    </div>
  );
};

export default TypingBox;
