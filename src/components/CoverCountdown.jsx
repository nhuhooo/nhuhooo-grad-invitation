"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";

const playfairFont = Playfair_Display({ 
  subsets: ["vietnamese"], 
  weight: ["400", "600", "700"],
  style: ["normal", "italic"]
});

export default function CoverCountdown() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-10-03").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, mins: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown({ days, hours, mins });
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className="flex justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-12 py-12 select-none w-full max-w-6xl mx-auto">
      {[
        { label: "DAYS", val: countdown.days },
        { label: "HOURS", val: countdown.hours },
        { label: "MINUTES", val: countdown.mins },
      ].map((item, i) => (
        <div 
          key={i} 
          className="bg-white backdrop-blur-md shadow-xl border border-white/50 rounded-3xl w-20 sm:w-24 md:w-36 lg:w-48 py-5 sm:py-8 md:py-10 text-center hover:scale-105 transition-transform"
        >
          <span className={`${playfairFont.className} block text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-black leading-none`}>
            {String(item.val).padStart(2, "0")}
          </span>
          <span className={`${playfairFont.className} text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 tracking-widest mt-3 md:mt-4 block`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
