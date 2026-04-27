import { useEffect, useRef } from "react";
import gsap from "gsap";
const clientLogos = [
  { 
    src: "/images/clientsLogos/moldon.webp", 
    alt: "Moldon Marketing",
    url: "https://moldon.com" 
  },
  { 
    src: "/images/clientsLogos/falls-hotel.webp", 
    alt: "Victoria Falls Hotel",
    url: "https://www.victoriafallshotel.com/" 
  },
  { 
    src: "/images/clientsLogos/stanbic.webp", 
    alt: "Stanbic Bank",
    url: "https://www.stanbic.co.zw/" 
  },
  { 
    src: "/images/clientsLogos/zb1.webp", 
    alt: "ZB Bank",
    url: "https://www.zb.co.zw/" 
  },
  { 
    src: "/images/clientsLogos/logistics.webp", 
    alt: "Logistics Company",
    url: "https://lrtin.com/" 
  },
];

const LogoCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const width = el.scrollWidth / 2;

    const tween = gsap.to(el, {
      x: `-=${width}`,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % width),
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex gap-20 w-max">
        {duplicatedLogos.map((logo, i) => (
          <a
            key={i}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            aria-label={`Visit ${logo.alt}`}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-28 object-contain rounded-full transition-all duration-300 hover:scale-110 hover:filter hover:brightness-110 hover:drop-shadow-lg"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;