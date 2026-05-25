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

        {!hasItem ? (
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            style={{
              width: '100%', background: '#8B1BFF', border: 'none',
              borderRadius: '8px', padding: '10px', color: '#fff',
              fontWeight: '700', fontSize: '12px', cursor: 'pointer',
              transition: 'background 0.2s ease', letterSpacing: '0.3px'
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
