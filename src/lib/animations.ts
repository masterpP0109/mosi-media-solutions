import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const initGSAP = () => {
  ScrollTrigger.refresh();
};

export const cleanupGSAP = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};