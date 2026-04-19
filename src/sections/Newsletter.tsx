import { useEffect, useRef, useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    toast.success('Successfully subscribed!', {
      description: 'You will receive our latest updates and offers.',
    });
  };

  return (
    <section ref={sectionRef} className="section-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative bg-[#7c3c23] rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a574]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d4a574]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-[#f3e5ab]/10 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-[#f3e5ab]" />
              </div>
              <h2 className="text-3xl sm:text-4xl text-[#f3e5ab] mb-4">
                Join Our Spice Family
              </h2>
              <p className="text-[#f3e5ab]/70 mb-8">
                Subscribe for recipes, offers, and spice stories delivered to your inbox
              </p>
            </div>

            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className={`flex flex-col sm:flex-row gap-4 max-w-md mx-auto transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 pl-12 bg-[#f3e5ab] text-[#3d1f12] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] placeholder:text-[#3d1f12]/50"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3d1f12]/50" />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-secondary inline-flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-[#7c3c23] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-3 text-[#f3e5ab] animate-scale-in">
                <div className="w-12 h-12 bg-[#4a7c59] rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Thank you for subscribing!</p>
                  <p className="text-sm text-[#f3e5ab]/70">
                    Check your inbox for a welcome email
                  </p>
                </div>
              </div>
            )}

            <p
              className={`text-[#f3e5ab]/50 text-xs mt-4 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
