import Image from "next/image";
import { WindSong, Playfair_Display } from "next/font/google";
import MusicPlayer from "../components/MusicPlayer";
import CoverCountdown from "../components/CoverCountdown";
import FullPageScroller from "../components/FullPageScroller";
import EnvelopeSection from "../components/EnvelopeSection";
import GalleryMarquee from "../components/GalleryMarquee";
import { HeartCollage } from "../components/HeartCollage";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = ({ color = "text-white/70" }) => (
  <div className={`absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-50 ${color}`}>
    <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10" />
  </div>
);

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
        <section className="w-full h-[100dvh] shrink-0 relative flex items-center justify-center overflow-hidden shadow-lg">
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
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full py-16 sm:py-24 lg:py-32 pointer-events-none">
            <h1
              className={`
      ${playfairFont.className}
      flex flex-col
      justify-center
      items-center
      gap-4 md:gap-8 lg:gap-10
      uppercase
      text-[28vw]
      sm:text-[25vw]
      md:text-[20vw]
      lg:text-[11vw]
      leading-none
      text-white
      drop-shadow-xl
      font-bold
      tracking-tighter
      opacity-40
      text-center
    `}
            >
              <span>Class</span>
              <span>of</span>
              <span>2026</span>
            </h1>
          </div>
          <ScrollIndicator />
        </section>


        {/* ================= SLIDE 2 ================= */}
        <section className="w-full h-[100dvh] shrink-0 relative flex flex-col items-center justify-center bg-[#38040E]">
          <div className={`${windSongFont.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white my-1`}>
            A beautiful chapter is ending,
          </div>
          <div className={`${windSongFont.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white my-1`}>
            and a new adventure is about to begin.
          </div>
          <CoverCountdown />
          <ScrollIndicator color="text-white/50" />
        </section>
        {/* ================= SLIDE 3 ================= */}
        <section className="w-full h-[100dvh] shrink-0 relative flex items-center justify-center overflow-hidden bg-black">
          <GalleryMarquee />
          <ScrollIndicator color="text-white/50" />
        </section>

        {/* ================= SLIDE 4 ================= */}
        <section className="w-full h-[100dvh] shrink-0 relative flex flex-col items-center justify-center px-6 sm:px-8">
  <div className={`${windSongFont.className} text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl text-[#003153] mb-2 sm:mb-4 lg:mb-2 leading-relaxed text-center w-full max-w-4xl lg:-translate-y-4`}>
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
      "/h7.PNG",
      "/h8.jpg",
      "/h10.jpeg",
      "/h11.JPG",
      "/h13.jpeg",
      "/h12.jpeg",
      "/h14.jpeg",
    ]}
  />

  <ScrollIndicator color="text-[#003153]/50" />
</section>
        {/* ================= SLIDE 6 (ENVELOPE) ================= */}
        <section className="w-full h-[100dvh] shrink-0 flex flex-col items-center justify-center bg-[#fdfaf6] p-4">

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