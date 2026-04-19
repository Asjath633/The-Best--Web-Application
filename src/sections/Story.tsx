import { useEffect, useRef, useState } from 'react';
import { Award, Leaf, Heart } from 'lucide-react';

export default function Story() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Sourced from the finest spice gardens',
    },
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'No preservatives or artificial colors',
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Traditional recipes passed down generations',
    },
  ];

  return (
    <section 
      id="story" 
      ref={sectionRef} 
      style={{ backgroundColor: '#7c3c23' }} 
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Artistic Heritage Visual */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative aspect-[4/5] bg-[#3d1f12] rounded-3xl shadow-2xl overflow-hidden border-4 border-[#d4a574]/30 group/story">
              {/* Cinematic Spice Background Image */}
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Traditional South Indian Spices"
                  className="w-full h-full object-cover opacity-60 group-hover/story:scale-110 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d1f12] via-[#3d1f12]/20 to-transparent" />
              </div>
              
              {/* Textured Overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dust.png')]" />
              
              {/* Central Content Mosaic */}
              <div className="relative h-full flex flex-col items-center justify-center p-10 text-center z-10">
                <div className="space-y-6">
                  <div className="w-20 h-20 mx-auto bg-[#f3e5ab]/10 border border-[#f3e5ab]/30 rounded-2xl flex items-center justify-center rotate-45 transform group-hover/story:rotate-[225deg] transition-transform duration-[1500ms]">
                    <Heart className="w-10 h-10 text-[#f3e5ab] -rotate-45 group-hover/story:rotate-[-225deg] transition-transform duration-[1500ms] fill-current" />
                  </div>
                  
                  <h3 className="text-4xl sm:text-5xl font-black text-[#f3e5ab] leading-tight tamil-text tracking-wide drop-shadow-lg">
                    அம்மாவின் <br /> 
                    <span className="text-[#d4a574]">கைப்பக்குவம்</span>
                  </h3>
                  
                  <p className="text-[#f3e5ab] uppercase tracking-[0.4em] text-xs font-black">
                    Mother's Magic
                  </p>
                </div>
              </div>

              {/* Floating Quote Sticker */}
              <div className="absolute -bottom-2 -right-2 bg-[#d4a574] text-[#7c3c23] p-8 rounded-tl-[3rem] shadow-2xl border-l-4 border-t-4 border-[#3d1f12]/20">
                <p className="tamil-text text-2xl font-bold leading-tight mb-1">பாரம்பரிய சுவை</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Heritage Taste</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-[#d4a574] text-sm font-black tracking-[0.3em] uppercase">
                Since 2026
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-[#f3e5ab] mt-2 mb-6 tracking-tight">
                Our Story
              </h2>
              <div className="w-32 h-2 bg-[#d4a574] rounded-full" />
            </div>

            <div
              className={`space-y-6 transition-all duration-700 delay-200 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-[#f3e5ab]/90 text-lg sm:text-2xl leading-relaxed font-medium">
                Our family has been crafting authentic South Indian masalas using traditional 
                recipes passed down through time. Each blend is a tribute to our mother&apos;s 
                kitchen, where the aroma of freshly ground spices filled the air every morning.
              </p>
              <p className="text-[#f3e5ab]/80 text-lg leading-relaxed">
                We source our spices directly from farmers across Tamil Nadu, ensuring that 
                every packet carries the authentic taste of home. Our traditional grinding 
                methods preserve the essential oils and flavors that make our masalas truly special.
              </p>
            </div>

            {/* Features */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 transition-all duration-700 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="text-left sm:text-center group"
                  style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                >
                  <div className="w-16 h-16 sm:mx-auto mb-4 bg-[#f3e5ab]/5 border border-[#f3e5ab]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#d4a574] transition-all duration-500 shadow-xl">
                    <feature.icon className="w-7 h-7 text-[#d4a574] group-hover:text-[#7c3c23] transition-colors duration-500" />
                  </div>
                  <h3 className="text-[#f3e5ab] font-bold text-lg mb-1 tracking-wide uppercase">
                    {feature.title}
                  </h3>
                  <p className="text-[#f3e5ab]/60 text-sm leading-snug">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
