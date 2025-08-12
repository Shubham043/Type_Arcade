
"use client";

import { useEffect, useState } from "react";

export default function Notification({ message, type = "error", onClose }) {
  console.log("HII im notifcation")
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button 
          onClick={() => {
            setVisible(false);
            onClose();
          }} 
          className="ml-4 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
}