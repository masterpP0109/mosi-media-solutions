import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Mosi Exclusive", path: "/contact" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Blogs", path: "/blogs" },
  { label: "Packages", path: "/packages" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-6 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/cropped-mms-fINAL1-WHITE.webp" alt="Mosi Media Solutions" className="h-5" />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-[#CD5C5C] neon-hover p-2 rounded-lg ${
                location.pathname === item.path ? "text-[#CD5C5C]" : "text-[#6B7B8C]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            <a
              href="https://www.facebook.com/people/Mosi-Media-Solutions/61578099236920/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg"
              aria-label="Follow us on Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg"
              aria-label="Follow us on Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg"
              aria-label="Subscribe on YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold text-white transition-all duration-300 btn-glow neon-hover" style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)", boxShadow: "0 2px 12px rgba(139,0,0,0.35)" }}
          >
            Get a Quote
          </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white neon-hover p-2 rounded-lg">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden px-6 pb-6 space-y-4 glass">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block text-base font-medium transition-all duration-300 hover:text-[#CD5C5C] neon-hover p-2 rounded-lg ${
                location.pathname === item.path ? "text-[#CD5C5C]" : "text-[#8B9BB4]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://www.facebook.com/people/Mosi-Media-Solutions/61578099236920/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-base font-medium text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg"
          >
            <Facebook size={18} />
            Follow us on Facebook
          </a>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-center px-5 py-2.5 rounded-full text-sm font-semibold text-white neon-hover" style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)" }}>
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
