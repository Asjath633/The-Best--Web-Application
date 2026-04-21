import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    const WHATSAPP_NUMBER = '919600580218'; // Updated with real number
    const cartSummary = items
      .map((item) => `*${item.product.name}* (${item.product.weight}) x ${item.quantity} = ₹${item.product.price * item.quantity}`)
      .join('%0A');
    
    const message = `*NEW ORDER - THE BEST*%0A%0A${cartSummary}%0A%0A*Total Amount: ₹${totalPrice}*%0A%0APlease confirm my order.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    toast.success('Redirecting to WhatsApp...', {
      description: 'Opening WhatsApp to complete your order.',
    });
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      clearCart();
      setIsCartOpen(false);
    }, 1500);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="bg-[#f3e5ab] border-[#d4a574] w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b border-[#d4a574]/30 pb-4">
          <SheetTitle className="text-[#7c3c23] flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Your Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-[#7c3c23]/10 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-12 h-12 text-[#7c3c23]/50" />
            </div>
            <h3 className="text-xl font-semibold text-[#7c3c23] mb-2">
              Your cart is empty
            </h3>
            <p className="text-[#3d1f12]/60 mb-6">
              Add some delicious masalas to get started!
            </p>
            <Button
              onClick={() => setIsCartOpen(false)}
              className="btn-primary"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto pt-6 space-y-4 px-2">
              {items.map((item) => (
                <div
                  key={item.product.id + item.product.weight}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#7c3c23]/10 shadow-sm transition-all group"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-[#7c3c23]/5 overflow-hidden shadow-sm">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-2 transition-transform group-hover:scale-105"
                      />
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-[#7c3c23] leading-tight text-sm sm:text-base">
                            {item.product.name}
                          </h4>
                          <span className="inline-block mt-1 text-[10px] uppercase font-black bg-[#7c3c23]/10 text-[#7c3c23] px-2 py-0.5 rounded">
                            {item.product.weight}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-[#7c3c23]/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex items-center bg-white border border-[#7c3c23]/10 rounded-lg p-0.5 scale-90 origin-left">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#7c3c23] hover:bg-[#7c3c23]/5 rounded-md transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-[#7c3c23]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#7c3c23] hover:bg-[#7c3c23]/5 rounded-md transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-[#7c3c23]">
                            ₹{item.product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="bg-white/90 backdrop-blur-md rounded-t-[2.5rem] border-t border-[#d4a574]/40 -mx-6 px-10 pt-8 pb-4 space-y-6 shadow-[0_-20px_40px_-15px_rgba(124,60,35,0.2)]">
              {/* Summary with Strict Grid */}
              <div className="grid grid-cols-[1fr_auto] gap-y-3 font-bold uppercase tracking-widest">
                <span className="text-[#3d1f12]/40 text-xs py-1">Subtotal</span>
                <span className="text-[#7c3c23] text-sm py-1">₹{totalPrice}</span>
                
                <span className="text-[#4a7c59] text-xs py-1 opacity-60">Shipping</span>
                <span className="text-[#4a7c59] text-sm py-1">FREE</span>
                
                <div className="col-span-2 pt-4 border-t border-[#7c3c23]/10 flex justify-between items-baseline">
                  <span className="text-[#7c3c23] text-xs tracking-[0.3em] font-black">Total</span>
                  <span className="text-[#7c3c23] text-4xl font-black">₹{totalPrice}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <Button
                  onClick={handleCheckout}
                  className="w-full h-14 bg-[#7c3c23] hover:bg-[#5a2d1a] text-[#f3e5ab] text-lg font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
                >
                  Confirm WhatsApp Order
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <button
                  onClick={() => {
                    clearCart();
                    toast.info('Bag cleared');
                  }}
                  className="w-full text-[#7c3c23]/30 hover:text-[#c44536] text-[10px] font-bold uppercase tracking-[0.4em] transition-colors py-1"
                >
                  Clear My Bag
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
