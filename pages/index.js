import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";

const apps = [
  {
    name: "fap bank",
    url: "https://fapbank.vercel.app/",
    tagline: "store · browse · create · rate",
    accent: "from-rose-500 to-pink-600",
    bg: "bg-rose-500",
  },
  {
    name: "onlydads",
    url: "https://onlydads.vercel.app/",
    tagline: "age gap erotica generations",
    accent: "from-amber-400 to-orange-500",
    bg: "bg-amber-500",
  },
];

// Scattered positions for gallery images on desktop
const imagePositions = [
  { top: "5%", left: "3%", rotate: -12, size: "w-40 h-52" },
  { top: "8%", right: "5%", rotate: 8, size: "w-36 h-48" },
  { top: "25%", left: "8%", rotate: 6, size: "w-32 h-44" },
  { top: "20%", right: "12%", rotate: -15, size: "w-44 h-56" },
  { bottom: "30%", left: "2%", rotate: -8, size: "w-38 h-50" },
  { bottom: "25%", right: "3%", rotate: 12, size: "w-40 h-52" },
  { bottom: "8%", left: "10%", rotate: 15, size: "w-36 h-48" },
  { bottom: "5%", right: "8%", rotate: -6, size: "w-32 h-44" },
  { top: "45%", left: "1%", rotate: 10, size: "w-36 h-48" },
  { top: "50%", right: "1%", rotate: -10, size: "w-38 h-50" },
];

async function fetchGalleryImages() {
  try {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    return data.images || [];
  } catch (err) {
    console.error("Failed to fetch images:", err);
    return [];
  }
}

export default function Home() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Only fetch images for desktop
    if (window.innerWidth >= 768) {
      fetchGalleryImages().then(setGalleryImages);
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Head>
        <title>hot girl shit</title>
        <meta name="description" content="directory of degeneracy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="fixed inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Scattered Gallery - Desktop Only */}
        {!isMobile && galleryImages.length > 0 && (
          <div className="fixed inset-0 pointer-events-none">
            {galleryImages.map((url, i) => {
              const pos = imagePositions[i % imagePositions.length];
              return (
                <div
                  key={i}
                  className={`absolute ${pos.size} rounded-lg overflow-hidden shadow-2xl opacity-0 transition-all duration-1000`}
                  style={{
                    top: pos.top,
                    bottom: pos.bottom,
                    left: pos.left,
                    right: pos.right,
                    transform: `rotate(${pos.rotate}deg)`,
                    opacity: mounted ? 0.7 : 0,
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <Image
                    src={url}
                    alt=""
                    fill
                    sizes="200px"
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              );
            })}
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
          {/* Header */}
          <header className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-white/30 text-[10px] md:text-xs tracking-[0.5em] uppercase mb-3">
              welcome to
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-white mb-3">
              HOT GIRL SHIT
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-pink-500" />
              <span className="text-pink-500 text-xs">♦</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-500" />
            </div>
          </header>

          {/* Buttons */}
          <div className={`flex flex-col md:flex-row gap-4 md:gap-6 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {apps.map((app, index) => (
              <a
                key={app.name}
                href={app.url}
                className={`group relative px-8 py-6 md:px-12 md:py-8 rounded-2xl border border-white/10 backdrop-blur-sm bg-black/40 hover:bg-black/60 transition-all duration-500 hover:border-white/30 hover:scale-105`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-1 rounded-2xl ${app.bg} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                
                <div className="relative text-center">
                  <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl text-white mb-2 bg-gradient-to-r ${app.accent} bg-clip-text group-hover:text-transparent transition-all duration-500`}>
                    {app.name.toUpperCase()}
                  </h2>
                  <p className="text-white/40 text-xs md:text-sm tracking-wider group-hover:text-white/60 transition-colors duration-500">
                    {app.tagline}
                  </p>
                </div>

                {/* Arrow */}
                <div className="absolute top-1/2 -right-3 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Footer */}
          <footer className={`mt-12 md:mt-16 text-center transition-all duration-1000 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase">
              18+ adults only
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
