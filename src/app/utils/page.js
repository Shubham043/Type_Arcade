"use client";

import { useState, useEffect } from "react";

const TypingBox = ({ updateWpm ,setanimationDuration, setIsTyping, setAccuracy,target_text,setstart }) => {
  if(!setanimationDuration) setanimationDuration = 0;
  
  
  const targetText = target_text + " Wonder why the sky turns orange at sunset when the air is filled with fine dust and water droplets the light from the sun scatters in a way that removes the shorter blue wavelengths leaving behind warm reds and oranges it is a beautiful reminder that even endings can be bright and peaceful much like how the end of a busy day can feel calm when you pause and watch the colors change above you"; 
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const maxDuration = 30000;

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  useEffect(() => {
    if (!startTime && input.length > 0) {
      setStartTime(Date.now()); 
      setstart(true);
    }
    if (startTime) {
      const elapsedTime = Date.now() - startTime; 
      //  console.log(elapsedTime)
     if (elapsedTime >= maxDuration) {
    let wrongChars = 0;
    const compareLength = input.length; // Only check up to what was typed
    console.log(compareLength)
    for (let index = 0; index < compareLength; index++) {
        if (input[index] !== targetText[index]) wrongChars++;
    }
    
    const accuracy = compareLength === 0 ? 0 : Math.floor(((compareLength - wrongChars) / compareLength) * 100);
    
    const typedChars = input.length;
    const typedWords = typedChars / 5;
    const elapsedTimeInMinutes = maxDuration / 60000;
    const wpm = Math.floor(typedWords / elapsedTimeInMinutes);
    
    console.log("Final WPM:", wpm, "Accuracy:", accuracy);
    
    setAccuracy(accuracy);
    updateWpm(wpm,accuracy);
    setIsTyping(false);
    return;
}
      
      const elapsedTimeInMinutes = elapsedTime / 60000; 
      const typedWords = input.trim().split(/\s+/).length;
      const currWpm = Math.floor(typedWords / elapsedTimeInMinutes);
      if(currWpm <= 40) setanimationDuration(3);   
      if(currWpm > 40) setanimationDuration(1.5);
      if(currWpm > 60) setanimationDuration(1);
      if(currWpm > 70) setanimationDuration(0.5);
      if(currWpm > 80) setanimationDuration(0.3);
      if(currWpm > 100) setanimationDuration(0.1);

      updateWpm(currWpm,0);
    }
  }, [input]);

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Box for displaying the target text */}
      <div className="w-full max-w-2xl p-4 border rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
        <div className="text-xl font-mono whitespace-pre-wrap text-white">
          {targetText.split("").map((char, index) => {
            const userChar = input[index];
            let className = "text-gray-300"; // Default color for untyped text

            if (index < input.length) {
              className = userChar === char ? "text-green-400" : "text-red-500";
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
          className="w-full p-4 font-mono text-xl bg-gradient-to-r from-gray-700 to-gray-900 border-2 border-transparent rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 text-white shadow-md transition-all duration-200 ease-in-out"
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
