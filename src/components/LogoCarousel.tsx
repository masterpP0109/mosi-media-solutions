import { useEffect, useRef } from "react";
import gsap from "gsap";
const clientLogos = [
  { src: "/images/clientsLogos/moldon.webp", alt: "Moldon Marketing" },
  { src: "/images/clientsLogos/falls-hotel.webp", alt: "Victoria Falls Hotel" },
  { src: "/images/clientsLogos/stanbic.webp", alt: "Stanbic Bank" },
  { src: "/images/clientsLogos/zb1.webp", alt: "ZB Bank" },
  { src: "/images/clientsLogos/logistics.webp", alt: "Logistics Company" },
];

const LogoCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const width = el.scrollWidth / 2;

    gsap.to(el, {
      x: `-=${width}`,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % width),
      },
    });
  }, []);

  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex gap-20 w-max">
        {duplicatedLogos.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            className="h-16 object-contain rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;