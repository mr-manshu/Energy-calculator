import { motion } from 'framer-motion';

export default function CircuitAnimation({ progress }) {
  return (
    <div style={{ margin: '2rem 0' }}>
      <h2 style={{ color: '#7c3aed', marginBottom: '0.5rem' }}>Circuit Progress</h2>
      <div style={{
        backgroundColor: '#334155',
        borderRadius: '999px',
        overflow: 'hidden',
        height: '20px',
      }}>
        <motion.div
          style={{
            height: '100%',
            backgroundColor: '#7c3aed',
            width: `${progress}%`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
}