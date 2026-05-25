import { useState } from 'react';
import { ShoppingBag, Clock, MapPin, Search, Zap, Moon, Snowflake, ChevronRight } from 'lucide-react';

// ─── BEFORE: Simulated standard Zepto UI at 10pm ──────────────────────────────
const BeforePanel = () => {
  const [cart, setCart] = useState({});

  const products = [
    { id: 1, name: "Amul Butterscotch Ice Cream", price: 149, image: "🍦", badge: null },
    { id: 2, name: "Lay's Classic Salted", price: 40, image: "🥔", badge: null },
    { id: 3, name: "Maggi 2-Minute Noodles", price: 56, image: "🍜", badge: null },
    { id: 4, name: "Cadbury Dairy Milk Silk", price: 150, image: "🍫", badge: null },
  ];

  const add = (id) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div style={{
      height: '100%',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#21C17E', letterSpacing: '-1px' }}>zepto</div>
          <div style={{ position: 'relative' }}>
            <ShoppingBag size={22} color="#333" />
            {cartCount > 0 && (
              <div style={{
                position: 'absolute', top: '-6px', right: '-6px',
                background: '#21C17E', borderRadius: '50%', width: '16px', height: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: '700', color: '#fff'
              }}>{cartCount}</div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
          <MapPin size={14} color="#21C17E" />
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#111' }}>Deliver to: Home</span>
          <span style={{ fontSize: '11px', color: '#666', marginLeft: '4px' }}>Hyderabad, 500032</span>
        </div>
        <div style={{
          background: '#f5f5f5', borderRadius: '10px', padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <Search size={16} color="#999" />
          <span style={{ fontSize: '14px', color: '#999' }}>Search for products...</span>
        </div>
      </div>

      {/* ETA strip — generic */}
      <div style={{
        background: '#f0faf5', padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: '8px',
        borderBottom: '1px solid #e0f0ea'
      }}>
        <Clock size={16} color="#21C17E" />
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#111' }}>Delivery in 10–20 min</span>
      </div>

      {/* Category chips */}
      <div style={{ padding: '14px 16px 0', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {['Snacks', 'Dairy', 'Noodles', 'Drinks', 'Ice Cream', 'Biscuits'].map(cat => (
          <div key={cat} style={{
            background: cat === 'Snacks' ? '#21C17E' : '#f5f5f5',
            color: cat === 'Snacks' ? '#fff' : '#333',
            borderRadius: '20px', padding: '6px 14px',
            fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', cursor: 'pointer'
          }}>{cat}</div>
        ))}
      </div>

      {/* Section title */}
      <div style={{ padding: '16px 16px 8px' }}>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#111' }}>Popular Near You</div>
        <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>Showing 48 products</div>
      </div>

      {/* Product grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '10px', padding: '0 16px 16px'
      }}>
        {products.map(p => (
          <div key={p.id} style={{
            background: '#fff', borderRadius: '10px',
            border: '1px solid #eee', overflow: 'hidden'
          }}>
            <div style={{ background: '#fafafa', padding: '20px', textAlign: 'center', fontSize: '48px' }}>
              {p.image}
            </div>
            <div style={{ padding: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#111', marginBottom: '4px', lineHeight: 1.3 }}>
                {p.name}
              </div>
              <div style={{ fontSize: '11px', color: '#999', marginBottom: '8px' }}>500 g</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#111' }}>₹{p.price}</span>
                <button
                  onClick={() => add(p.id)}
                  style={{
                    background: cart[p.id] ? '#21C17E' : '#fff',
                    border: '1.5px solid #21C17E',
                    borderRadius: '6px', padding: '4px 12px',
                    color: cart[p.id] ? '#fff' : '#21C17E',
                    fontSize: '12px', fontWeight: '700', cursor: 'pointer'
                  }}
                >
                  {cart[p.id] ? `${cart[p.id]} ✓` : 'ADD'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pain point callouts */}
      <div style={{ margin: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { label: "😟 No night-mode UI — bright white at 11pm", color: '#fff3f3', border: '#ffcccc', text: '#cc0000' },
          { label: "😟 Will my ice cream melt? No signal.", color: '#fff3f3', border: '#ffcccc', text: '#cc0000' },
          { label: "😟 Generic shelf — no comfort curation", color: '#fff3f3', border: '#ffcccc', text: '#cc0000' },
          { label: "😟 Previous orders buried in history tab", color: '#fff3f3', border: '#ffcccc', text: '#cc0000' },
        ].map(c => (
          <div key={c.label} style={{
            background: c.color, border: `1px solid ${c.border}`,
            borderRadius: '8px', padding: '8px 12px',
            fontSize: '11px', fontWeight: '600', color: c.text
          }}>{c.label}</div>
        ))}
      </div>
    </div>
  );
};

// ─── AFTER: Comfort Mode ───────────────────────────────────────────────────────
const AfterPanel = () => {
  const [cart, setCart] = useState({});

  const products = [
    { id: 1, name: "Amul Butterscotch Ice Cream", price: 149, image: "🍦", frozenSafe: true, tags: ["Sweet fix"] },
    { id: 2, name: "Lay's Classic Salted", price: 40, image: "🥔", frozenSafe: false, tags: ["Movie night"] },
    { id: 3, name: "Maggi 2-Minute Noodles", price: 56, image: "🍜", frozenSafe: false, tags: ["Quick bite"] },
    { id: 4, name: "Cadbury Dairy Milk Silk", price: 150, image: "🍫", frozenSafe: false, tags: ["Comfort"] },
  ];

  const add = (id) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const remove = (id) => setCart(prev => {
    if ((prev[id] || 0) <= 1) { const { [id]: _, ...rest } = prev; return rest; }
    return { ...prev, [id]: prev[id] - 1 };
  });
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find(p => p.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);

  return (
    <div style={{
      height: '100%',
      background: 'linear-gradient(180deg, #1a0d2e 0%, #0a0416 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      overflowY: 'auto',
      position: 'relative'
    }}>
      <div style={{ padding: '16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#8B1BFF', letterSpacing: '-1px' }}>zepto</div>
            <div style={{ fontSize: '11px', color: '#999', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Moon size={11} color="#8B1BFF" /> Comfort Mode
            </div>
          </div>
          <div style={{
            background: cartCount > 0 ? 'rgba(139,27,255,0.25)' : 'rgba(139,27,255,0.12)',
            borderRadius: '10px', padding: '8px 14px',
            border: '1.5px solid rgba(139,27,255,0.3)',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <ShoppingBag size={18} color="#8B1BFF" />
            {cartCount > 0 && (
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#8B1BFF' }}>
                {cartCount} · ₹{cartTotal}
              </span>
            )}
          </div>
        </div>

        {/* ETA Banner */}
        <div style={{
          background: '#1a1625', borderRadius: '14px', padding: '16px',
          marginBottom: '20px', border: '1.5px solid rgba(139,27,255,0.2)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: '#999', fontWeight: '600', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '4px' }}>Expected Delivery</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>14–16 mins</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#00d97e', fontWeight: '600' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00d97e' }} />
              High delivery confidence tonight
            </div>
          </div>
          <div style={{ background: 'rgba(139,27,255,0.15)', borderRadius: '50%', padding: '12px' }}>
            <Zap size={22} color="#8B1BFF" fill="#8B1BFF" />
          </div>
        </div>

        {/* Quick Reorder */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>Quick Reorder</div>
          <div style={{
            background: '#1a1625', borderRadius: '10px', padding: '12px 14px',
            border: '1.5px solid rgba(255,255,255,0.08)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '3px' }}>Your Last Comfort Order</div>
              <div style={{ fontSize: '11px', color: '#999' }}>3 days ago · 2 items</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#8B1BFF' }}>₹189</span>
              <ChevronRight size={16} color="#666" />
            </div>
          </div>
        </div>

        {/* Comfort Shelf */}
        <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px', color: '#fff' }}>Midnight Comfort Picks</div>
        <div style={{ fontSize: '12px', color: '#999', marginBottom: '14px' }}>Long day? We've got you.</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
          {products.map(p => (
            <div key={p.id} style={{
              background: '#fff', borderRadius: '10px', overflow: 'hidden',
              position: 'relative'
            }}>
              {p.frozenSafe && (
                <div style={{
                  position: 'absolute', top: '6px', right: '6px',
                  background: 'rgba(0,217,126,0.15)', borderRadius: '6px',
                  padding: '3px 6px', border: '1px solid rgba(0,217,126,0.4)',
                  display: 'flex', alignItems: 'center', gap: '3px', zIndex: 5
                }}>
                  <Snowflake size={10} color="#00d97e" />
                  <span style={{ fontSize: '9px', fontWeight: '700', color: '#00d97e' }}>SAFE</span>
                </div>
              )}
              <div style={{ padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '44px', marginBottom: '8px' }}>{p.image}</div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#1a1625', marginBottom: '4px', lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginBottom: '8px' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: '9px', background: '#f5f5f5', color: '#666', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#1a1625', marginBottom: '8px' }}>₹{p.price}</div>
                {!cart[p.id] ? (
                  <button onClick={() => add(p.id)} style={{
                    width: '100%', background: '#8B1BFF', border: 'none',
                    borderRadius: '6px', padding: '8px', color: '#fff',
                    fontWeight: '700', fontSize: '11px', cursor: 'pointer'
                  }}>ADD</button>
                ) : (
                  <div style={{
                    width: '100%', background: '#8B1BFF', borderRadius: '6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}>
                    <button onClick={() => remove(p.id)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '16px', padding: '6px 10px', cursor: 'pointer', fontWeight: '700' }}>−</button>
                    <span style={{ color: '#fff', fontWeight: '700', fontSize: '12px' }}>{cart[p.id]}</span>
                    <button onClick={() => add(p.id)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '16px', padding: '6px 10px', cursor: 'pointer', fontWeight: '700' }}>+</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Win callouts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            "✅ Dark UI — easy on eyes at 11pm",
            "✅ Frozen-safe badge eliminates quality anxiety",
            "✅ Comfort shelf = 4 right picks, not 48",
            "✅ One-tap reorder — 4 fewer taps",
          ].map(c => (
            <div key={c} style={{
              background: 'rgba(0,217,126,0.08)', border: '1px solid rgba(0,217,126,0.2)',
              borderRadius: '8px', padding: '8px 12px',
              fontSize: '11px', fontWeight: '600', color: '#00d97e'
            }}>{c}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Comparison Page ──────────────────────────────────────────────────────────
const ComparisonPage = ({ onBack }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0416',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Top bar */}
      <div style={{
        background: '#111', borderBottom: '1px solid #222',
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(139,27,255,0.15)', border: '1px solid rgba(139,27,255,0.3)',
            color: '#8B1BFF', borderRadius: '8px', padding: '6px 14px',
            fontSize: '13px', fontWeight: '600', cursor: 'pointer'
          }}
        >
          ← Back to Prototype
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
            Zepto at 10pm — Before vs After
          </div>
          <div style={{ fontSize: '11px', color: '#666' }}>Same products. Different experience.</div>
        </div>
        <div style={{ width: '120px' }} />
      </div>

      {/* Column labels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{
          background: '#f8f8f8', padding: '10px 16px', textAlign: 'center',
          borderBottom: '3px solid #21C17E'
        }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#111' }}>😩 Zepto Today (10pm)</div>
          <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>Daytime UI, no context, full friction</div>
        </div>
        <div style={{
          background: '#1a0d2e', padding: '10px 16px', textAlign: 'center',
          borderBottom: '3px solid #8B1BFF'
        }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>😌 With Comfort Mode</div>
          <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>Night-adapted, curated, zero anxiety</div>
        </div>
      </div>

      {/* Split panels */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        flex: 1,
        overflow: 'hidden',
        height: 'calc(100vh - 112px)'
      }}>
        <div style={{ borderRight: '2px solid #333', overflowY: 'auto' }}>
          <BeforePanel />
        </div>
        <div style={{ overflowY: 'auto' }}>
          <AfterPanel />
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
