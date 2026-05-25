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
