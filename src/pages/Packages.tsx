import { Check, Star, ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Metadata from "@/components/Metadata";
import Aurora from "@/components/Aurora";
import RippleGrid from "@/components/RippleGrid";

const packages = [
  {
    name: "Starter Package",
    price: "Small Business",
    description: "Perfect for small businesses and startups looking to establish their online presence.",
    features: [
      "Professional logo design",
      "Basic website (5 pages)",
      "Social media setup (3 platforms)",
      "Business card design",
      "1 month support",
      "Basic SEO setup"
    ],
    popular: false,
    icon: Package
  },
  {
    name: "Professional Package",
    price: "Growing Business",
    description: "Comprehensive digital solution for growing businesses that need a strong brand presence.",
    features: [
      "Everything in Starter +",
      "Advanced website (up to 15 pages)",
      "Complete brand identity",
      "Social media management (6 months)",
      "Professional photography (1 session)",
      "Content creation (10 posts)",
      "Email marketing setup",
      "3 months support",
      "Advanced SEO optimization"
    ],
    popular: true,
    icon: Star
  },
  {
    name: "Enterprise Package",
    price: "Large Organization",
    description: "Full-service multimedia solution for established businesses and large organizations.",
    features: [
      "Everything in Professional +",
      "Custom web application",
      "Video production (3 videos)",
      "Event coverage & documentation",
      "Advanced analytics setup",
      "Multi-platform marketing campaign",
      "Crisis communication planning",
      "Dedicated account manager",
      "12 months support",
      "Priority response time"
    ],
    popular: false,
    icon: Check
  }
];

const addOns = [
  {
    name: "Video Production Add-on",
    price: "Video Services",
    description: "Professional video content for your marketing campaigns",
    features: ["Script writing", "Professional filming", "Editing & post-production", "Multiple formats"]
  },
  {
    name: "Photography Session",
    price: "Photo Services",
    description: "High-quality professional photography for your brand",
    features: ["2-hour session", "20+ edited photos", "Commercial usage rights", "Online gallery"]
  },
  {
    name: "Social Media Management",
    price: "Monthly Service",
    description: "Complete social media strategy and content management",
    features: ["Content calendar", "Post creation", "Community management", "Monthly reports"]
  },
  {
    name: "SEO Optimization",
    price: "Ongoing Service",
    description: "Improve your search engine rankings and visibility",
    features: ["Keyword research", "On-page optimization", "Monthly reporting", "Technical SEO"]
  }
];

const Packages = () => {
  return (
    <main>
      <Metadata
        title="Packages - Mosi Media Solutions | Service Packages & Pricing"
        description="Explore our comprehensive service packages designed to meet your multimedia and digital marketing needs. From starter packages to enterprise solutions."
        ogUrl="https://mosimediasolutions.com/packages"
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
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Packages</p>
            <h1 className="font-heading text-[40px] md:text-6xl font-[500] mb-6 text-transform capitalize" style={{ color: "#FFFFFF", textShadow: "5px 0px 8px #000000", lineHeight: "1.2em" }}>
              Choose Your <span className="text-white">Perfect Package</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(220 20% 80%)" }}>
              Tailored multimedia solutions designed to help your business grow and succeed in the digital landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Packages */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Service Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our carefully crafted packages or let us create a custom solution that perfectly fits your needs.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                className={`relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
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
                  <pkg.icon className={`w-12 h-12 mx-auto mb-4 ${pkg.popular ? 'text-secondary' : 'text-muted-foreground'}`} />
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
                    Get Started
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Add-ons */}
          <motion.div 
            className="bg-muted/50 rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-heading text-3xl font-bold mb-4">Popular Add-ons</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Enhance your package with these additional services to create the perfect solution for your business.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {addOns.map((addon, index) => (
                <motion.div 
                  key={addon.name} 
                  className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-heading text-xl font-bold mb-1">{addon.name}</h4>
                      <div className="text-2xl font-bold text-secondary">{addon.price}</div>
                    </div>
                    <Check className="w-6 h-6 text-secondary flex-shrink-0" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{addon.description}</p>
                  <ul className="space-y-2">
                    {addon.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-secondary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Custom Solutions */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-2xl p-8 md:p-12">
              <h3 className="font-heading text-3xl font-bold mb-4">Need a Custom Solution?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Don't see a package that fits your needs? We can create a custom solution tailored specifically to your business requirements and goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="bg-gradient-red px-8 py-3 rounded-lg font-semibold text-secondary-foreground hover:opacity-90 transition-all inline-block hover:bg-[#9B3030]"
                    style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)" }}
                  >
                    Discuss Custom Package
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/services"
                    className="border border-secondary px-8 py-3 rounded-lg font-semibold text-secondary hover:bg-secondary/10 transition-colors inline-block"
                  >
                    View All Services
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Packages;
