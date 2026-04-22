import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, Home, ShoppingBag, BookOpen, Mail } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'Our Story', href: '/#story' },
    { name: 'Contact', href: '/#footer' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || location.pathname !== '/'
          ? 'glass-effect shadow-lg py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-1.5 group"
          >
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
              <img
                src="/the%20Best%20logo.png"
                alt="The Best Logo"
                className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="text-left">
              <span className="tamil-text text-base sm:text-2xl text-[#f3e5ab] block leading-tight font-bold">
                தி பெஸ்ட்
              </span>
              <span className="text-[#d4a574] text-[9px] sm:text-xs font-black tracking-[0.2em] uppercase">
                Pure & Homemade
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`transition-colors duration-300 text-sm font-medium relative group ${location.pathname === link.href ? 'text-[#d4a574]' : 'text-[#f3e5ab] hover:text-[#d4a574]'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#d4a574] transition-all duration-300 ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
              </Link>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#f3e5ab] hover:text-[#d4a574] transition-colors duration-300"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4a574] text-[#3d1f12] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-[#f3e5ab]">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#7c3c23] border-[#5a2d1a] w-[300px] p-0 overflow-hidden">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-8 border-b border-[#5a2d1a] bg-[#5a2d1a]/30">
                    <SheetTitle className="text-left flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#f3e5ab]/10 rounded-xl p-1.5 border border-[#f3e5ab]/20">
                        <img 
                          src="/the%20Best%20logo.png" 
                          alt="The Best Logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="tamil-text text-2xl text-[#f3e5ab] block leading-tight font-bold">தி பெஸ்ட்</span>
                        <span className="block text-[10px] text-[#d4a574] uppercase font-black tracking-[0.2em] mt-1">Pure & Homemade</span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col py-6">
                    {navLinks.map((link) => {
                      const icons = {
                        'Home': Home,
                        'Shop': ShoppingBag,
                        'Our Story': BookOpen,
                        'Contact': Mail
                      };
                      const Icon = icons[link.name as keyof typeof icons] || Menu;

                      return (
                        <Link
                          key={link.name}
                          to={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-4 px-8 py-4 transition-all duration-300 group border-b border-[#5a2d1a]/50 ${location.pathname === link.href
                              ? 'bg-[#5a2d1a]/50 text-[#d4a574]'
                              : 'text-[#f3e5ab] hover:bg-[#5a2d1a]/30'
                            }`}
                        >
                          <Icon className={`w-5 h-5 ${location.pathname === link.href ? 'text-[#d4a574]' : 'text-[#d4a574]/40 group-hover:text-[#d4a574]'}`} />
                          <span className="text-lg font-serif tracking-wide">{link.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
