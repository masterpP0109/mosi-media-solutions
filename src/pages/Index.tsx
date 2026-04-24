import { ArrowRight, Play, Star, MapPin, Mail, Phone, Heart, Camera, Sparkles, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Metadata from "@/components/Metadata";
import Aurora from "@/components/Aurora";
import RippleGrid from "@/components/RippleGrid";
import LogoCarousel from "@/components/LogoCarousel";
import aboutTeam from "@/assets/about-team.jpg";

const Index = () => {
  return (
    <main>
      <Metadata
        title="Mosi Media Solutions | Professional Multimedia Agency Victoria Falls"
        description="Mosi Media Solutions - Your premier multimedia agency in Victoria Falls, Zimbabwe. Professional video production, photography, event coverage, and digital marketing services."
        ogUrl="https://mosimediasolutions.com"
      />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(139,0,0,0.15),transparent_50%),radial-gradient(ellipse_at_30%_70%,rgba(25,25,112,0.25),transparent_50%),#030508]" />
          <Aurora
            colorStops={["#050510","#161635","#8B0000"]}
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />
          <div className="absolute inset-0 border border-white/[0.06] rounded-[30%] pointer-events-none" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="backdrop-blur-md bg-white/[0.05] rounded-2xl p-8 md:p-10">
              <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-4">Mosi Media Solutions</p>
              <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight text-white" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                Where Vision Meets <span className="text-white">High-Definition</span> Reality
              </h1>
              <p className="text-xl mb-8 max-w-xl leading-relaxed text-[#0a0a1a] font-medium">
                We don't just produce content; we craft immersive multimedia experiences that define your brand's legacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 btn-glow neon-hover"
                  style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)", boxShadow: "0 4px 20px rgba(139,0,0,0.4)" }}
                >
                  Get a Quote
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#0a0a1a] hover:text-[#191970] transition-all duration-300 group"
                >
                  Explore Our Portfolio
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              </div>
            </motion.div>

            {/* Right Side - Media */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/10 to-accent/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/90 text-sm font-medium">Video Production Reel</p>
                </div>
              </div>
              {/* Parallax decoration */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">About Us</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Your Full-Service Multimedia Agency</h2>
              <p className="text-muted-foreground mb-6">
                Mosi Media Solutions is a Zimbabwe-based media and events company providing integrated communication solutions for brands, organisations, and destinations.
              </p>
              <p className="text-muted-foreground mb-8">
                From professional filming and photography to PA systems, LED screens, and special effects — we offer end-to-end media solutions under one roof.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg"
                >
                  Learn More About Us <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img src={aboutTeam} alt="Mosi Media team at work" loading="lazy" className="w-full h-auto object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">What We Do</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive multimedia solutions tailored to elevate your brand and create lasting impressions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Video Production", desc: "Professional filming, editing, and post-production for commercials, documentaries, and social media content." },
              { title: "Photography", desc: "High-quality corporate, product, and event photography that captures your brand's essence." },
              { title: "Event Coverage", desc: "Complete audio-visual solutions for conferences, weddings, and special events." }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-background p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow min-h-[220px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                >
                  <h3 className="font-heading text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg"
            >
              View All Services <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mosi Special */}
      <section className="section-padding bg-primary">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Special Packages</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6"><span className="text-white">Mosi Special</span> Elopements</h2>
              <p className="text-muted-foreground mb-6">
                Experience the adventure of a lifetime with our exclusive Victoria Falls elopement packages. Say "I do" in one of the world's most breathtaking destinations.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Intimate ceremony in the Rainforest",
                  "Professional photography & video",
                  "Romantic sunset dinner",
                  "Luxury accommodation included",
                  "Full wedding coordination"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-secondary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/mosi-exclusive"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 neon-hover"
                  style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)", boxShadow: "0 2px 12px rgba(139,0,0,0.35)" }}
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-card rounded-lg p-4 text-center">
                    <Camera className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <p className="text-sm font-medium">Photo & Video</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 text-center">
                    <Sparkles className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <p className="text-sm font-medium">Special Effects</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-center">
                  Create unforgettable memories with our bespoke elopement experience in Africa's adventure capital.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Work</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Showcasing our finest work in video production, photography, events, and brand development for leading companies across Africa.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Moldon Marketing Campaign", category: "Corporate Video", desc: "Complete video production and photography for a major regional marketing campaign. Included brand videos, social media content, and event documentation.", logo: "/images/clientsLogos/moldon.webp" },
              { title: "Victoria Falls Hotel", category: "Hospitality & Tourism", desc: "Comprehensive brand photography and video campaign showcasing the luxury hospitality experience, including promotional videos and print materials.", logo: "/images/clientsLogos/falls-hotel.webp" },
              { title: "Stanbic Bank Zimbabwe", category: "Corporate & Finance", desc: "Corporate event coverage for annual meetings and conferences, plus marketing content creation for digital platforms across the banking sector.", logo: "/images/clientsLogos/stanbic.webp" }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                className="group rounded-xl overflow-hidden bg-card border border-border hover:border-secondary/30 transition-all hover:shadow-lg min-h-[380px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-48 bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center p-6">
                  <img 
                    src={project.logo} 
                    alt={project.title} 
                    className="max-h-24 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity rounded-full"
                  />
                </div>
                <div className="p-6">
                  <span className="text-secondary text-xs uppercase tracking-wider font-medium">{project.category}</span>
                  <h3 className="font-heading text-xl font-semibold mt-2 mb-3">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg">
              View Full Portfolio <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Blogs Preview */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Latest Insights</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">From Our Blog</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest trends in multimedia, digital marketing, and creative solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: "The Future of Digital Marketing in Zimbabwe", category: "Digital Marketing", readTime: "5 min read" },
              { title: "Creating Impactful Video Content for African Brands", category: "Video Production", readTime: "7 min read" },
              { title: "Event Photography: Capturing the Perfect Moment", category: "Photography", readTime: "6 min read" }
            ].map((post, index) => (
              <motion.article 
                key={post.title}
                className="group bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow min-h-[280px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-40 bg-gradient-to-br from-secondary/20 to-accent/20" />
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-muted-foreground">{post.category}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <Link to="/blogs" className="inline-flex items-center gap-1 text-sm font-medium text-[#6B7B8C] group-hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-1 rounded">
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg">
              View All Posts <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Pricing</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Our Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our carefully crafted packages or let us create a custom solution for your needs.
            </p>
          </motion.div>

           <div className="grid md:grid-cols-3 gap-8 mb-12">
             {[
               { name: "Starter Package", price: "Small Business", desc: "Perfect for small businesses", features: 6 },
               { name: "Professional Package", price: "Growing Business", desc: "For growing businesses", popular: true, features: 9 },
               { name: "Enterprise Package", price: "Large Organization", desc: "Full-service solution", features: 10 }
             ].map((pkg, index) => (
              <motion.div
                key={pkg.name}
                className={`relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group min-h-[300px] ${
                  pkg.popular ? 'ring-2 ring-secondary' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-red text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="font-heading text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-2xl font-bold text-secondary mb-2">{pkg.price}</div>
                <p className="text-muted-foreground text-sm mb-4">{pkg.desc}</p>
                <div className="text-sm text-muted-foreground">{pkg.features} features included</div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/packages" className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg">
              View All Packages <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Why Choose Us</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Excellence in Every Project</h2>
              <p className="text-muted-foreground mb-8">
                With years of experience serving clients across Africa, we combine local expertise with international standards to deliver exceptional results.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Star, text: "Award-Winning Quality" },
                  { icon: MapPin, text: "Based in Victoria Falls" },
                  { icon: Mail, text: "Responsive Communication" },
                  { icon: Phone, text: "24/7 Support Available" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-secondary" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl p-8">
                <h3 className="font-heading text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
                <p className="text-muted-foreground mb-6">
                  Let's discuss how we can bring your vision to life with our professional multimedia solutions.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 neon-hover"
                    style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)", boxShadow: "0 2px 12px rgba(139,0,0,0.35)" }}
                  >
                    Contact Us Today
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Clients</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">We've Worked With</h2>
          </motion.div>

          <div className="opacity-80 overflow-hidden">
            <LogoCarousel />
          </div>

          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground mb-4">Want to join our family of successful brands?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#CD5C5C] hover:text-[#8B0000] transition-all duration-300 neon-hover"
            >
              Add Your Company to Our Success Story <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Testimonials</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We take pride in delivering exceptional results. Here's what our clients have to say about working with us.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Mitchell",
                role: "Marketing Director, Moldon Marketing",
                quote: "Mosi Media Solutions transformed our brand presence. Their video production quality is outstanding, and they delivered on time and within budget. Highly recommended!"
              },
              {
                name: "John & Emma Thompson",
                role: "Victoria Falls Wedding Clients",
                quote: "Our elopement was absolutely magical! The team captured every special moment beautifully. The rainforest ceremony was beyond our dreams."
              },
              {
                name: "David Mutapa",
                role: "CEO, ZB Bank",
                quote: "Professional, creative, and reliable. Mosi Media Solutions helped us create a brand film that truly represents our community values. Excellent work!"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Quote className="w-10 h-10 text-secondary/30 mb-4" />
                <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t border-border pt-4">
                  <h4 className="font-heading text-lg font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-primary text-center">
        <motion.div
          className="container mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Bring Your Vision to Life?</h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
            Let's discuss how we can help you create unforgettable multimedia experiences for your brand or event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 neon-hover"
                style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)", boxShadow: "0 2px 12px rgba(139,0,0,0.35)" }}
              >
                Get in Touch
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/portfolio"
                className="border border-primary-foreground text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-foreground/10 transition-all duration-300 neon-hover"
              >
                View Our Work
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Index;
