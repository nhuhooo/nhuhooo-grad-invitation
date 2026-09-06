import Image from "next/image";
import { WindSong, Playfair_Display } from "next/font/google";
import MusicPlayer from "../components/MusicPlayer";
import CoverCountdown from "../components/CoverCountdown";
import FullPageScroller from "../components/FullPageScroller";
import EnvelopeSection from "../components/EnvelopeSection";
import GalleryMarquee from "../components/GalleryMarquee";
import { HeartCollage } from "../components/HeartCollage";

const windSongFont = WindSong({ subsets: ["vietnamese"], weight: ["400", "500"] });
const playfairFont = Playfair_Display({
  subsets: ["vietnamese"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"]
});

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const to = params?.to || "";
  return (
    <main className="relative font-sans text-center bg-[#fdfaf6]">
      <MusicPlayer />
      <FullPageScroller>

      {/* ================= SLIDE 1 ================= */}
      <section className="w-full h-screen shrink-0 relative flex items-center justify-center overflow-hidden shadow-lg">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-[center_70%]"
          style={{
            backgroundImage: "url('/eye.jpeg')",
            transform: "scale(1.15)"
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 z-0" />
        
        {/* Text Overlay on Image */}
        <div className="relative z-10 text-center w-full px-1 -translate-y-[35vh] md:-translate-y-[25vh]">
          <h1 className={`${playfairFont.className} text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] leading-none text-white drop-shadow-xl font-bold whitespace-nowrap tracking-tighter opacity-40`}>
            Class of 2026         
          </h1>
        </div>
      </section>


      {/* ================= SLIDE 2 ================= */}
      <section className="w-full h-screen shrink-0 flex flex-col items-center justify-center bg-[#38040E]">
         <div className={`${windSongFont.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white my-1`}>
            A beautiful chapter is ending, 
          </div>
          <div className={`${windSongFont.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white my-1`}>
             and a new adventure is about to begin. 
          </div>
        <CoverCountdown />
      </section>
      {/* ================= SLIDE 3 ================= */}
      <section className="w-full h-screen shrink-0 relative flex items-center justify-center overflow-hidden">
        <GalleryMarquee />
      </section>

      {/* ================= SLIDE 4 ================= */}
      <section className="w-full h-screen mt-10 shrink-0 items-center justify-center">
        <div
          className={`${windSongFont.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#003153] my-1 leading-relaxed`}
        >
          Thank you for walking by my side through every high and low of these past 4 years.
        </div>
        <HeartCollage 
          customPhotos={[
            "/h1.JPG",
            "/h2.jpeg",
            "/h3.JPG",
            "/h4.JPG",
            "/h5.jpeg",
            "/h6.jpeg",
            "/h7.png",
            "/h8.jpg",
            "/h10.jpeg", 
            "/h11.jpg",
            "/h13.jpeg",
            "/h12.jpeg",
            "/h14.jpeg",
          ]}
        />
      </section>

      {/* ================= SLIDE 6 (ENVELOPE) ================= */}
      <section className="w-full h-screen shrink-0 flex flex-col items-center justify-center bg-[#fdfaf6] pb-4 sm:pb-10 pt-16 sm:pt-0">
        
        {/* Div Text (Text Block) */}
        <div className="flex flex-col items-center gap-2 sm:gap-4 md:gap-8 text-gray-800 drop-shadow-sm px-4 max-w-4xl w-full">
          {/* Dear section */}
          <div className="flex flex-col md:flex-row items-center md:items-baseline">
            <span className={`${windSongFont.className} text-lg sm:text-xl md:text-2xl lg:text-3xl mr-2`}>To </span>
            <span className={`${windSongFont.className} text-lg sm:text-xl md:text-2xl lg:text-3xl text-black font-bold mt-1 md:mt-0 md:ml-2`}>
              {to} ,
            </span>
          </div>
        </div>
        <EnvelopeSection to={to} />
      </section>
      
      </FullPageScroller>
    </main>
  );
}