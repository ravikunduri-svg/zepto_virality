# Zepto Comfort Mode — Vercel Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a functional, Vercel-deployable Zepto Comfort Mode prototype with cart state, quantity controls, localStorage persistence, a cart drawer, and one-tap reorder.

**Architecture:** Vite + React 18 app. Cart state (`Record<id, {product, quantity}>`) lives in `App.jsx`, synced to `localStorage`. Six focused child components receive cart and handler props. No backend — all data is static mock.

**Tech Stack:** Vite 5, React 18, lucide-react, plain CSS (no framework), Vercel

**Working directory for all commands:** `C:\Codes\Labs\post_cohort\zepto_blinkit`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | Create | Vite + React deps |
| `vite.config.js` | Create | Vite config |
| `index.html` | Create | HTML entry |
| `src/main.jsx` | Create | React root mount |
| `src/index.css` | Create | Resets + responsive breakpoints + animations |
| `src/App.jsx` | Create | Cart state, handlers, layout composition |
| `src/data/products.js` | Create | Mock products + previous orders |
| `src/components/Header.jsx` | Create | Logo, cart icon, ₹ total, opens drawer |
| `src/components/ETABanner.jsx` | Create | Time-aware ETA strip |
| `src/components/ProductCard.jsx` | Create | ADD button → qty stepper |
| `src/components/ComfortShelf.jsx` | Create | Product grid |
| `src/components/QuickReorder.jsx` | Create | Previous orders → fills cart + opens drawer |
| `src/components/CartDrawer.jsx` | Create | Slide-up cart sheet |
| `src/components/Toast.jsx` | Create | Auto-dismiss notification |

---

## Task 1: Scaffold Vite App

**Files:** `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`

- [ ] **Step 1: Initialise Vite in the current directory**

```bash
npm create vite@latest . -- --template react
```

When prompted "Current directory is not empty. Please choose how to proceed" → select **Ignore files and continue**.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install lucide-react
```

- [ ] **Step 3: Remove boilerplate files**

```bash
rm src/App.css src/assets/react.svg public/vite.svg src/App.jsx
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: server running at `http://localhost:5173` (will show error — App.jsx deleted, that's fine)

- [ ] **Step 5: Commit scaffold**

```bash
git add package.json package-lock.json vite.config.js index.html src/main.jsx .gitignore
git commit -m "chore: scaffold Vite + React app"
```

---

## Task 2: Global Styles

**Files:** `src/index.css`

- [ ] **Step 1: Write index.css**

```css
/* src/index.css */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #0a0416;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

#root {
  min-height: 100vh;
}

/* Responsive content wrapper — used by App */
.app-wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
}

/* Product grid breakpoints */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
  gap: 12px;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .app-wrapper {
    padding: 24px;
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes slideUp {
  from { transform: translateX(-50%) translateY(100px); opacity: 0; }
  to   { transform: translateX(-50%) translateY(0);    opacity: 1; }
}

@keyframes drawerSlideUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
```

- [ ] **Step 2: Ensure main.jsx imports it**

Open `src/main.jsx`. It should already have `import './index.css'` from the Vite template. If not, add it:

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 3: Commit**

```bash
git add src/index.css src/main.jsx
git commit -m "chore: add global styles and responsive breakpoints"
```

---

## Task 3: Mock Data

**Files:** `src/data/products.js`

- [ ] **Step 1: Create data file**

```js
// src/data/products.js

export const comfortShelf = [
  {
    id: 1,
    name: "Amul Butterscotch Ice Cream",
    price: 149,
    image: "🍦",
    frozenSafe: true,
    confidence: "high",
    tags: ["Sweet fix", "Popular"]
  },
  {
    id: 2,
    name: "Lay's Classic Salted",
    price: 40,
    image: "🥔",
    frozenSafe: false,
    confidence: "high",
    tags: ["Movie night"]
  },
  {
    id: 3,
    name: "Maggi 2-Minute Noodles (Pack of 4)",
    price: 56,
    image: "🍜",
    frozenSafe: false,
    confidence: "high",
    tags: ["Quick bite"]
  },
  {
    id: 4,
    name: "Cadbury Dairy Milk Silk",
    price: 150,
    image: "🍫",
    frozenSafe: false,
    confidence: "high",
    tags: ["Comfort food"]
  }
];

export const previousOrders = [
  {
    id: "order_1",
    name: "Your Last Comfort Order",
    date: "3 days ago",
    items: ["Amul Butterscotch Ice Cream", "Lay's Classic Salted"],
    productIds: [1, 2],
    total: 189,
    itemCount: 2
  },
  {
    id: "order_2",
    name: "Friday Night Combo",
    date: "Last Friday",
    items: ["Maggi Noodles", "Cadbury Silk", "Lay's"],
    productIds: [3, 4, 2],
    total: 246,
    itemCount: 3
  }
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/products.js
git commit -m "feat: add mock products and previous orders data"
```

---

## Task 4: Toast Component

**Files:** `src/components/Toast.jsx`

- [ ] **Step 1: Create Toast**

```jsx
// src/components/Toast.jsx
import { Heart } from 'lucide-react';

const Toast = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#8B1BFF',
      borderRadius: '12px',
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      zIndex: 200,
      animation: 'slideUp 0.3s ease-out',
      boxShadow: '0 8px 32px rgba(139, 27, 255, 0.4)',
      whiteSpace: 'nowrap'
    }}>
      <Heart size={18} color="#fff" fill="#fff" />
      <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
        {message}
      </span>
    </div>
  );
};

export default Toast;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Toast.jsx
git commit -m "feat: add Toast component"
```

---

## Task 5: Header Component

**Files:** `src/components/Header.jsx`

- [ ] **Step 1: Create Header**

```jsx
// src/components/Header.jsx
import { ShoppingBag, Moon } from 'lucide-react';

const Header = ({ cartCount, cartTotal, onOpenDrawer }) => (
  <header style={{
    position: 'relative',
    zIndex: 10,
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div>
      <div style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#8B1BFF',
        marginBottom: '4px',
        letterSpacing: '-1px'
      }}>
        zepto
      </div>
      <div style={{
        fontSize: '12px',
        color: '#999',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <Moon size={14} color="#8B1BFF" />
        Comfort Mode
      </div>
    </div>

    <button
      onClick={onOpenDrawer}
      style={{
        background: cartCount > 0 ? 'rgba(139, 27, 255, 0.2)' : 'rgba(139, 27, 255, 0.12)',
        borderRadius: '12px',
        padding: '10px 18px',
        border: '1.5px solid rgba(139, 27, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      <ShoppingBag size={20} color="#8B1BFF" />
      {cartCount > 0 && (
        <>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#8B1BFF' }}>
            {cartCount}
          </span>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#8B1BFF' }}>
            ₹{cartTotal}
          </span>
        </>
      )}
    </button>
  </header>
);

export default Header;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.jsx
git commit -m "feat: add Header with cart total"
```

---

## Task 6: ETABanner Component

**Files:** `src/components/ETABanner.jsx`

- [ ] **Step 1: Create ETABanner**

```jsx
// src/components/ETABanner.jsx
import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const getETAInfo = (date) => {
  const hour = date.getHours();
  if (hour >= 22 || hour < 6) {
    return { time: "14–16 mins", confidence: "High delivery confidence tonight", icon: "🌙" };
  }
  return { time: "10–12 mins", confidence: "Express delivery available", icon: "⚡" };
};

const ETABanner = () => {
  const [etaInfo, setEtaInfo] = useState(() => getETAInfo(new Date()));

  useEffect(() => {
    const timer = setInterval(() => setEtaInfo(getETAInfo(new Date())), 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      background: '#1a1625',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '24px',
      border: '1.5px solid rgba(139, 27, 255, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 16px rgba(139, 27, 255, 0.08)'
    }}>
      <div>
        <div style={{
          fontSize: '11px', color: '#999', marginBottom: '8px',
          fontWeight: '600', letterSpacing: '0.8px', textTransform: 'uppercase'
        }}>
          Expected Delivery
        </div>
        <div style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginBottom: '6px', letterSpacing: '-0.5px' }}>
          {etaInfo.time}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#00d97e', fontWeight: '600' }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#00d97e', animation: 'pulse 2s ease-in-out infinite'
          }} />
          {etaInfo.confidence}
        </div>
      </div>
      <div style={{
        background: 'rgba(139, 27, 255, 0.15)', borderRadius: '50%',
        padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Zap size={28} color="#8B1BFF" fill="#8B1BFF" />
      </div>
    </div>
  );
};

export default ETABanner;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ETABanner.jsx
git commit -m "feat: add ETABanner with time-aware delivery message"
```

---

## Task 7: ProductCard Component

**Files:** `src/components/ProductCard.jsx`

- [ ] **Step 1: Create ProductCard**

```jsx
// src/components/ProductCard.jsx
import { Snowflake } from 'lucide-react';

const ProductCard = ({ product, quantity, onAdd, onRemove }) => {
  const hasItem = quantity > 0;

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #f0f0f0',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 27, 255, 0.15)';
        e.currentTarget.style.borderColor = 'rgba(139, 27, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#f0f0f0';
      }}
      onClick={() => onAdd(product)}
    >
      {product.frozenSafe && (
        <div style={{
          position: 'absolute', top: '8px', right: '8px',
          background: 'rgba(0, 217, 126, 0.12)', backdropFilter: 'blur(8px)',
          borderRadius: '8px', padding: '4px 8px',
          border: '1px solid rgba(0, 217, 126, 0.3)',
          display: 'flex', alignItems: 'center', gap: '4px', zIndex: 5
        }}>
          <Snowflake size={12} color="#00d97e" />
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#00d97e', letterSpacing: '0.3px' }}>
            SAFE
          </span>
        </div>
      )}

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: '56px', marginBottom: '12px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
          {product.image}
        </div>

        <div style={{
          fontSize: '13px', fontWeight: '600', marginBottom: '8px',
          color: '#1a1625', lineHeight: '1.3', minHeight: '34px',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {product.name}
        </div>

        <div style={{ display: 'flex', gap: '4px', marginBottom: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {product.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '10px', color: '#666', background: '#f5f5f5',
              padding: '3px 8px', borderRadius: '6px', fontWeight: '600'
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a1625', marginBottom: '12px' }}>
          ₹{product.price}
        </div>

        {/* ADD button or qty stepper */}
        {!hasItem ? (
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            style={{
              width: '100%', background: '#8B1BFF', border: 'none',
              borderRadius: '8px', padding: '10px', color: '#fff',
              fontWeight: '700', fontSize: '12px', cursor: 'pointer',
              transition: 'all 0.2s ease', letterSpacing: '0.3px'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#7a17e6'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#8B1BFF'; }}
          >
            ADD
          </button>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', background: '#8B1BFF', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              overflow: 'hidden'
            }}
          >
            <button
              onClick={() => onRemove(product.id)}
              style={{
                background: 'transparent', border: 'none', color: '#fff',
                fontSize: '20px', fontWeight: '700', padding: '8px 14px',
                cursor: 'pointer', lineHeight: 1
              }}
            >
              −
            </button>
            <span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>
              {quantity}
            </span>
            <button
              onClick={() => onAdd(product)}
              style={{
                background: 'transparent', border: 'none', color: '#fff',
                fontSize: '20px', fontWeight: '700', padding: '8px 14px',
                cursor: 'pointer', lineHeight: 1
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProductCard.jsx
git commit -m "feat: add ProductCard with ADD/qty-stepper toggle"
```

---

## Task 8: ComfortShelf Component

**Files:** `src/components/ComfortShelf.jsx`

- [ ] **Step 1: Create ComfortShelf**

```jsx
// src/components/ComfortShelf.jsx
import ProductCard from './ProductCard';

const ComfortShelf = ({ products, cart, onAdd, onRemove }) => (
  <section style={{ position: 'relative', zIndex: 10, marginBottom: '32px' }}>
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '6px', color: '#fff', letterSpacing: '-0.4px' }}>
        Midnight Comfort Picks
      </h2>
      <p style={{ fontSize: '14px', color: '#999', fontWeight: '500' }}>
        Long day? We&apos;ve got you.
      </p>
    </div>

    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={cart[product.id]?.quantity || 0}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  </section>
);

export default ComfortShelf;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ComfortShelf.jsx
git commit -m "feat: add ComfortShelf product grid"
```

---

## Task 9: QuickReorder Component

**Files:** `src/components/QuickReorder.jsx`

- [ ] **Step 1: Create QuickReorder**

```jsx
// src/components/QuickReorder.jsx
import { ChevronRight } from 'lucide-react';

const QuickReorder = ({ orders, onReorder }) => (
  <section style={{ position: 'relative', zIndex: 10, marginBottom: '32px' }}>
    <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#fff', letterSpacing: '-0.3px' }}>
      Quick Reorder
    </h2>

    <div style={{ display: 'grid', gap: '12px' }}>
      {orders.map(order => (
        <div
          key={order.id}
          onClick={() => onReorder(order)}
          style={{
            background: '#1a1625', borderRadius: '12px', padding: '16px',
            border: '1.5px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer', transition: 'all 0.2s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(139, 27, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(139, 27, 255, 0.4)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#1a1625';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px', color: '#fff' }}>
              {order.name}
            </div>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>
              {order.date} · {order.itemCount} items
            </div>
            <div style={{ fontSize: '15px', color: '#8B1BFF', fontWeight: '700' }}>
              ₹{order.total}
            </div>
          </div>
          <ChevronRight size={20} color="#666" />
        </div>
      ))}
    </div>
  </section>
);

export default QuickReorder;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuickReorder.jsx
git commit -m "feat: add QuickReorder component"
```

---

## Task 10: CartDrawer Component

**Files:** `src/components/CartDrawer.jsx`

- [ ] **Step 1: Create CartDrawer**

```jsx
// src/components/CartDrawer.jsx

const CartDrawer = ({ cart, isOpen, onClose, onAdd, onRemove, onPlaceOrder }) => {
  const items = Object.values(cart);
  const total = items.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          zIndex: 150
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#1a1625',
        borderRadius: '20px 20px 0 0',
        maxHeight: '80vh',
        display: 'flex', flexDirection: 'column',
        zIndex: 160,
        animation: 'drawerSlideUp 0.3s ease-out',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.5)'
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 0' }}>
          <div style={{ width: '40px', height: '4px', background: '#444', borderRadius: '2px' }} />
        </div>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 20px 12px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>Your Cart</h3>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff',
              borderRadius: '50%', width: '32px', height: '32px',
              fontSize: '18px', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        {/* Item list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#666', padding: '40px 0', fontSize: '14px' }}>
              Your cart is empty
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                <span style={{ fontSize: '32px' }}>{product.image}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>
                    {product.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#8B1BFF', fontWeight: '700' }}>
                    ₹{product.price * quantity}
                  </div>
                </div>
                {/* Qty stepper */}
                <div style={{
                  background: '#8B1BFF', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', overflow: 'hidden'
                }}>
                  <button
                    onClick={() => onRemove(product.id)}
                    style={{
                      background: 'transparent', border: 'none', color: '#fff',
                      fontSize: '18px', fontWeight: '700', padding: '6px 10px',
                      cursor: 'pointer', lineHeight: 1
                    }}
                  >
                    −
                  </button>
                  <span style={{ color: '#fff', fontWeight: '700', fontSize: '13px', minWidth: '16px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => onAdd(product)}
                    style={{
                      background: 'transparent', border: 'none', color: '#fff',
                      fontSize: '18px', fontWeight: '700', padding: '6px 10px',
                      cursor: 'pointer', lineHeight: 1
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sticky footer */}
        {items.length > 0 && (
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            background: '#1a1625'
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '16px'
            }}>
              <span style={{ fontSize: '15px', color: '#999', fontWeight: '500' }}>Total</span>
              <span style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>₹{total}</span>
            </div>
            <button
              onClick={onPlaceOrder}
              style={{
                width: '100%', background: '#8B1BFF', border: 'none',
                borderRadius: '12px', padding: '16px', color: '#fff',
                fontWeight: '700', fontSize: '16px', cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#7a17e6'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#8B1BFF'; }}
            >
              Place Order · ₹{total}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CartDrawer.jsx
git commit -m "feat: add CartDrawer slide-up sheet"
```

---

## Task 11: App.jsx — Wire Everything

**Files:** `src/App.jsx`

- [ ] **Step 1: Create App.jsx**

```jsx
// src/App.jsx
import { useState, useEffect } from 'react';
import { comfortShelf, previousOrders } from './data/products';
import Header from './components/Header';
import ETABanner from './components/ETABanner';
import QuickReorder from './components/QuickReorder';
import ComfortShelf from './components/ComfortShelf';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';

// Hydrate cart from localStorage on first render
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

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem('zepto-cart', JSON.stringify(cart));
  }, [cart]);

  // Auto-dismiss toast after 2s
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

        {/* Microcopy footer */}
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
```

- [ ] **Step 2: Run dev server and verify manually**

```bash
npm run dev
```

Open `http://localhost:5173`. Check:
- [ ] Dark gradient background renders
- [ ] Header shows "zepto" + "Comfort Mode"
- [ ] ETA banner shows delivery time
- [ ] 2 reorder cards render
- [ ] 4 product cards render with emoji images
- [ ] Clicking ADD on a product: button becomes `− 1 +`, cart badge shows count + total
- [ ] Clicking `−` at qty 1 removes item, badge disappears
- [ ] Clicking cart badge opens drawer
- [ ] Drawer shows items, qty steppers, total, "Place Order" button
- [ ] "Place Order" clears cart, closes drawer, shows "Order placed! 🎉" toast
- [ ] Clicking a Quick Reorder card opens drawer pre-filled with those items
- [ ] Refresh page — cart persists (localStorage)
- [ ] Resize window — grid goes 1→2→3 columns at 768/1024px

- [ ] **Step 3: Build to verify no errors**

```bash
npm run build
```

Expected: `dist/` directory created, no TypeScript or lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire App.jsx — cart state, handlers, full component tree"
```

---

## Task 12: Deploy to Vercel

- [ ] **Step 1: Verify .gitignore excludes dist and node_modules**

Open `.gitignore` (Vite creates this). Confirm it contains:
```
node_modules
dist
```

If not, add them.

- [ ] **Step 2: Commit all remaining files**

```bash
git add .
git status
```

Review staged files — confirm no `node_modules/` or `dist/` is included. Then:

```bash
git commit -m "chore: add Vite build config and assets for Vercel deployment"
```

- [ ] **Step 3: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 4: Deploy on Vercel**

1. Go to [vercel.com](https://vercel.com) → "Add New Project"
2. Import `ravikunduri-svg/zepto_virality`
3. Vercel auto-detects Vite. Confirm:
   - Framework: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**

- [ ] **Step 5: Verify live URL**

Once deployed, open the Vercel URL and repeat the manual checks from Task 11 Step 2.

- [ ] **Step 6: Update CLAUDE.md with live URL**

Edit `CLAUDE.md` — add under "Project Structure":
```markdown
**Live URL:** https://<your-vercel-url>.vercel.app
```

```bash
git add CLAUDE.md
git commit -m "docs: add live Vercel URL"
git push origin main
```

---

## Self-Review Checklist

- [x] **Spec coverage:** Cart total (Header), qty controls (ProductCard), localStorage (App.jsx useEffect), CartDrawer, reorder via productIds (App.jsx `reorder()`) — all 5 upgrades covered
- [x] **Responsive layout:** `.product-grid` CSS class + breakpoints in index.css at 768/1024px
- [x] **Placeholder scan:** No TBDs. All code blocks complete.
- [x] **Type consistency:** `cart[product.id]?.quantity` pattern used consistently in App.jsx, ComfortShelf, CartDrawer. `onAdd(product)` / `onRemove(productId)` signatures match across all components.
- [x] **Toast variants:** "Added to cart" (add) and "Order placed! 🎉" (placeOrder) — both wired in App.jsx
- [x] **Animations:** `pulse`, `slideUp`, `drawerSlideUp` defined in index.css, used in components
