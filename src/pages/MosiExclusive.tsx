import { ArrowRight, Heart, Camera, Sparkles, Wine, MapPin, Check, Star, PartyPopper, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Metadata from "@/components/Metadata";
import Aurora from "@/components/Aurora";
import RippleGrid from "@/components/RippleGrid";

const packages = [
  {
    name: "Intimate Rainforest Ceremony",
    price: "Romantic Experience",
    description: "A magical ceremony in the heart of Victoria Falls Rainforest",
    features: [
      "Rainforest ceremony location",
      "Professional photographer (4 hours)",
      "Digital photo gallery (100+ photos)",
      "Marriage officer & legal paperwork",
      "Bridal bouquet & boutonniere",
      "Champagne toast for two",
      "Romantic dinner reservation"
    ],
    popular: false
  },
  {
    name: "Corporate Functions",
    price: "Professional Events",
    description: "Conferences, galas, awards evenings, product launches, and team buildings",
    features: [
      "Full venue setup & styling",
      "Professional AV equipment & lighting",
      "Conference organization & scheduling",
      "Gala & awards evening production",
      "Year-end function planning",
      "Product launch event management",
      "Team building activities coordination",
      "Professional photography & videography",
      "Catering & bar services",
      "Live entertainment booking",
      "Guest accommodation coordination",
      "Transport & logistics management",
      "Branded staging & signage",
      "Dedicated event coordinator"
    ],
    popular: false
  },
  {
    name: "Weddings & Functions",
    price: "Complete Celebration",
    description: "Intimate ceremonies, vow renewals, engagements, and anniversaries in paradise",
    features: [
      "All Sunset Romance features",
      "Helicopter sunset flight for two",
      "Private island ceremony option",
      "Full-day professional photo & video team",
      "Reception dinner with private chef",
      "Live music entertainment",
      "5 nights luxury lodge accommodation",
      "Private safari experience",
      "Dedicated wedding coordinator",
      "All-inclusive airport transfers",
      "Professional hair & makeup artist",
      "Wedding cake & catering services",
      "Ceremony arch & floral arrangements",
      "Guest accommodation coordination"
    ],
    popular: true
  }
];

const inclusions = [
  { icon: Camera, title: "Professional Photography", desc: "High-resolution photos capturing every moment" },
  { icon: Sparkles, title: "Special Effects", desc: "Cold sparks, bubbles, or rose petals for your ceremony" },
  { icon: Heart, title: "Romantic Touches", desc: "Champagne, flowers, and personal touches included" },
  { icon: MapPin, title: "Stunning Locations", desc: "Rainforest, river, or sunset viewpoints" },
  { icon: Wine, title: "Fine Dining", desc: "Romantic dinners at premium Victoria Falls restaurants" },
  { icon: Star, title: "Luxury Accommodation", desc: "Stay at award-winning lodges and hotels" },
  { icon: PartyPopper, title: "Weddings and Celebrations", desc: "Complete coordination for your weddings, vow renewals, anniversaries, and corporate functions" },
  { icon: PartyPopper, title: "Vow Renewals & Anniversaries", desc: "Celebrate your love story with magical ceremonies" },
];

const MosiExclusive = () => {
  return (
  <main>
    <Metadata
       title="Mosi Special Elopements | Victoria Falls Wedding Packages"
      description="Experience the adventure of a lifetime with our exclusive Victoria Falls elopement packages. Intimate ceremonies, vow renewals, engagement parties, anniversaries, and luxury weddings in Africa's adventure capital."
      keywords="Victoria Falls elopement, wedding packages, intimate wedding, vow renewal, engagement party, anniversary celebration, luxury wedding Zimbabwe, rainforest ceremony"
      ogUrl="https://mosimediasolutions.com/mosi-exclusive"
    />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
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
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Victoria Falls Elopements</p>
            <h1 className="font-heading text-[40px] md:text-6xl font-[500] mb-6 text-transform capitalize" style={{ color: "#FFFFFF", textShadow: "5px 0px 8px #000000", lineHeight: "1.2em" }}>
              Say "I Do" in <span className="text-white">Paradise</span>
            </h1>
      <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "hsl(220 20% 80%)" }}>
        From intimate elopements to large corporate functions, we create unforgettable experiences in Africa's adventure capital. Weddings, vow renewals, galas, and conferences await.
      </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 neon-hover"
                  style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)", boxShadow: "0 2px 12px rgba(139,0,0,0.35)" }}
                >
                  Start Planning
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="#packages"
                  className="inline-flex items-center gap-2 border border-secondary px-6 py-3 rounded-full text-sm font-semibold text-secondary hover:bg-secondary/10 transition-all duration-300 neon-hover"
                >
                  View Packages
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Mosi Special */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Why Mosi Special</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Your Dream Elopement Awaits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We specialize in creating intimate, personalized wedding experiences that celebrate your love story in one of the world's most breathtaking destinations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inclusions.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <item.icon className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="section-padding bg-card">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Packages</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Choose Your Perfect Package</h2>
           <p className="text-muted-foreground max-w-2xl mx-auto">
               From intimate rainforest ceremonies to large corporate conferences, we offer the perfect event packages for your special occasions.
           </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                className={`relative bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  pkg.popular ? 'ring-2 ring-secondary scale-105' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-red text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-heading text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-secondary mb-2">{pkg.price}</div>
                  <p className="text-muted-foreground">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all ${
                      pkg.popular
                        ? 'bg-gradient-red text-secondary-foreground hover:opacity-90 hover:bg-[#9B3030]'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                    }`}
                    style={pkg.popular ? { background: "linear-gradient(135deg, #8B0000, #5C0000)" } : {}}
                  >
                    Book This Package
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Love Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from couples who chose Mosi Special for their weddings, vow renewals, anniversaries, and corporate functions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Emma & James",
                location: "United Kingdom",
                quote: "Our rainforest ceremony was absolutely magical! The team at Mosi Media made every moment special. The photos are breathtaking and capture the raw beauty of Victoria Falls."
              },
              {
                name: "Sophie & Michael",
                location: "South Africa",
                quote: "We couldn't have asked for a more perfect elopement. The helicopter flight at sunset was the highlight of our day. Truly an unforgettable experience!"
              },
              {
                name: "Lisa & Chen",
                location: "Australia",
                quote: "From the first email to the final goodbye, everything was handled with such care. Our Mosi Special package exceeded all our expectations!"
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
                <Heart className="w-10 h-10 text-secondary/30 mb-4" />
                <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t border-border pt-4">
                  <h4 className="font-heading text-lg font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Say "I Do"?</h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
            Let us help you create the elopement of your dreams. Contact us today to start planning your perfect Victoria Falls wedding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 neon-hover"
                style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)", boxShadow: "0 2px 12px rgba(139,0,0,0.35)" }}
              >
                Start Your Journey
                <ArrowRight size={20} />
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

export default MosiExclusive;
