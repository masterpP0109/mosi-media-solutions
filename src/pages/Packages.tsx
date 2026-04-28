import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import Metadata from "@/components/Metadata";
import Aurora from "@/components/Aurora";
import RippleGrid from "@/components/RippleGrid";
import { PageTransition } from "@/lib/page-transition";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Package {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const packages: Package[] = [
  {
    name: "Social Media Management",
    price: "Monthly Service",
    description: "Complete social media strategy and content management",
    features: ["Content calendar", "Post creation", "Community management", "Monthly reports"],
    popular: true
  },
  {
    name: "Video Production Package",
    price: "Project-Based",
    description: "Professional video production from concept to delivery",
    features: ["Pre-production planning", "Filming & editing", "Post-production", "Final delivery"]
  },
  {
    name: "Corporate Events",
    price: "Custom Quote",
    description: "Full-service event management and production",
    features: ["Venue selection", "Event planning", "Production setup", "On-site management"]
  },
  {
    name: "Photography Services",
    price: "Per Session",
    description: "Professional photography for all occasions",
    features: ["Pre-shoot consultation", "Photo session", "Post-processing", "High-res delivery"]
  },
  {
    name: "Complete Brand Package",
    price: "Annual Retainer",
    description: "Comprehensive multimedia solutions for your brand",
    features: ["Video & photo production", "Social media management", "Event coverage", "Brand strategy"],
    popular: false
  },
  {
    name: "Elopement & Wedding",
    price: "Starting From",
    description: "Intimate wedding and elopement coverage",
    features: ["Full-day coverage", "Cinematic highlights", "Photo album", "Online gallery"]
  }
];

const Packages = () => {
  return (
    <>
      <Metadata 
        title="Our Packages - Mosi Media Solutions" 
        description="Explore our comprehensive range of multimedia service packages designed to elevate your brand"
      />
      <Aurora />
      <RippleGrid />
      
      <PageTransition>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge variant="secondary" className="mb-6">
                Our Service Packages
              </Badge>
              <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">
                Choose Your Perfect
                <span className="block text-secondary">Service Package</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We offer flexible packages designed to meet your multimedia needs, from social media management to full-scale event production.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="neon-hover">
                  Get a Custom Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="section-padding bg-background relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Packages</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Choose Your Package</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select from our carefully crafted service packages or contact us for a custom solution.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true }}
                >
                  <Card className={`relative h-full ${pkg.popular ? 'ring-2 ring-secondary shadow-xl' : ''}`}>
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-red text-secondary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-secondary">
                        {pkg.price}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{pkg.description}</p>
                      <div className="space-y-2">
                        {pkg.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <p className="text-muted-foreground mb-6">
                Need something custom? Contact us for a tailored package.
              </p>
              <Button size="lg" className="neon-hover">
                Get Custom Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-card relative">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Why Choose Us</p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Excellence in Every Package</h2>
                <p className="text-muted-foreground mb-8">
                  Our packages are designed with your success in mind. We combine creativity, technical expertise, and strategic thinking to deliver results that exceed expectations.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Award-Winning Quality</h4>
                      <p className="text-sm text-muted-foreground">Industry-recognized excellence</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Victoria Falls Based</h4>
                      <p className="text-sm text-muted-foreground">Local expertise, global standards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">24/7 Support</h4>
                      <p className="text-sm text-muted-foreground">Always here when you need us</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Transparent Pricing</h4>
                      <p className="text-sm text-muted-foreground">No hidden fees or surprises</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-0">
                  <CardContent className="pt-6">
                    <h3 className="font-heading text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
                    <p className="text-muted-foreground mb-6">
                      Let's discuss how we can bring your vision to life with our professional multimedia solutions and service packages.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1">
                        Contact Us Today
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Portfolio
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </PageTransition>
    </>
  );
};

export default Packages;