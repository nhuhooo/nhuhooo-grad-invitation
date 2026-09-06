"use client";

import React from "react";
import { Heart } from "lucide-react";

// Lưới 5x5 tạo thành hình trái tim hoàn hảo. 13 tấm ảnh bọc ngoài, Badge ở giữa bằng 3 ô (3x1).
const HEART_GRID = [
  // Row 0
  [
    { type: "blank" },
    { type: "image", index: 0 },
    { type: "blank" },
    { type: "image", index: 1 },
    { type: "blank" }
  ],
  // Row 1
  [
    { type: "image", index: 2 },
    { type: "image", index: 3 },
    { type: "image", index: 4 },
    { type: "image", index: 5 },
    { type: "image", index: 6 }
  ],
  // Row 2
  [
    { type: "image", index: 7 },
    { type: "badge" },
    { type: "skip" },
    { type: "skip" },
    { type: "image", index: 8 }
  ],
  // Row 3
  [
    { type: "blank" },
    { type: "image", index: 9 },
    { type: "image", index: 10 },
    { type: "image", index: 11 },
    { type: "blank" }
  ],
  // Row 4
  [
    { type: "blank" },
    { type: "blank" },
    { type: "image", index: 12 },
    { type: "blank" },
    { type: "blank" }
  ]
];

export const HeartCollage = ({
    customPhotos = [],
}) => {
    let imageCounter = 0;
    return (
        <div className="flex flex-col items-center justify-center min-h-[90dvh] py-6 relative select-none w-full bg-[#fdfaf6] overflow-hidden">
            
            <style>{`
                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    14% { transform: scale(1.08); }
                    28% { transform: scale(1); }
                    42% { transform: scale(1.1); }
                    70% { transform: scale(1); }
                }
                .animate-heartbeat {
                    animation: heartbeat 4s ease-in-out infinite;
                }
            
               
            `}</style>

            
            {/* HEART GRID MAIN CONTAINER */}
            <div className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[480px] lg:max-w-[600px] px-2 sm:px-4 py-2 sm:py-6 flex justify-center relative mx-auto z-10">
                <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-3 w-full relative select-none  origin-center">
                    {HEART_GRID.map((row, rIdx) =>
                        row.map((cell, cIdx) => {
                            // Bỏ qua các ô bị lấn bởi Badge
                            if (cell.type === "skip") return null;

                            // Ô trống
                            if (cell.type === "blank") {
                                return <div key={`blank-${rIdx}-${cIdx}`} className="aspect-square bg-transparent pointer-events-none" />;
                            }

                            // Ô Logo trung tâm (Chiếm 3 cột, 1 hàng = 3 ô)
                            if (cell.type === "badge") {
                                return (
                                    <div
                                        key="heart-badge"
                                        className="col-span-3 row-span-1 flex items-center justify-center z-10 p-0.5 select-none"
                                    >
                                        <div className="bg-transparent rounded-xl p-2 sm:p-4 text-center transform hover:scale-105 transition duration-300 w-full h-full flex flex-row sm:flex-col justify-center items-center gap-2 sm:gap-1">
                                            <div className="animate-pulse">
                                                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-400 fill-red-400 shrink-0 animate-heartbeat origin-center" />
                                            </div>
                                            <span className="text-sm sm:text-base md:text-lg text-gray-500 font-black tracking-widest leading-none whitespace-nowrap">2022-2026</span>
                                        </div>
                                    </div>
                                );
                            }

                            // Ô Hình ảnh
                            const currentIdx = imageCounter++;
                            const photo = currentIdx < customPhotos.length ? customPhotos[currentIdx] : null;

                            let customTransform = '';
                            if (photo) {
                                const p = photo.toLowerCase();
                                if (p.includes('h12')) customTransform = 'scale-[1.2] translate-x-[8%]';
                                if (p.includes('h10')) customTransform = 'scale-[1.5]';
                                if (p.includes('h11')) customTransform = 'scale-[1.3]';


                            }

                            return (
                                <div
                                    key={`cell-${currentIdx}`}
                                    className="aspect-square relative rounded-xl overflow-hidden shadow-md border-2 border-white z-20 hover:scale-110 hover:z-30 transition-transform duration-300"
                                >
                                    {photo ? (
                                        <img
                                            alt="kỷ niệm"
                                            src={photo}
                                            className={`w-full h-full object-cover ${customTransform}`}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-pink-50 flex items-center justify-center border-2 border-dashed border-pink-200">
                                            <Heart className="w-4 h-4 text-pink-200" />
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            
        </div>
    );
};
