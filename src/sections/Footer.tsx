import { MapPin, Phone, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'Our Story', href: '/#story' },
  ];

  return (
    <footer id="footer" className="section-rust pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 pb-12 border-b border-[#f3e5ab]/20">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6 flex items-center gap-4">
              <div className="w-16 h-16 bg-[#f3e5ab]/5 rounded-2xl p-2 border border-[#f3e5ab]/10 flex-shrink-0">
                <img 
                  src="/the%20Best%20logo.png?v=1" 
                  alt="The Best Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="tamil-text text-3xl text-[#f3e5ab] block leading-tight">
                  தி பெஸ்ட்
                </span>
                <span className="text-[#d4a574] text-lg tracking-wider uppercase font-bold">
                  Pure & Homemade
                </span>
              </div>
            </div>
            <p className="text-[#f3e5ab]/70 text-sm mb-6 leading-relaxed">
              Authentic South Indian masalas crafted with generational wisdom. 
              Bringing the true taste of tradition to your kitchen since 2026.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/_the.best.brand_?igsh=bDJpM3E1ZmlhNzhi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#f3e5ab]/10 hover:bg-[#d4a574] flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-[#f3e5ab] group-hover:text-[#7c3c23]" />
              </a>
              <a
                href="https://wa.me/919600580218"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#f3e5ab]/10 hover:bg-[#d4a574] flex items-center justify-center transition-colors group"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-[#f3e5ab] group-hover:text-[#7c3c23]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#f3e5ab] font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#f3e5ab]/70 hover:text-[#d4a574] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#f3e5ab] font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
                <span className="text-[#f3e5ab]/70 text-sm">
                  51, GN garden, Iduvai,<br />
                  Iduvai-post, Palladam-taluka
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#d4a574] flex-shrink-0" />
                <a
                  href="tel:+919600580218"
                  className="text-[#f3e5ab]/70 hover:text-[#d4a574] transition-colors text-sm"
                >
                  +91 96005 80218
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#f3e5ab]/50 text-sm text-center sm:text-left">
            &copy; {currentYear} தி பெஸ்ட். All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-[#f3e5ab]/50 hover:text-[#d4a574] transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[#f3e5ab]/50 hover:text-[#d4a574] transition-colors text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
