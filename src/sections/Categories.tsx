import { useEffect, useRef, useState } from 'react';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

interface CategoriesProps {
  onSelectCategory: (id: string) => void;
}

export default function Categories({ onSelectCategory }: CategoriesProps) {
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

  return (
    <section ref={sectionRef} className="section-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl text-[#7c3c23] mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Our Collections
          </h2>
          <div className="w-24 h-1 bg-[#d4a574] mx-auto mb-4" />
          <p
            className={`text-[#3d1f12]/70 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Discover the perfect blend for every dish
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`group card-traditional cursor-pointer transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d1f12]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[#f3e5ab] text-xs font-medium bg-[#7c3c23]/80 px-2 py-1 rounded">
                    {category.productCount} Products
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#7c3c23] mb-2 group-hover:text-[#5a2d1a] transition-colors">
                  {category.name}
                </h3>
                <p className="text-[#3d1f12]/70 text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-[#7c3c23] font-medium text-sm group-hover:gap-3 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
