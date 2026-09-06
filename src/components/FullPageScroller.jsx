"use client";

import { useEffect, useRef, useState } from "react";

export default function FullPageScroller({ children }) {
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const currentIndex = useRef(0); // Dùng ref để đảm bảo event listener luôn lấy được giá trị mới nhất
  const [activeIndex, setActiveIndex] = useState(0); // Dùng state để trigger re-render cho CSS Transform

  useEffect(() => {
    const changeSlide = (direction) => {
      if (isScrolling.current) return;
      
      // Lấy thẻ con đầu tiên (inner wrapper) để đếm số lượng section liên tục (tránh lỗi khi hot reload)
      const innerContainer = containerRef.current.firstChild;
      const sectionsCount = Array.from(innerContainer.children).filter(child => child.tagName.toLowerCase() === 'section').length;

      let newIndex = currentIndex.current + direction;
      
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= sectionsCount) newIndex = sectionsCount - 1;

      if (newIndex !== currentIndex.current) {
        isScrolling.current = true;
        currentIndex.current = newIndex;
        setActiveIndex(newIndex);
        
        // Thời gian hồi chiêu 1.2s (đợi animation 1s hoàn tất + dư 0.2s)
        setTimeout(() => {
          isScrolling.current = false;
        }, 1200); 
      }
    };

    const handleWheel = (e) => {
      e.preventDefault(); 
      if (isScrolling.current) return;
      
      const deltaY = e.deltaY;
      if (Math.abs(deltaY) < 30) return;

      if (deltaY > 0) {
        changeSlide(1);
      } else if (deltaY < 0) {
        changeSlide(-1);
      }
    };

    let touchStartY = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault(); 
      if (isScrolling.current) return;

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) < 40) return;

      if (deltaY > 0) {
        changeSlide(1);
      } else if (deltaY < 0) {
        changeSlide(-1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-[100dvh] w-full overflow-hidden bg-[#fdfaf6] relative">
      {/* Wrapper thực hiện animation trượt */}
      <div 
        className="w-full h-full will-change-transform"
        style={{
          transform: `translateY(-${activeIndex * 100}dvh)`,
          transition: "transform 1s cubic-bezier(0.76, 0, 0.24, 1)"
        }}
      >
        {children}
      </div>
    </div>
  );
}
