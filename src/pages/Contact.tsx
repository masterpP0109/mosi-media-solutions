import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import Metadata from "@/components/Metadata";
import Aurora from "@/components/Aurora";
import RippleGrid from "@/components/RippleGrid";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll be in touch soon.");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <main className="pt-16">
      <Metadata
        title="Contact Mosi Media Solutions - Get in Touch for Your Multimedia Project"
        description="Contact Mosi Media Solutions for professional multimedia services. Located in Victoria Falls, Zimbabwe. Email: info@mosimediasolutions.com | Phone: +263 78 811 1391"
        keywords="contact, multimedia agency, Victoria Falls, Zimbabwe, email, phone"
        ogUrl="https://mosimediasolutions.com/contact"
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
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Get In Touch</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="text-white">Let's Create Something</span> <span className="text-white">Amazing</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to start your project? Reach out and let's bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {[
                 { icon: Mail, label: "Email", value: "info@mosimediasolutions.com", href: "mailto:info@mosimediasolutions.com" },
                 { icon: Phone, label: "Phone", value: "+263 78 811 1391", href: "tel:+263788111391" },
                 { icon: MapPin, label: "Location", value: "Victoria Falls, Zimbabwe" },
                 { icon: Clock, label: "Hours", value: "Mon – Sat: 8am – 6pm" },
                 { icon: MessageSquare, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/263788111391" },
              ].map((item, index) => (
                <motion.div 
                  key={item.label} 
                  className="bg-card rounded-lg p-6 border border-border hover:border-secondary/20 transition-all glass-interactive neon-hover"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <item.icon className="w-6 h-6 text-secondary mb-3" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-foreground font-medium text-sm hover:text-secondary transition-colors neon-hover">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-foreground font-medium text-sm">{item.value}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="bg-card rounded-lg p-8 border border-border space-y-5 glass-interactive">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Send Us a Message</h3>
                <p className="text-muted-foreground text-sm mb-4">Fill in the form below and we'll get back to you within 24 hours.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors glass" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Email</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors glass" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors glass" placeholder="+263..." />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Service</label>
                    <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground focus:outline-none focus:border-secondary transition-colors glass">
                      <option value="">Select a service</option>
                      <option>Film & Video Production</option>
                      <option>Professional Photography</option>
                      <option>Events Management</option>
                      <option>Digital Screen Solutions</option>
                      <option>Audio Services</option>
                      <option>Marketing & Advertising</option>
                      <option>Mosi Special (Elopements)</option>
                      <option>Other (please specify)</option>
                    </select>
                  </div>
                  {formData.service === "Other (please specify)" && (
                    <div className="sm:col-span-2">
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Specify Your Service</label>
                      <input type="text" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors glass" placeholder="Describe the service you need..." />
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Message</label>
                  <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors glass resize-none" placeholder="Tell us about your project..." />
                </div>
                <motion.button 
                  type="submit" 
                  className="bg-gradient-red px-8 py-3 rounded-md font-semibold text-secondary-foreground hover:opacity-90 transition-all flex items-center gap-2 hover:bg-[#9B3030] neon-hover"
                  style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={16} /> Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

