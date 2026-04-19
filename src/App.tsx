import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import CartDrawer from '@/sections/CartDrawer';
import Home from '@/pages/Home';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetail from '@/pages/ProductDetail';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-[#7c3c23]">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              style: {
                background: '#f3e5ab',
                color: '#3d1f12',
                border: '1px solid #d4a574',
              },
            }}
          />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
