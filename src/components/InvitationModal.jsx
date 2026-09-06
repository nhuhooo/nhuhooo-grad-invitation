"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { WindSong, Playfair_Display } from "next/font/google";
import { X } from "lucide-react";

const windSongFont = WindSong({
  subsets: ["vietnamese"],
  weight: ["400", "500"],
});

const playfairFont = Playfair_Display({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export default function InvitationModal({ isOpen, onClose, to }) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mount portal
  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  // Handle open / close animation + body scroll
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);

      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!mounted || (!isOpen && !isVisible)) {
    return null;
  }

  return createPortal(
    <div
      className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        font-sans text-center
        transition-opacity duration-500
        ${isOpen ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* ================= CLOSE BUTTON ================= */}
      <button
        onClick={onClose}
        aria-label="Close invitation"
        className="
          absolute top-4 right-4
          sm:top-6 sm:right-6
          z-[10000]
          p-2
          rounded-full
          bg-black/20
          text-white/70
          backdrop-blur-md
          transition-all duration-300
          hover:bg-black/40
          hover:text-white
          cursor-pointer
        "
      >
        <X className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* ================= INVITATION PAPER ================= */}
      <div
        className={`
          relative
          w-[92vw]
          max-w-[480px]
          h-[88vh]
          sm:h-[90vh]
          md:h-auto
          md:aspect-[3/4.2]

          rounded-sm
          overflow-hidden
          shadow-2xl

          bg-cover
          bg-center
          bg-no-repeat

          transition-all
          duration-700
          ease-out

          ${isOpen
            ? "translate-y-0 scale-100"
            : "translate-y-12 scale-95"
          }
        `}
        style={{
          backgroundImage: "url('/letter.png')",
        }}
      >


        {/* ================= SCROLL AREA ================= */}
        <div
          className="
            relative z-10
            w-full h-full
            overflow-y-auto
            custom-scrollbar
            px-5 py-8
            sm:px-8 sm:py-10
          "
        >
          {/* ================= INNER CARD ================= */}
          <div
            className="
              min-h-full
              flex items-center justify-center
            "
          >
            <div
              className="
                w-[94%]
                sm:w-[88%]
                md:w-[82%]

                px-5 py-8
                sm:px-7 sm:py-9
                md:px-10 md:py-10
                rounded-xl
                text-[#5b6a7a]
              "
            >
              {/* ================= HEADER ================= */}
              <div
                className="
                  flex flex-col
                  items-center
                  gap-3
                  sm:gap-4
                  md:gap-5
                  text-gray-800
                  drop-shadow-sm
                "
              >
                {/* You are invited to */}
                <div
                  className={`
                    ${playfairFont.className}
                    text-[10px]
                    sm:text-xs
                    md:text-sm
                    lg:text-base

                    uppercase
                    tracking-[0.18em]
                    sm:tracking-[0.25em]

                    mt-5
                  `}
                >
                  You are invited to
                </div>

                {/* Name */}
                <div
                  className={`
                    ${windSongFont.className}
                    text-lg
                    sm:text-xl
                    md:text-2xl
                    lg:text-2xl
                    text-black
                    leading-none
                    my-1
                  `}
                >
                  Hồ Ngọc Như's
                </div>

                {/* Graduation Ceremony */}
                <div
                  className={`
    ${playfairFont.className}
    text-xs
    sm:text-sm
    md:text-base
    lg:text-lg
    uppercase
    tracking-[0.15em]
    sm:tracking-[0.22em]
    whitespace-nowrap
  `}
                >
                  Graduation Ceremony
                </div>
              </div>


              {/* ================= DATE ================= */}
              <div
                className="
                  flex
                  flex-row
                  items-center
                  justify-center
                  gap-3
                  sm:gap-5
                  md:gap-6

                  w-full
                  my-7
                  sm:my-9
                "
              >
                {/* Day */}
                <div
                  className="
                    flex flex-col
                    items-center justify-center

                    border-y
                    border-[#5b6a7a]/40

                    py-3
                    sm:py-4

                    w-[72px]
                    sm:w-[90px]
                  "
                >
                  <span
                    className={`
                      ${playfairFont.className}
                      uppercase
                      tracking-[0.08em]
                      sm:tracking-[0.15em]

                     text-[25px]
                      sm:text-[28px]


                      font-bold
                    `}
                  >
                    Sat
                  </span>
                </div>

                {/* Date */}
                <div className="flex flex-col items-center justify-center min-w-[70px]">
                  <span
                    className={`
                      ${playfairFont.className}
                      uppercase
                      tracking-[0.15em]

                      text-[18px]
                      sm:text-[14px]

                      font-bold
                      mb-1
                    `}
                  >
                    October
                  </span>

                  <span
                    className={`
                      ${playfairFont.className}
                      text-5xl
                      sm:text-6xl

                      font-bold
                      leading-none

                      text-[#4a5868]
                    `}
                  >
                    03
                  </span>

                  <span
                    className={`
                      ${playfairFont.className}
                      uppercase
                      tracking-[0.15em]

                      text-[24px]
                      sm:text-[28px]

                      font-bold
                      mt-1
                    `}
                  >
                    2026
                  </span>
                </div>

                {/* Time */}
                <div
                  className="
                    flex flex-col
                    items-center justify-center

                    border-y
                    border-[#5b6a7a]/40

                    py-3
                    sm:py-4

                    w-[72px]
                    sm:w-[90px]
                  "
                >
                  <span
                    className={`
                      ${playfairFont.className}
                      uppercase
                      tracking-[0.08em]
                      sm:tracking-[0.12em]

                      text-[25px]
                      sm:text-[28px]

                      font-bold
                    `}
                  >
                    16:30
                  </span>
                </div>
              </div>

              {/* ================= LOCATION ================= */}
              <div
                className="
                  flex flex-col
                  items-center

                  gap-2

                  text-center
                  w-full

                  mt-6
                  sm:mt-8
                "
              >
                <div
                  className={`
                    ${playfairFont.className}
                    uppercase

                    tracking-[0.15em]
                    sm:tracking-[0.2em]

                    font-bold

                    text-xs
                    sm:text-sm
                  `}
                >
                  UEH Campus A
                </div>

                <div
                  className={`
                    ${playfairFont.className}
                    uppercase

                    tracking-[0.1em]
                    sm:tracking-[0.15em]

                    text-[9px]
                    sm:text-[10px]

                    font-medium
                  `}
                >
                  59C Nguyễn Đình Chiểu, Phường Xuân Hòa, TP. Hồ Chí Minh
                </div>
              </div>

              {/* ================= RSVP ================= */}
              <div
                className="
                  flex flex-col
                  items-center


                  text-center

                  sm:mt-6
                "
              >




                <div
                  className={`
                    ${windSongFont.className}

                    tracking-[0.08em]

                    text-[20px]
                    sm:text-[16px]

                    mt-2
font-semibold
                    max-w-[220px]

                  `}
                >
                  Your presence would mean a lot to me                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>,
    document.body
  );
}