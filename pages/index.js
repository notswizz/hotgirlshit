import Head from "next/head";
import { useState, useEffect, useRef } from "react";

const dadsImages = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg",
];

const fapImages = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg",
];

const apps = [
  {
    name: "fap bank",
    url: "https://fapbank.vercel.app/",
    tagline: "store · browse · create · rate",
    folder: "fap",
    images: fapImages,
    accent: "from-rose-500 to-pink-600",
    glow: "bg-rose-500",
  },
  {
    name: "onlydads",
    url: "https://onlydads.vercel.app/",
    tagline: "age gap erotica generations",
    folder: "dads",
    images: dadsImages,
    accent: "from-amber-400 to-orange-500",
    glow: "bg-amber-500",
  },
];

function getRandomImage(images, folder) {
  if (!images || images.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * images.length);
  return `/${folder}/${images[randomIndex]}`;
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [cardImages, setCardImages] = useState({
    "fap bank": null,
    "onlydads": null,
  });
  const [mounted, setMounted] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
      setIsMobile(mobile);
    };

    setCardImages({
      "fap bank": getRandomImage(fapImages, "fap"),
      "onlydads": getRandomImage(dadsImages, "dads"),
    });

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastMousePos.current.x, 2) +
        Math.pow(e.clientY - lastMousePos.current.y, 2)
      );

      if (distance > 120) {
        setCardImages({
          "fap bank": getRandomImage(fapImages, "fap"),
          "onlydads": getRandomImage(dadsImages, "dads"),
        });
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (Math.abs(window.scrollY - lastScrollY) > 20) {
        setCardImages({
          "fap bank": getRandomImage(fapImages, "fap"),
          "onlydads": getRandomImage(dadsImages, "dads"),
        });
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const handleTap = (appName) => {
    if (!isMobile) return;
    setCardImages(prev => ({
      ...prev,
      [appName]: appName === "fap bank" 
        ? getRandomImage(fapImages, "fap")
        : getRandomImage(dadsImages, "dads"),
    }));
  };

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

        {/* Noise texture overlay */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-20">
          {/* Header */}
          <header className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-white/30 text-[10px] md:text-xs tracking-[0.5em] uppercase mb-3">
              welcome to
            </p>
            <h1 className="font-display text-5xl md:text-7xl tracking-tight text-white mb-3">
              HOT GIRL SHIT
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-pink-500" />
              <span className="text-pink-500 text-xs">♦</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-500" />
            </div>
          </header>

          {/* Cards */}
          <div className={`grid md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {apps.map((app, index) => {
              const imageToShow = cardImages[app.name];

              return (
                <a
                  key={app.name}
                  href={app.url}
                  onClick={() => handleTap(app.name)}
                  className="group relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Image */}
                  {imageToShow && (
                    <img
                      src={imageToShow}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${app.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay`} />
                  
                  {/* Border glow on hover */}
                  <div className={`absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition-colors duration-500`} />
                  <div className={`absolute -inset-px rounded-2xl ${app.glow} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    {/* Title */}
                    <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl text-white mb-2 transition-transform duration-500 group-hover:translate-x-2`}>
                      {app.name.toUpperCase()}
                    </h2>
                    
                    {/* Tagline */}
                    <p className="text-white/50 text-sm md:text-base tracking-wide mb-6 transition-all duration-500 group-hover:text-white/70 group-hover:translate-x-2">
                      {app.tagline}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-3 transition-all duration-500 group-hover:translate-x-2">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-gradient-to-br ${app.accent} transition-all duration-500`}>
                        <svg className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <span className="text-white/40 text-xs tracking-[0.2em] uppercase group-hover:text-white/70 transition-colors duration-500">
                        enter
                      </span>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-br ${app.accent} opacity-60`} />
                </a>
              );
            })}
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
