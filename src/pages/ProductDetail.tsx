import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const WEIGHT_OPTIONS = [
  { label: '50g', value: 50, price: 18 },
  { label: '100g', value: 100, price: 36 },
  { label: '250g', value: 250, price: 85 },
  { label: '500g', value: 500, price: 160 },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState(WEIGHT_OPTIONS[1]); // Default to 100g
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#7c3c23] text-[#f3e5ab]">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/products')} className="btn-secondary">
          Back to Shop
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const customizedProduct = {
      ...product,
      price: selectedWeight.price,
      weight: selectedWeight.label,
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(customizedProduct);
    }

    toast.success(`${product.name} added to cart!`, {
      description: `${quantity} x ${selectedWeight.label} - ₹${selectedWeight.price * quantity}`,
    });
  };

  return (
    <div className="min-h-screen bg-[#f3e5ab] pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[#7c3c23]/60 hover:text-[#7c3c23] transition-all mb-10 font-bold uppercase tracking-widest text-xs"
        >
          <div className="w-8 h-8 rounded-full bg-[#7c3c23]/5 flex items-center justify-center group-hover:bg-[#7c3c23] group-hover:text-[#f3e5ab] transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Collection
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl bg-[#7c3c23]/5 p-12 flex items-center justify-center overflow-hidden border border-[#7c3c23]/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-widest bg-[#7c3c23] text-[#f3e5ab] px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#7c3c23] leading-tight">
                {product.name}
              </h1>

            </div>

            <p className="text-lg text-[#3d1f12]/80 leading-relaxed">
              {product.description}
            </p>

            {/* Weight Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#7c3c23]/60">
                Select Weight (Gram)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WEIGHT_OPTIONS.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => setSelectedWeight(option)}
                    className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${
                      selectedWeight.label === option.label
                        ? 'border-[#7c3c23] bg-[#7c3c23] text-[#f3e5ab] shadow-lg scale-105'
                        : 'border-[#7c3c23]/10 text-[#7c3c23] hover:border-[#7c3c23]/30 hover:bg-[#7c3c23]/5'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end gap-6 pt-6 border-t border-[#7c3c23]/10">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#d4a574] uppercase tracking-widest mb-1">Total Price</span>
                <span className="text-4xl font-black text-[#7c3c23] leading-none">₹{selectedWeight.price * quantity}</span>
              </div>

              <div className="flex items-center bg-white rounded-xl border border-[#7c3c23]/10 p-1 h-[52px]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#7c3c23] hover:bg-[#7c3c23]/5 rounded-lg transition-colors text-xl font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-[#7c3c23] text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#7c3c23] hover:bg-[#7c3c23]/5 rounded-lg transition-colors text-xl font-bold"
                >
                  +
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 w-full sm:w-auto h-14 bg-[#7c3c23] hover:bg-[#5a2d1a] border-none text-[#f3e5ab] text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </Button>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#7c3c23]/10">
              <div className="text-center space-y-2">
                <div className="w-10 h-10 bg-[#7c3c23]/5 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-5 h-5 text-[#7c3c23]" />
                </div>
                <p className="text-[10px] font-bold text-[#7c3c23] uppercase tracking-tighter">100% Pure</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-10 h-10 bg-[#7c3c23]/5 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-5 h-5 text-[#7c3c23]" />
                </div>
                <p className="text-[10px] font-bold text-[#7c3c23] uppercase tracking-tighter">Fast Delivery</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-10 h-10 bg-[#7c3c23]/5 rounded-full flex items-center justify-center mx-auto">
                  <RotateCcw className="w-5 h-5 text-[#7c3c23]" />
                </div>
                <p className="text-[10px] font-bold text-[#7c3c23] uppercase tracking-tighter">Quality Auth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
