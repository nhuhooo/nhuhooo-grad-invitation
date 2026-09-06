"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WindSong, Playfair_Display } from "next/font/google";
import InvitationModal from "./InvitationModal";

const windSongFont = WindSong({ subsets: ["vietnamese"], weight: ["400", "500"] });
const playfairFont = Playfair_Display({
  subsets: ["vietnamese"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"]
});

export default function EnvelopeSection({ to }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="relative mt-2 sm:mt-4 md:mt-8 w-[70vw] sm:w-[80vw] md:w-[85vw] max-w-[550px]">
        <svg viewBox="0 0 600 400" className="w-full h-auto drop-shadow-2xl rounded-sm" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow-top" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.15" />
            </filter>
            <filter id="shadow-bottom" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="-2" stdDeviation="3" floodColor="#000000" floodOpacity="0.06" />
            </filter>
          </defs>

          {/* Base back of envelope */}
          <rect x="0" y="0" width="600" height="400" fill="#5a6892" rx="4" />

          {/* Bottom flap */}
          <polygon points="0,400 300,200 600,400" fill="#5a6892" filter="url(#shadow-bottom)" />

          {/* Top flap */}
          <path d="M 0,0 L 600,0 L 600,40 L 320,280 Q 300,297 280,280 L 0,40 Z" fill="#5a6892" filter="url(#shadow-top)" />

          {/* Outer edge stroke */}
          <rect x="0" y="0" width="600" height="400" fill="none" stroke="#5a6892" strokeWidth="1" rx="4" />
        </svg>

        <button
          onClick={openModal}
          className="absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full hover:scale-105 transition-transform cursor-pointer group bg-transparent border-none outline-none"
        >
          <Image
            src="/seal.png"
            alt="Wax Seal"
            width={120}
            height={120}
            className="w-[25%] max-w-[150px] h-auto drop-shadow-2xl group-hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] transition-all"
          />
          <span className={`${playfairFont.className} mt-2 text-base sm:text-lg md:text-xl text-white group-hover:text-black transition-colors`}>
            Click to open
          </span>
        </button>
      </div>

      <InvitationModal isOpen={isModalOpen} onClose={closeModal} to={to} />
    </>
  );
}
