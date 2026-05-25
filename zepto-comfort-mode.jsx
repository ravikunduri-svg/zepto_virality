import React, { useState, useEffect } from 'react';
import { ShoppingBag, Clock, Snowflake, Star, ChevronRight, Zap, Heart, Moon } from 'lucide-react';

// Design Direction: Zepto brand identity with late-night comfort adaptation
// Brand Colors: Zepto Purple (#8B1BFF), complemented with midnight blues for night mode
// Typography: Clean, modern sans-serif matching Zepto's minimalist aesthetic
// Approach: Maintain Zepto's bright, energetic feel but adapted for calming late-night use

const ZeptoComfortMode = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isComfortMode, setIsComfortMode] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for comfort products
  const comfortShelf = {
    title: "Midnight Comfort Picks",
    subtitle: "Long day? We've got you.",
    items: [
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
    ]
  };

  // Mock previous orders for repeat functionality
  const previousComfortOrders = [
    {
      id: "order_1",
      name: "Your Last Comfort Order",
      date: "3 days ago",
      items: ["Amul Butterscotch Ice Cream", "Lay's Classic Salted"],
      total: 189,
      itemCount: 2
    },
    {
      id: "order_2", 
      name: "Friday Night Combo",
      date: "Last Friday",
      items: ["Maggi Noodles", "Cadbury Silk", "Pepsi"],
      total: 256,
      itemCount: 3
    }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    setSelectedProduct(product);
    setTimeout(() => setSelectedProduct(null), 2000);
  };

  const reorderPrevious = (order) => {
    // Simulate reordering
    alert(`Reordering "${order.name}" (${order.itemCount} items, ₹${order.total})`);
  };

  const getETAMessage = () => {
    const hour = currentTime.getHours();
    if (hour >= 22 || hour < 6) {
      return {
        time: "14-16 mins",
        confidence: "High delivery confidence tonight",
        icon: "🌙"
      };
    }
    return {
      time: "10-12 mins",
      confidence: "Express delivery available",
      icon: "⚡"
    };
  };

  const etaInfo = getETAMessage();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a0d2e 0%, #0a0416 100%)',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Zepto purple ambient glow - subtle for night mode */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle at 30% 50%, rgba(139, 27, 255, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
        animation: 'pulse 8s ease-in-out infinite'
      }} />

      {/* Header - Zepto branded */}
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
            letterSpacing: '-1px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui'
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
        
        {/* Cart indicator - Zepto purple */}
        <div style={{
          position: 'relative',
          background: 'rgba(139, 27, 255, 0.12)',
          borderRadius: '12px',
          padding: '10px 18px',
          border: '1.5px solid rgba(139, 27, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <ShoppingBag size={20} color="#8B1BFF" />
          {cart.length > 0 && (
            <span style={{ 
              fontSize: '14px', 
              fontWeight: '700', 
              color: '#8B1BFF' 
            }}>
              {cart.length}
            </span>
          )}
        </div>
      </header>

      {/* Confidence ETA Banner - MUST HAVE #4 - Zepto styled */}
      <div style={{
        position: 'relative',
        zIndex: 10,
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
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '11px',
            color: '#999',
            marginBottom: '8px',
            fontWeight: '600',
            letterSpacing: '0.8px',
            textTransform: 'uppercase'
          }}>
            Expected Delivery
          </div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '6px',
            letterSpacing: '-0.5px'
          }}>
            {etaInfo.time}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#00d97e',
            fontWeight: '600'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#00d97e',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
            {etaInfo.confidence}
          </div>
        </div>
        <div style={{
          background: 'rgba(139, 27, 255, 0.15)',
          borderRadius: '50%',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Zap size={28} color="#8B1BFF" fill="#8B1BFF" />
        </div>
      </div>

      {/* ONE-TAP REPEAT ORDERS - MUST HAVE #2 - Zepto styled */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        marginBottom: '32px'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '700',
          marginBottom: '16px',
          color: '#fff',
          letterSpacing: '-0.3px'
        }}>
          Quick Reorder
        </h2>
        
        <div style={{
          display: 'grid',
          gap: '12px'
        }}>
          {previousComfortOrders.map(order => (
            <div
              key={order.id}
              onClick={() => reorderPrevious(order)}
              style={{
                background: '#1a1625',
                borderRadius: '12px',
                padding: '16px',
                border: '1.5px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
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
                <div style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  marginBottom: '6px',
                  color: '#fff'
                }}>
                  {order.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#999',
                  marginBottom: '8px'
                }}>
                  {order.date} • {order.itemCount} items
                </div>
                <div style={{
                  fontSize: '15px',
                  color: '#8B1BFF',
                  fontWeight: '700'
                }}>
                  ₹{order.total}
                </div>
              </div>
              <ChevronRight size={20} color="#666" />
            </div>
          ))}
        </div>
      </section>

      {/* LATE-NIGHT COMFORT SHELF - MUST HAVE #1 - Zepto styled */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        marginBottom: '32px'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            marginBottom: '6px',
            color: '#fff',
            letterSpacing: '-0.4px'
          }}>
            {comfortShelf.title}
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#999',
            fontWeight: '500'
          }}>
            {comfortShelf.subtitle}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))',
          gap: '12px'
        }}>
          {comfortShelf.items.map(item => (
            <div
              key={item.id}
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
              onClick={() => addToCart(item)}
            >
              {/* FROZEN-SAFE CONFIDENCE BADGE - MUST HAVE #3 - Zepto styled */}
              {item.frozenSafe && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(0, 217, 126, 0.12)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '8px',
                  padding: '4px 8px',
                  border: '1px solid rgba(0, 217, 126, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  zIndex: 5
                }}>
                  <Snowflake size={12} color="#00d97e" />
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    color: '#00d97e',
                    letterSpacing: '0.3px'
                  }}>
                    SAFE
                  </span>
                </div>
              )}

              <div style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '56px',
                  marginBottom: '12px',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}>
                  {item.image}
                </div>
                
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#1a1625',
                  lineHeight: '1.3',
                  minHeight: '34px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.name}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '4px',
                  marginBottom: '10px',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '10px',
                      color: '#666',
                      background: '#f5f5f5',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontWeight: '600'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1a1625',
                  marginBottom: '12px'
                }}>
                  ₹{item.price}
                </div>

                <button style={{
                  width: '100%',
                  background: '#8B1BFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.3px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#7a17e6';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#8B1BFF';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
                >
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTWEIGHT EMOTIONAL MICROCOPY - SHOULD HAVE #5 */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '24px 16px',
        opacity: 0.6
      }}>
        <div style={{
          fontSize: '13px',
          color: '#999',
          fontWeight: '500',
          marginBottom: '6px'
        }}>
          Late-night essentials.
        </div>
        <div style={{
          fontSize: '12px',
          color: '#666'
        }}>
          Comfort arriving soon.
        </div>
      </div>

      {/* Toast notification - Zepto branded */}
      {selectedProduct && (
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
          zIndex: 100,
          animation: 'slideUp 0.3s ease-out',
          boxShadow: '0 8px 32px rgba(139, 27, 255, 0.4)'
        }}>
          <Heart size={18} color="#fff" fill="#fff" />
          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#fff'
          }}>
            Added to cart
          </span>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default ZeptoComfortMode;
