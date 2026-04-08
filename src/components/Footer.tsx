import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-heading text-xl font-semibold text-primary-foreground mb-3">
              Mosi <span className="text-secondary">Media</span> Solutions
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Zimbabwe's premier multimedia agency delivering end-to-end media solutions from Victoria Falls to the world.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://www.facebook.com/people/Mosi-Media-Solutions/61578099236920/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:text-secondary hover:bg-primary-foreground/20 transition-colors" aria-label="Follow us on Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:text-secondary hover:bg-primary-foreground/20 transition-colors" aria-label="Follow us on Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:text-secondary hover:bg-primary-foreground/20 transition-colors" aria-label="Follow us on LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:text-secondary hover:bg-primary-foreground/20 transition-colors" aria-label="Subscribe to our YouTube">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
                <Link key={item} to={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="block text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-4">Services</h4>
            <div className="space-y-2">
              {[
                { name: "Film & Video Production", slug: "film-video" },
                { name: "Professional Photography", slug: "photography" },
                { name: "Events Management", slug: "events" },
                { name: "Digital Screen Solutions", slug: "digital-screens" },
                { name: "Audio Services", slug: "audio" },
                { name: "Marketing & Advertising", slug: "marketing" },
              ].map((s) => (
                <Link key={s.name} to="/services" className="block text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:info@mosimediasolutions.com" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                <Mail size={14} /> info@mosimediasolutions.com
              </a>
              <a href="tel:+263771234567" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                <Phone size={14} /> +263 77 123 4567
              </a>
              <span className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin size={14} /> Victoria Falls, Zimbabwe
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Mosi Media Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
