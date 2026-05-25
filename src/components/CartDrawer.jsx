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
        {/* Drag handle */}
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
              fontSize: '18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
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
