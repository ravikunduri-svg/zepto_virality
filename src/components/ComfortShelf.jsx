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
