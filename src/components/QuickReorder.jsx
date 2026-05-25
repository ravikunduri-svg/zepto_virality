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
