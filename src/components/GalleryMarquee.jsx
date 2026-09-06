"use client";

import React from "react";
import { WindSong, Playfair_Display } from "next/font/google";

const windSongFont = WindSong({ subsets: ["vietnamese"], weight: ["400", "500"] });
const playfairFont = Playfair_Display({
  subsets: ["vietnamese"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"]
});

export default function GalleryMarquee() {
  const row1 = [
    "/1-1.jpeg",
    "/1-7.JPG",
    "/1-2.jpeg",
    "/1-4.jpeg",
    "/1-5.JPG",
  ];

  const row2 = [
    "/2-1.JPG",
    "/2-2.JPG",
    "/2-3.JPG",
    "/2-4.JPG",
    "/2-5.JPG",
    "/2-6.JPG",
    "/2-7.JPG"
  ];

  const renderRow = (images, reverse = false, isLandscape = false) => {
    // Kích thước dọc (Portrait) cho Row 1
    const portraitClasses = "w-40 h-56 sm:w-56 sm:h-72 md:w-72 md:h-96";
    // Kích thước ngang (Landscape) cho Row 2
    const landscapeClasses = "w-56 h-40 sm:w-72 sm:h-56 md:w-96 md:h-72";

    return (
      <div className={`flex w-max gap-4 sm:gap-6 md:gap-8 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {/* Nhân đôi danh sách ảnh để tạo hiệu ứng vòng lặp vô cực */}
        {[...images, ...images].map((src, i) => {
          const isScaled = src.includes("1-5") || src.includes("1-7");
          return (
            <div
              key={i}
              className={`relative ${isLandscape ? landscapeClasses : portraitClasses} rounded-xl overflow-hidden shrink-0 shadow-lg border-4 border-black`}
            >
              <img
                src={src}
                alt={`Gallery image ${i}`}
                className={`w-full h-full object-cover transition-transform duration-700 ${isScaled ? "scale-125 hover:scale-[1.35]" : "hover:scale-110"
                  }`}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden bg-black relative">

      {/* Marquee Container (nghiêng nhẹ để tạo cảm giác nghệ thuật) */}
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 -mt-6 md:-mt-12 transform -rotate-3 scale-110 md:scale-105 w-full relative">
        {renderRow(row1, false, false)}

        {/* Chữ GRADUATION nằm giữa line 2 hàng ảnh */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <h1 className={`${windSongFont.className} text-[18vw] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] text-white tracking-[0.02em] sm:tracking-[0.08em] drop-shadow-2xl mix-blend-overlay opacity-100 select-none translate-y-10 sm:translate-y-8 md:translate-y-10`}>
            Graduation
          </h1>
        </div>

        {renderRow(row2, true, true)}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
       
      `}</style>
    </div>
  );
}
