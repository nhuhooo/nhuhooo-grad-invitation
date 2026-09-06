"use client";

import React, { useState, useEffect, useRef } from "react";
import { Music } from "lucide-react";

export default function MusicPlayer() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);

  const getAudioContext = () => {
    if (typeof window === "undefined") return null;
    try {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioContextRef.current = new AudioContextClass();
        }
      }
      const ctx = audioContextRef.current;
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }
      return ctx;
    } catch (e) {
      console.error("Failed to get/resume AudioContext:", e);
      return null;
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.5;

    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlayingMusic(true);
            cleanUpListeners();
          })
          .catch((err) => {
            console.log("Waiting for user interaction to autoplay audio...", err);
          });
      }
    };

    const handleUserInteraction = () => {
      startAudio();
      getAudioContext();
    };

    const cleanUpListeners = () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };

    startAudio();

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);
    window.addEventListener("scroll", handleUserInteraction, { passive: true });

    return () => {
      cleanUpListeners();
    };
  }, []);

  const togglePlayMusic = () => {
    if (!audioRef.current) return;
    getAudioContext();

    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play();
      setIsPlayingMusic(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={togglePlayMusic}
          className={`p-2.5 rounded-full border border-gray-300 transition-all hover:scale-110 cursor-pointer shadow-md ${
            isPlayingMusic
              ? "bg-black text-white border-[#0d6683]"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
          title={isPlayingMusic ? "Tắt nhạc" : "Bật nhạc"}
        >
          {isPlayingMusic ? (
            <div className="flex items-end gap-[3px] h-4 w-4 justify-center pb-[2px]">
              <span className="w-[2px] h-[100%] bg-white rounded-full animate-pulse" style={{ animationDuration: '0.8s' }} />
              <span className="w-[2px] h-[80%] bg-white rounded-full animate-pulse" style={{ animationDuration: '0.5s' }} />
              <span className="w-[2px] h-[60%] bg-white rounded-full animate-pulse" style={{ animationDuration: '1s' }} />
            </div>
          ) : (
            <Music className="w-4 h-4" />
          )}
        </button>
      </div>
    </>
  );
}
