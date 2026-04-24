import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Mosi Special", path: "/mosi-exclusive" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Blogs", path: "/blogs" },
  { label: "Packages", path: "/packages" },
  { label: "Contact", path: "/contact" },
];

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

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
              href="https://www.instagram.com/mosi_mediasolutions?igsh=cjUxM2pvMGIxM3hj&utm_source=qr"
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
              href="https://www.linkedin.com/in/mosi-media-solutions-a93022387?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
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
            <a
              href="https://www.tiktok.com/@mosi.mediasolutions?_r=1&_t=ZS-95mO0ELLOmj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg"
              aria-label="Follow us on TikTok"
            >
              <TikTokIcon />
            </a>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold text-white transition-all duration-300 btn-glow neon-hover" style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)", boxShadow: "0 2px 12px rgba(139,0,0,0.35)" }}
          >
            Inquire
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
          <a
            href="https://www.instagram.com/mosi_mediasolutions?igsh=cjUxM2pvMGIxM3hj&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-base font-medium text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg"
          >
            <Instagram size={18} />
            Follow us on Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/mosi-media-solutions-a93022387?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-base font-medium text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg"
          >
            <Linkedin size={18} />
            Follow us on LinkedIn
          </a>
          <a
            href="https://www.tiktok.com/@mosi.mediasolutions?_r=1&_t=ZS-95mO0ELLOmj"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-base font-medium text-[#6B7B8C] hover:text-[#CD5C5C] transition-all duration-300 neon-hover p-2 rounded-lg"
          >
            <TikTokIcon />
            Follow us on TikTok
          </a>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-center px-5 py-2.5 rounded-full text-sm font-semibold text-white neon-hover" style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)" }}>
            Inquire
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
