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
