import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const getETAInfo = (date) => {
  const hour = date.getHours();
  if (hour >= 22 || hour < 6) {
    return { time: "14–16 mins", confidence: "High delivery confidence tonight" };
  }
  return { time: "10–12 mins", confidence: "Express delivery available" };
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
