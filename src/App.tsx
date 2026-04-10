import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageTransition } from "@/lib/page-transition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassBackground from "@/components/GlassBackground";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Blogs from "./pages/Blogs";
import Packages from "./pages/Packages";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MosiExclusive from "./pages/MosiExclusive";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GlassBackground />
        <Navbar />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
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

export default App;
