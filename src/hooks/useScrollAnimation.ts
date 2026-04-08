import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useScrollReveal = (
  selector: string,
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    start?: string;
    scrub?: boolean;
    toggleActions?: string;
  } = {}
) => {
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const {
      y = 50,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0.1,
      start = "top 80%",
      scrub = false,
      toggleActions = "play none none reverse",
    } = options;

    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) return;

    ctxRef.current = gsap.context(() => {
      gsap.from(elements, {
        scrollTrigger: {
          trigger: elements[0].closest("section") || elements[0],
          start,
          scrub,
          toggleActions,
        },
        y,
        opacity,
        duration,
        delay,
        stagger,
        ease: "power2.out",
      });
    });

    return () => {
      ctxRef.current?.revert();
    };
  }, [selector, JSON.stringify(options)]);

  return ctxRef;
};

export const useStaggerReveal = (
  containerSelector: string,
  childSelector: string,
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  } = {}
) => {
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const {
      y = 30,
      opacity = 0,
      duration = 0.6,
      stagger = 0.1,
      start = "top 80%",
    } = options;

    const container = document.querySelector(containerSelector);

    if (!container) return;

    ctxRef.current = gsap.context(() => {
      gsap.from(container.querySelectorAll(childSelector), {
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: "play none none reverse",
        },
        y,
        opacity,
        duration,
        stagger,
        ease: "power2.out",
      });
    }, container);

    return () => {
      ctxRef.current?.revert();
    };
  }, [containerSelector, childSelector, JSON.stringify(options)]);

  return ctxRef;
};