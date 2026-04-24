import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Metadata from "@/components/Metadata";
import Aurora from "@/components/Aurora";
import RippleGrid from "@/components/RippleGrid";
import servicesVideo from "@/assets/services-video.jpg";
import servicesPhoto from "@/assets/services-photo.jpg";
import servicesAv from "@/assets/services-av.jpg";
import servicesEvents from "@/assets/services-events.jpg";
import aboutTeam from "@/assets/about-team.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const categories = ["All", "Events", "Video", "Photography", "Corporate"];

const projects = [
  { title: "Moldon Marketing Product Campaign", category: "Corporate", image: servicesVideo, description: "Full video production and photography for Moldon Marketing's product range." },
  { title: "Afdis Hunters 660ml Product Launch", category: "Events", image: servicesEvents, description: "Event management and media coverage for African Distillers' product launch." },
  { title: "Kings Primary Speech & Prize Giving", category: "Events", image: servicesAv, description: "AV setup, photography, and live streaming for the annual school event." },
  { title: "Victoria Falls Destination Wedding", category: "Photography", image: servicesPhoto, description: "Intimate elopement photography in the Victoria Falls Rainforest." },
  { title: "Corporate Brand Film — ZB Bank", category: "Video", image: aboutTeam, description: "Cinematic brand film showcasing ZB Bank's community impact." },
  { title: "Tourism Victoria Falls Campaign", category: "Corporate", image: heroBg, description: "Destination marketing campaign for Victoria Falls tourism board." },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <main>
      <Metadata
        title="Portfolio - Mosi Media Solutions | Our Work in Video, Photography & Events"
        description="View our portfolio of multimedia projects including corporate videos, event photography, wedding coverage, and brand campaigns. Mosi Media Solutions - Victoria Falls, Zimbabwe."
        keywords="portfolio, video production, photography, events, corporate, weddings, Zimbabwe"
        ogUrl="https://mosimediasolutions.com/portfolio"
      />
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
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Work</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="text-white">Portfolio</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A selection of our work across events, film, photography, and branding. Each project tells a unique story.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-red text-secondary-foreground"
                    : "bg-card text-muted-foreground border border-border hover:border-secondary/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <motion.div 
                key={project.title} 
                className="group rounded-lg overflow-hidden bg-card border border-border hover:border-secondary/30 transition-all hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold text-sm border border-primary-foreground/30 px-4 py-2 rounded-md">View Project</span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-secondary text-xs uppercase tracking-wider font-medium">{project.category}</span>
                  <h3 className="font-heading text-lg font-semibold text-foreground mt-1 mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="bg-gradient-brand px-8 py-3.5 rounded-md font-semibold text-primary-foreground hover:opacity-90 transition-all inline-block hover:bg-[#2F2F5F]" style={{ background: "linear-gradient(135deg, #191970, #2F2F5F)" }}>
                Plan Your Event
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
