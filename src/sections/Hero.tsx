import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = ((e.clientX - centerX) / rect.width) * 10;
      const rotateX = ((centerY - e.clientY) / rect.height) * 10;
      imageRef.current.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    };

    const handleMouseLeave = () => {
      if (imageRef.current) {
        imageRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/products');
    window.scrollTo(0, 0);
  };

  return (
    <section 
      id="home" 
      ref={heroRef} 
      className="relative min-h-fit lg:min-h-screen flex items-center pt-20 sm:pt-24 overflow-hidden bg-[#7c3c23]"
    >
      {/* Cinematic Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#d4a574] opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* CONTENT BLOCK - Centered on Mobile, Left on Desktop */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-10 order-1 animate-fade-in">
            
            {/* Header Content */}
            <div className="space-y-3 w-full">
              <div className="space-y-1">
                <p className="tamil-text text-xl sm:text-3xl text-[#d4a574] font-bold animate-slide-up leading-tight">
                  சுவை சொல்லும் தரம்
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4 opacity-60">
                  <div className="h-[1px] w-8 lg:w-12 bg-[#d4a574]" />
                  <p className="text-[#f3e5ab] text-[10px] sm:text-xs tracking-[0.3em] uppercase font-black">
                    Authentic Heritage
                  </p>
                  <div className="lg:hidden h-[1px] w-8 bg-[#d4a574]" />
                </div>
              </div>

              <h1 className="text-[23px] sm:text-5xl lg:text-6xl font-serif font-bold text-[#f3e5ab] leading-tight tracking-tight animate-slide-up stagger-2 whitespace-nowrap lg:whitespace-normal">
                Authentic <span className="text-[#d4a574]">South Indian</span> Masalas
              </h1>
            </div>

            {/* Mobile-Only Image Display - BALANCED */}
            <div className="lg:hidden relative py-2 w-full flex justify-center order-2">
              <div className="relative w-[280px] h-[330px] transition-transform duration-700 ease-out animate-float">
                <img
                  src="/hero-masala.jpg"
                  alt="Traditional Indian Masalas"
                  className="w-full h-full object-cover rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] border-2 border-[#f3e5ab]/10"
                />
                <div className="absolute -inset-10 bg-[#d4a574]/10 rounded-full blur-3xl -z-10 animate-pulse" />
              </div>
            </div>

            {/* Actions & Stats */}
            <div className="flex flex-col items-center lg:items-start space-y-8 w-full animate-slide-up stagger-4 order-3">
              <div className="flex justify-center w-full">
                <button
                  onClick={handleExplore}
                  className="group relative overflow-hidden bg-[#f3e5ab] text-[#7c3c23] px-10 py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-[#d4a574]/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  <div className="relative flex items-center gap-4">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
              </div>

              <div className="flex gap-10 sm:gap-12 justify-center lg:justify-start pt-6 border-t border-[#f3e5ab]/10 w-full lg:w-auto">
                <div className="text-center group cursor-default">
                  <p className="text-2xl sm:text-4xl font-serif font-bold text-[#f3e5ab] group-hover:text-[#d4a574] transition-colors duration-300">5+</p>
                  <p className="text-[10px] text-[#d4a574] uppercase font-black tracking-widest mt-1">Products</p>
                </div>
                <div className="text-center group cursor-default">
                  <p className="text-2xl sm:text-4xl font-serif font-bold text-[#f3e5ab] group-hover:text-[#d4a574] transition-colors duration-300">100+</p>
                  <p className="text-[10px] text-[#d4a574] uppercase font-black tracking-widest mt-1">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Cinematic Image (Laptop Only) */}
          <div className="hidden lg:flex justify-end order-2">
            <div
              ref={imageRef}
              className="relative transition-transform duration-700 ease-out animate-float"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative w-[400px] h-[500px] xl:w-[450px] xl:h-[550px] group">
                <div className="absolute -inset-2 border border-[#d4a574]/30 rounded-[2.5rem] scale-95 group-hover:scale-100 transition-transform duration-700 blur-[1px]" />
                <img
                  src="/hero-masala.jpg"
                  alt="Traditional Indian Masalas"
                  className="w-full h-full object-cover rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border-2 border-[#f3e5ab]/10"
                />
                <div className="absolute -inset-10 bg-[#d4a574]/10 rounded-full blur-[100px] -z-10 animate-pulse" />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-[#f3e5ab] text-[#7c3c23] p-5 rounded-2xl shadow-2xl border-l-[6px] border-[#d4a574] z-20">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Premium Quality</p>
                <p className="text-xl font-black leading-none">100% Pure</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
