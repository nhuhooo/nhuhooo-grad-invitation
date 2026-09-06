"use client";

import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";

const playfairFont = Playfair_Display({ 
  subsets: ["vietnamese"], 
  weight: ["400", "600", "700"],
  style: ["normal", "italic"]
});

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center mt-8">
      {[
        { label: "Ngày", value: timeLeft.days },
        { label: "Giờ", value: timeLeft.hours },
        { label: "Phút", value: timeLeft.minutes },
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-white/90 backdrop-blur-sm w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg border border-pink-100 mb-3">
            <span className={`${playfairFont.className} text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800`}>
              {item.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className={`${playfairFont.className} text-sm sm:text-base uppercase tracking-widest text-white drop-shadow-md font-semibold`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
