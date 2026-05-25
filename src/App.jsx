import { useState, useEffect } from 'react';
import { comfortShelf, previousOrders } from './data/products';
import Header from './components/Header';
import ETABanner from './components/ETABanner';
import QuickReorder from './components/QuickReorder';
import ComfortShelf from './components/ComfortShelf';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';

const loadCart = () => {
  try {
    const saved = localStorage.getItem('zepto-cart');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const App = () => {
  const [cart, setCart] = useState(loadCart);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('zepto-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const addToCart = (product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: {
        product,
        quantity: (prev[product.id]?.quantity || 0) + 1
      }
    }));
    setToastMessage('Added to cart');
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const current = prev[productId];
      if (!current) return prev;
      if (current.quantity <= 1) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: { ...current, quantity: current.quantity - 1 } };
    });
  };

  const reorder = (order) => {
    const products = comfortShelf.filter(p => order.productIds.includes(p.id));
    setCart(prev => {
      const updated = { ...prev };
      products.forEach(p => {
        updated[p.id] = {
          product: p,
          quantity: (updated[p.id]?.quantity || 0) + 1
        };
      });
      return updated;
    });
    setDrawerOpen(true);
  };

  const placeOrder = () => {
    setCart({});
    setDrawerOpen(false);
    setToastMessage('Order placed! 🎉');
  };

  const cartItems = Object.values(cart);
  const cartCount = cartItems.reduce((sum, { quantity }) => sum + quantity, 0);
  const cartTotal = cartItems.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a0d2e 0%, #0a0416 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-50%', left: '-50%',
        width: '200%', height: '200%',
        background: 'radial-gradient(circle at 30% 50%, rgba(139, 27, 255, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none', animation: 'pulse 8s ease-in-out infinite'
      }} />

      <div className="app-wrapper">
        <Header
          cartCount={cartCount}
          cartTotal={cartTotal}
          onOpenDrawer={() => setDrawerOpen(true)}
        />
        <ETABanner />
        <QuickReorder orders={previousOrders} onReorder={reorder} />
        <ComfortShelf
          products={comfortShelf}
          cart={cart}
          onAdd={addToCart}
          onRemove={removeFromCart}
        />
        <div style={{ textAlign: 'center', padding: '24px 16px', opacity: 0.6 }}>
          <div style={{ fontSize: '13px', color: '#999', fontWeight: '500', marginBottom: '6px' }}>
            Late-night essentials.
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Comfort arriving soon.</div>
        </div>
      </div>

      <CartDrawer
        cart={cart}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onPlaceOrder={placeOrder}
      />

      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
