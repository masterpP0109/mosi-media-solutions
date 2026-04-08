import { useRef, useLayoutEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right";
  delay?: number;
  duration?: number;
  stagger?: number;
}

export const ScrollReveal = ({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  stagger = 0,
}: ScrollRevealProps) => {
  const elRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !elRef.current) return;

    const el = elRef.current;

    const animations: Record<string, object> = {
      "fade-up": { y: 40, opacity: 0 },
      "fade-in": { opacity: 0 },
      "scale-up": { scale: 0.9, opacity: 0 },
      "slide-left": { x: -40, opacity: 0 },
      "slide-right": { x: 40, opacity: 0 },
    };

    const fromProps = animations[animation];
    const hasStagger = stagger > 0 && el.parentElement?.querySelectorAll(":scope > *").length;

    const ctx = gsap.context(() => {
      if (hasStagger) {
        gsap.fromTo(
          el.children,
          fromProps,
          {
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration,
            delay,
            stagger,
            ease: "power2.out",
          }
        );
      } else {
        gsap.fromTo(
          el,
          fromProps,
          {
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration,
            delay,
            ease: "power2.out",
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [animation, delay, duration, stagger]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
};

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerGrid = ({ children, className = "", staggerDelay = 0.1 }: StaggerGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !gridRef.current) return;

    const grid = gridRef.current;
    const children = grid.children;

    if (children.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: staggerDelay,
          ease: "power2.out",
        }
      );
    }, grid);

    return () => ctx.revert();
  }, [staggerDelay]);

  return (
    <div ref={gridRef} className={className}>
      {children}
    </div>
  );
};