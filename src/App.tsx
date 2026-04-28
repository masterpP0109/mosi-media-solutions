import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageTransition } from "@/lib/page-transition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ImageCarousel from "@/components/ImageCarousel";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Gallery from "./pages/Gallery";
import Blogs from "./pages/Blogs";
import Packages from "./pages/Packages";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MosiExclusive from "./pages/MosiExclusive";

const queryClient = new QueryClient();

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Preloader duration={1800} onComplete={() => setShowPreloader(false)} />
        <Toaster />
        <Sonner />
        <BrowserRouter>
           <ImageCarousel
            images={[
              { src: "/assets/hero-bg.jpg", alt: "Hero Background" },
              { src: "/assets/services-photo.jpg", alt: "Services" },
              { src: "/assets/about-team.jpg", alt: "About Team" },
              { src: "/assets/services-av.jpg", alt: "Audio Visual" },
              { src: "/assets/services-events.jpg", alt: "Events" },
              { src: "/assets/services-video.jpg", alt: "Video Production" }
            ]}
            autoPlay={true}
            interval={4000}
          />
          <Navbar />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mosi-exclusive" element={<MosiExclusive />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;