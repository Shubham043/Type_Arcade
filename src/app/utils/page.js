"use client";

import { useState } from 'react';

const TypingBox = () => {
  const textToType = 'The quick brown fox jumps over the lazy dog.';
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const renderText = () => {
    return textToType.split('').map((char, index) => {
      const userChar = input[index];
      let className = 'text-gray-400'; // Default color for untyped text

      if (char === ' ') {
        // If the character is a space, do not type on it
        return (
          <span key={index} className="text-transparent">
            {char}
          </span>
        );
      }

      if (index < input.length) {
        // If character typed is incorrect, make the original character red
        className = userChar === char ? 'text-black' : 'text-red-500';
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full max-w-2xl relative">
        {/* Display text overlay */}
        <div
          className="absolute w-full text-xl inset-0 p-3 whitespace-pre-wrap font-mono pointer-events-none"
          aria-hidden="true"
        >
          {renderText()}
        </div>

        {/* Textarea for typing */}
        <textarea
          value={input}
          onChange={handleChange}
          rows={3}
          className="w-full h-auto p-3 font-mono text-xl bg-transparent border rounded-lg focus:outline-none text-black"
          style={{
            resize: 'none',
          }}
        />
      </div>
    </div>
  );
};

export default TypingBox;
