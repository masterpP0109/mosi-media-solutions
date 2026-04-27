import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ZoomIn, Film, Camera, Music, Sparkles } from "lucide-react";
import Metadata from "@/components/Metadata";
import Aurora from "@/components/Aurora";
import RippleGrid from "@/components/RippleGrid";
import { SkeletonCard } from "@/components/Skeleton";
import { useGalleryData } from "@/hooks/useGalleryData";
import { GalleryImage } from "@/types/gallery";

const iconComponents = {
  Film,
  Sparkles,
  Camera,
  Music
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [fallbackImages, setFallbackImages] = useState<GalleryImage[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { images, categories, loading, error } = useGalleryData(
    activeCategory === "All" ? undefined : activeCategory.toLowerCase()
  );

  // Image rotation effect - change images within cards every 1 minute
  useEffect(() => {
    if (images.length > 0) {
      // Show first 20 images initially with fixed card positions
      const initialImages = images.slice(0, 20);
      setDisplayedImages(initialImages);
      
      // Set up rotation interval - change images within same cards
      intervalRef.current = setInterval(() => {
        // Get all available images and shuffle them
        const shuffledImages = [...images].sort(() => 0.5 - Math.random());
        const newImages = shuffledImages.slice(0, 20);
        setDisplayedImages(newImages);
      }, 60000); // Change every 1 minute (60,000 milliseconds)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images]);

  // Fetch fallback images for error cases
  useEffect(() => {
    const fetchFallbackImages = async () => {
      try {
        const { getRandomImages } = await import('@/hooks/useDatabaseImages');
        const fallbacks = await getRandomImages(10); // Get 10 random images as fallbacks
        setFallbackImages(fallbacks);
      } catch (error) {
        console.error('Error fetching fallback images:', error);
      }
    };
    fetchFallbackImages();
  }, []);
  
  // Transform categories to include icons
  const categoryIcons = [
    { name: "All", icon: iconComponents.Film },
    { name: "Events", icon: iconComponents.Sparkles },
    { name: "Video", icon: iconComponents.Film },
    { name: "Photography", icon: iconComponents.Camera },
    { name: "Creative", icon: iconComponents.Music },
  ];
  
  // Get category icon
  const getCategoryIcon = (categoryName: string) => {
    const iconMap: Record<string, any> = {
      'All': iconComponents.Film,
      'Events': iconComponents.Sparkles,
      'Video': iconComponents.Film,
      'Photography': iconComponents.Camera,
      'Creative': iconComponents.Music,
      'Services': iconComponents.Film,
      'Portfolio': iconComponents.Camera,
      'Gallery': iconComponents.Music,
      'Other': iconComponents.Sparkles
    };
    return iconMap[categoryName] || iconComponents.Film;
  };
  
  // Filter available categories
  const availableCategories = ['All', ...categories].map(cat => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    icon: getCategoryIcon(cat.charAt(0).toUpperCase() + cat.slice(1))
  }));

  if (loading) {
    return (
      <main>
        <Metadata
          title="Gallery - Mosi Media Solutions"
          description="Browse our gallery"
          ogUrl="https://mosimediasolutions.com/gallery"
        />
        <section className="relative min-h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-[#030508]" />
          <div className="relative z-10 container mx-auto text-center px-6">
            <div className="space-y-4">
              <SkeletonCard className="w-32 h-4 mx-auto" />
              <SkeletonCard className="w-64 h-12 mx-auto" />
              <SkeletonCard className="w-96 h-6 mx-auto" />
            </div>
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[1, 2, 3, 4, 5].map((i) => (
                <SkeletonCard key={i} className="w-20 h-10 rounded-full" />
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <SkeletonCard key={i} className="rounded-lg" />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <Metadata
        title="Gallery - Mosi Media Solutions | Photo & Video Gallery"
        description="Browse our gallery of stunning photography and video work. Mosi Media Solutions - Victoria Falls, Zimbabwe."
        keywords="gallery, photos, videos, portfolio, Victoria Falls, Zimbabwe"
        ogUrl="https://mosimediasolutions.com/gallery"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(139,0,0,0.15),transparent_50%),radial-gradient(ellipse_at_30%_70%,rgba(25,25,112,0.25),transparent_50%),#030508]" />
          <Aurora
            colorStops={["#191970","#2F2F5F","#8B0000"]}
            blend={0.85}
            amplitude={1.1}
            speed={1.3}
          />
          <div className="absolute inset-0">
            <RippleGrid
              enableRainbow={false}
              gridColor="#8B0000"
              rippleIntensity={0.015}
              gridSize={10}
              gridThickness={8}
              mouseInteraction={true}
              mouseInteractionRadius={1.8}
              opacity={0.2}
              vignetteStrength={1.2}
              glowIntensity={0.03}
            />
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Gallery</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="text-gradient-brand">Visual Stories</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our collection ofcaptured moments and creative work. Each image tells a unique story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {availableCategories.map((cat, index) => (
              <motion.button
                key={`${cat.name}-${index}`}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.name
                    ? "bg-gradient-red text-secondary-foreground"
                    : "bg-card text-muted-foreground border border-border hover:border-secondary/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <cat.icon size={16} />
                {cat.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Diverse Bento Grid Layout - Small Spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 auto-rows-[300px]">
            <AnimatePresence mode="popLayout">
              {displayedImages.filter(image => activeCategory === "All" ? true : image.category === activeCategory.toLowerCase()).map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className={`
                    group relative overflow-hidden cursor-pointer rounded-xl
                    ${image.size === "small" ? "col-span-1 row-span-1" : ""}
                    ${image.size === "medium" ? "col-span-2 row-span-1" : ""}
                    ${image.size === "large" ? "col-span-2 row-span-2" : ""}
                    ${image.size === "wide" ? "col-span-3 row-span-1" : ""}
                    ${image.size === "tall" ? "col-span-1 row-span-2" : ""}
                    ${image.size === "extraWide" ? "col-span-4 row-span-1" : ""}
                    ${image.size === "extraTall" ? "col-span-1 row-span-3" : ""}
                  `}
                  onClick={() => setSelectedImage(image)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <img 
                      src={image.url} 
                      alt={image.title} 
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // Handle broken images by showing a fallback image from database
                        const target = e.target as HTMLImageElement;
                        if (fallbackImages.length > 0) {
                          // Use a random fallback image
                          const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                          target.src = randomFallback.url;
                          target.alt = randomFallback.title || 'Fallback image';
                        } else {
                          // If no fallback images available, show placeholder
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center bg-muted">
                                <div class="text-center">
                                  <svg class="w-12 h-12 mx-auto mb-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                  </svg>
                                  <p class="text-xs text-muted-foreground">Loading images...</p>
                                </div>
                              </div>
                            `;
                          }
                        }
                      }}
                      onLoad={(e) => {
                        // Ensure image is properly loaded and visible
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'block';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <ZoomIn size={20} className="text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-xs font-medium truncate">{image.title}</p>
                      <p className="text-white/70 text-xs">{image.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[
              { value: "500+", label: "Projects Completed" },
              { value: "50+", label: "Happy Clients" },
              { value: "10+", label: "Years Experience" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-card rounded-xl p-6 text-center border border-border hover:border-secondary/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-3xl font-bold text-secondary mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="bg-gradient-brand px-8 py-3.5 rounded-md font-semibold text-primary-foreground hover:opacity-90 transition-all inline-flex items-center gap-2 hover:bg-[#2F2F5F]" style={{ background: "linear-gradient(135deg, #191970, #2F2F5F)" }}>
                Start Your Project <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  className="w-full h-full object-contain max-h-[80vh]"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-semibold">{selectedImage.title}</h3>
                <p className="text-white/70">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Gallery;
