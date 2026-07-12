import React from 'react';
import { motion } from 'framer-motion';

const InteractiveGrid = () => {
  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        opacity: 0.4
      }}
      aria-hidden="true"
    >
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(184, 154, 66, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(184, 154, 66, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <motion.div 
        animate={{
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(184, 154, 66, 0.04) 0%, transparent 50%)'
        }}
      />
    </div>
  );
};

export default InteractiveGrid;
