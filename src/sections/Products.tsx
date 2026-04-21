import { useEffect, useRef, useState, useMemo } from 'react';
import { products as allProducts, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ProductsProps {
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

import { Link } from 'react-router-dom';

export default function Products({ selectedCategory, onSelectCategory }: ProductsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return allProducts;
    }
    return allProducts.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: typeof allProducts[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedProducts(prev => new Set(prev).add(product.id));
    toast.success(`${product.name} added to cart!`, {
      description: `${product.weight} - ₹${product.price}`,
    });
    setTimeout(() => {
      setAddedProducts(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  };

  return (
    <section id="products" ref={sectionRef} className="section-rust py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl sm:text-5xl text-[#f3e5ab] mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            {selectedCategory
              ? categories.find(c => c.id === selectedCategory)?.name
              : 'Our Products'}
          </h2>
          <div className="w-24 h-1 bg-[#d4a574] mx-auto mb-4" />
          <p
            className={`text-[#f3e5ab]/70 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            {selectedCategory
              ? `Exploring our finest ${categories.find(c => c.id === selectedCategory)?.name.toLowerCase()}`
              : 'Our most loved masalas, handpicked for you'}
          </p>
        </div>



        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
          {filteredProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={`group bg-[#FFF9E3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 flex flex-col border border-[#7c3c23]/5 ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: `${(index % 4 + 1) * 100}ms` }}
            >
              {/* Product Image */}
              <div className="relative h-[180px] sm:h-64 bg-white p-4 sm:p-8 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-auto object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                />

                {/* Status Badges */}
                <div className="absolute top-2 right-2">
                  {product.tags.includes('bestseller') && (
                    <span className="bg-[#7c3c23] text-[#f3e5ab] text-[8px] sm:text-[10px] font-black px-2 py-1 rounded-full shadow-lg border border-[#d4a574]/30">
                      BEST
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-6 flex-1 flex flex-col">
                <div className="mb-3">
                  <div className="flex justify-between items-start gap-1">
                    <h3 className="text-xs sm:text-xl font-bold text-[#7c3c23] leading-tight flex-1">
                      {product.name}
                    </h3>
                    <span className="text-[9px] sm:text-[11px] font-black text-[#d4a574] whitespace-nowrap">
                      {product.weight}
                    </span>
                  </div>
                </div>

                {/* Price & CTA Row */}
                <div className="mt-auto pt-3 border-t border-[#7c3c23]/10 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] sm:text-sm text-[#3d1f12]/40 line-through leading-none mb-1">₹{product.originalPrice || 45}</span>
                    <span className="text-sm sm:text-2xl font-black text-[#7c3c23] leading-none">
                      ₹{product.price}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-lg font-black transition-all duration-300 ${addedProducts.has(product.id)
                        ? 'bg-[#4a7c59] text-white'
                        : 'bg-[#7c3c23] text-[#f3e5ab] hover:bg-[#5a2d1a] shadow-md active:scale-95'
                      }`}
                  >
                    {addedProducts.has(product.id) ? (
                      <Check className="w-3 h-3 sm:w-5 sm:h-5" />
                    ) : (
                      <>
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-[9px] sm:text-xs uppercase tracking-tighter">Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#f3e5ab]/60 text-xl font-medium">
              No products found in this category yet.
            </p>
            <button
              onClick={() => onSelectCategory(null)}
              className="mt-4 text-[#d4a574] hover:underline"
            >
              Back to all products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
