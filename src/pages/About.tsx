import { Eye, Target, CheckCircle, Users, Heart, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Metadata from "@/components/Metadata";
import Aurora from "@/components/Aurora";
import RippleGrid from "@/components/RippleGrid";
import aboutTeam from "@/assets/about-team.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const values = [
  { icon: Eye, title: "Vision", text: "To be a leading African media solutions company shaping how brands and destinations are experienced globally." },
  { icon: Target, title: "Mission", text: "To deliver innovative media, events, and communication solutions that drive visibility, engagement, and growth." },
];

const differentiators = [
  "Local expertise with global standards",
  "All-inclusive, end-to-end solutions",
  "Creative + strategic approach",
  "Reliable technical capacity",
  "Based in Victoria Falls — Africa's adventure capital",
  "Trusted by top brands and organisations",
];

const coreValues = [
  { icon: Lightbulb, title: "Innovation", text: "We stay ahead of industry trends, bringing fresh ideas and cutting-edge technology to every project." },
  { icon: Heart, title: "Passion", text: "Every project is a chance to create something extraordinary. We pour our hearts into the work." },
  { icon: Users, title: "Collaboration", text: "We work closely with our clients, treating their vision as our own and building lasting partnerships." },
];

const About = () => {
  return (
    <main>
      <Metadata
        title="About Mosi Media Solutions - Leading Multimedia Agency in Zimbabwe"
        description="Learn about Mosi Media Solutions, a premier multimedia agency based in Victoria Falls, Zimbabwe. We combine creativity, technology, and professionalism to deliver world-class media solutions across Africa."
        ogUrl="https://mosimediasolutions.com/about"
      />
      {/* Hero */}
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
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">About Us</p>
            <h1 className="font-heading text-[40px] md:text-6xl font-[500] mb-6 text-transform capitalize" style={{ color: "#FFFFFF", textShadow: "5px 0px 8px #000000", lineHeight: "1.2em" }}>
              Your Full-Service <span className="text-white">Multimedia Agency</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(220 20% 80%)" }}>
              Based in Victoria Falls, Zimbabwe — delivering world-class media, events, and communication solutions across Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Story</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Where Creativity Meets <span className="text-primary">Purpose</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Mosi Media Solutions is a Zimbabwe-based media and events company providing integrated communication solutions for brands, organisations, and destinations. We combine creativity, strategy, and technical excellence to deliver impactful experiences.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                From professional filming and photography to PA systems, microphones, LED screens, interactive displays, and special effects — we offer end-to-end media solutions under one roof. We specialise in conferences, weddings, board meetings, school events, podcasts, live streaming, and promotional content.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At Mosi Media Solutions, we ensure seamless execution, clear sound, stunning visuals, and memorable experiences. Whether you're hosting a corporate event, launching a brand, or celebrating a special moment — we deliver results that exceed expectations.
              </p>
            </motion.div>
            <motion.div 
              className="rounded-lg overflow-hidden shadow-xl image-hover-reveal"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={aboutTeam} alt="Mosi Media team at work" loading="lazy" width={1200} height={800} className="w-full h-auto object-cover interactive-image-soft" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, index) => (
              <motion.div 
                key={v.title} 
                className="bg-background rounded-lg p-10 border border-border hover:border-secondary/20 transition-all hover:shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <v.icon className="w-10 h-10 text-secondary mb-5" />
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">{v.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Values</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">What Drives Us</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((v, index) => (
              <motion.div 
                key={v.title} 
                className="text-center p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-padding bg-primary">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Why Choose Us</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-10">What Sets Us Apart</h2>
          </motion.div>
          <div className="space-y-4">
            {differentiators.map((d, index) => (
              <motion.div 
                key={d} 
                className="flex items-center gap-4 bg-primary-foreground/5 rounded-lg px-6 py-4 border border-primary-foreground/10"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground font-medium">{d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
