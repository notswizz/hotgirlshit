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
  },
  {
    name: "onlydads",
    url: "https://onlydads.vercel.app/",
    tagline: "age gap erotica generations",
    folder: "dads",
    images: dadsImages,
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
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Initialize images and detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
      setIsMobile(mobile);
    };

    // Set initial images
    setCardImages({
      "fap bank": getRandomImage(fapImages, "fap"),
      "onlydads": getRandomImage(dadsImages, "dads"),
    });

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop: change images on mouse movement
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastMousePos.current.x, 2) +
        Math.pow(e.clientY - lastMousePos.current.y, 2)
      );

      // Change images every 150px of mouse movement
      if (distance > 150) {
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

  // Mobile: change images on scroll
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

  const handleTap = (e, appName) => {
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

      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 text-center mb-20">
          <p className="text-pink-500/50 text-xs tracking-[0.4em] uppercase mb-4">
            welcome to
          </p>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight text-white">
            HOT GIRL SHIT
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-6" />
        </div>

        {/* App Links */}
        <div className="relative z-10 grid md:grid-cols-2 gap-8 w-full max-w-3xl">
          {apps.map((app) => {
            const imageToShow = cardImages[app.name];

            return (
              <a
                key={app.name}
                href={app.url}
                className="group relative border border-zinc-800/50 hover:border-pink-500/50 rounded-2xl p-10 py-32 transition-all duration-500 bg-zinc-950/50 backdrop-blur-sm hover:bg-zinc-900/50 overflow-hidden"
                onClick={(e) => handleTap(e, app.name)}
              >
                {/* Background image - always visible */}
                {imageToShow && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={imageToShow}
                      alt=""
                      className="w-full h-full object-cover opacity-70 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>
                )}

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <h2 className="font-display text-5xl text-white group-hover:text-pink-400 transition-colors duration-300">
                    {app.name.toUpperCase()}
                  </h2>

                  {app.tagline && (
                    <p className="text-zinc-500 mt-2 text-sm tracking-wide">
                      {app.tagline}
                    </p>
                  )}

                  {/* Arrow */}
                  <div className="mt-8 text-zinc-600 group-hover:text-pink-500 transition-colors">
                    <span className="text-xs tracking-widest uppercase">enter</span>
                    <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <p className="relative z-10 text-zinc-700 text-[10px] mt-24 tracking-[0.3em] uppercase">
          adults only · 18+
        </p>
      </main>
    </>
  );
}
