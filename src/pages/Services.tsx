import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Film, Monitor, Music, Sparkles, TrendingUp, CheckCircle } from "lucide-react";
import Metadata from "@/components/Metadata";
import Aurora from "@/components/Aurora";
import RippleGrid from "@/components/RippleGrid";
import servicesVideo from "@/assets/services-video.jpg";
import servicesPhoto from "@/assets/services-photo.jpg";
import servicesAv from "@/assets/services-av.jpg";
import servicesEvents from "@/assets/services-events.jpg";

const services = [
  {
    icon: Film, title: "Film & Video Production", image: servicesVideo,
    description: "From corporate documentaries to promotional content, live streaming, and podcasts — we produce high-quality video that tells your story with cinematic precision.",
    features: ["Corporate videos & documentaries", "Event coverage & live streaming", "Promotional & social media content", "Podcast production", "Music videos & short films"],
  },
  {
    icon: Camera, title: "Professional Photography", image: servicesPhoto,
    description: "Expert photography services delivering sharp, well-composed images that preserve moments and strengthen brand identity.",
    features: ["Wedding & portrait photography", "Corporate & event photography", "Product & food photography", "Fashion & editorial shoots", "Real estate & architectural"],
  },
  {
    icon: Sparkles, title: "Events Management", image: servicesEvents,
    description: "End-to-end event production for conferences, weddings, board meetings, school events, and brand launches.",
    features: ["Corporate conferences & galas", "Wedding planning & coordination", "360° booth experiences", "Special effects & cold sparks", "Décor & stage design"],
  },
  {
    icon: Monitor, title: "Digital Screen Solutions", image: servicesAv,
    description: "LED screens, interactive displays, and projection mapping that transform any venue into an immersive visual experience.",
    features: ["LED screen rental & setup", "Interactive touch displays", "Projection mapping", "Digital signage solutions", "Video walls"],
  },
  {
    icon: Music, title: "Professional Audio Services",
    description: "Crystal-clear sound for any venue — from intimate meetings to large-scale outdoor events.",
    features: ["PA system rental & setup", "Wireless microphone systems", "Live audio mixing", "Studio recording", "Conference audio solutions"],
  },
  {
    icon: TrendingUp, title: "Marketing & Advertising",
    description: "Strategic campaigns that drive visibility, engagement, and measurable growth for your brand.",
    features: ["Social media campaigns", "Brand strategy & positioning", "Content marketing", "Digital advertising", "Influencer partnerships"],
  },
];

const Services = () => {
  return (
    <main>
      <Metadata
        title="Services - Mosi Media Solutions | Video Production, Photography & Events"
        description="Explore our comprehensive multimedia services: film & video production, professional photography, digital screen solutions, events management, audio services, and marketing. Based in Victoria Falls, Zimbabwe."
        keywords="video production, professional photography, events management, digital screens, audio services, marketing, Zimbabwe"
        ogUrl="https://mosimediasolutions.com/services"
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
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Services</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              End-to-End <span className="text-white">Media Solutions</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From concept to execution, we deliver comprehensive multimedia services tailored to your vision. Every service under one roof.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto space-y-20">
          {services.map((service, idx) => (
            <motion.div 
              key={service.title} 
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {service.image ? (
                 <div className={`rounded-lg overflow-hidden shadow-lg image-hover-reveal ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                   <img src={service.image} alt={service.title} loading="lazy" className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105 hover:brightness-110" />
                 </div>
              ) : (
                <div className={`rounded-lg bg-card border border-border h-80 flex items-center justify-center ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <service.icon className="w-20 h-20 text-primary/20" />
                </div>
              )}
              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <service.icon className="w-10 h-10 text-secondary mb-4" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                      <CheckCircle size={16} className="text-secondary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/contact" className="bg-gradient-red px-6 py-2.5 rounded-md text-sm font-semibold text-secondary-foreground hover:opacity-90 transition-opacity inline-block hover:bg-[#9B3030]" style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)" }}>
                    Inquire
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-center">
        <motion.div
          className="container mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Need a Custom Package?</h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
            We tailor our services to fit your exact needs. Tell us about your project and we'll create a bespoke solution.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/contact" className="bg-gradient-red px-8 py-3.5 rounded-md font-semibold text-secondary-foreground hover:opacity-90 transition-all inline-block hover:bg-[#9B3030]" style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)" }}>
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};

export default Services;
