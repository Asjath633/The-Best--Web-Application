import { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/data/products';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section 
      ref={sectionRef} 
      style={{ backgroundColor: '#7c3c23' }} 
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl text-[#f3e5ab] mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ color: '#f3e5ab !important' }}
          >
            What Our Customers Say
          </h2>
          <div className="w-24 h-1.5 bg-[#d4a574] mx-auto mb-4 rounded-full" />
          <p
            className={`text-[#f3e5ab]/70 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
             style={{ color: '#f3e5ab !important', opacity: 0.8 }}
          >
            Real stories from our spice lovers
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div
          className={`relative max-w-3xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#d4a574] rounded-full flex items-center justify-center z-10 shadow-xl border-4 border-[#7c3c23]">
            <Quote className="w-8 h-8 text-[#7c3c23]" />
          </div>

          {/* Testimonial Card */}
          <div className="rounded-3xl p-8 sm:p-12 pt-20 text-center shadow-2xl border-2 border-[#d4a574]/20 overflow-hidden" style={{ backgroundColor: '#5a2d1a' }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-500 ${
                  index === currentIndex
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 absolute inset-0 translate-x-8 pointer-events-none'
                }`}
              >
                {/* Rating */}
                <div className="flex justify-center gap-2 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 ${
                        i < testimonial.rating
                          ? 'text-[#d4a574] fill-[#d4a574]'
                          : 'text-[#f3e5ab]/10'
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-[#f3e5ab] text-xl sm:text-3xl italic mb-10 leading-relaxed font-black drop-shadow-md">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <p className="text-[#d4a574] font-black text-2xl tracking-[0.1em] uppercase">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-[#f3e5ab]/10 hover:bg-[#f3e5ab]/20 flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-[#f3e5ab]" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#d4a574] w-8'
                      : 'bg-[#f3e5ab]/30 hover:bg-[#f3e5ab]/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-[#f3e5ab]/10 hover:bg-[#f3e5ab]/20 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-[#f3e5ab]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
