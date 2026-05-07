import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth but fast spring for the trail
  const trailX = useSpring(mouseX, { damping: 40, stiffness: 300 });
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('.hoverable') ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  // Modern minimalist arrow path
  const arrowPath = "M4 0L16.5 12.5L10 13.5L15 20L12.5 21.5L7.5 15L4 18V0Z";

  return (
    <div className="custom-cursor-container">
      {/* Trailing Ghost Arrow */}
      <motion.div
        className="custom-cursor-trail"
        style={{
          x: trailX,
          y: trailY,
          opacity: isHovering ? 0 : 0.3
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d={arrowPath} stroke="var(--accent)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Main Arrow */}
      <motion.div
        className={`custom-cursor-arrow ${isHovering ? 'hovering' : ''}`}
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d={arrowPath} fill="var(--accent)" />
          <path d="M5 2L14 11L9.5 11.5L13.5 18L11.5 19L7.5 13L5 15V2Z" fill="rgba(255,255,255,0.2)" />
        </svg>
        
        {/* Expansion on hover */}
        {isHovering && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            className="cursor-hover-ring"
          />
        )}
      </motion.div>
    </div>
  );
};

export default CustomCursor;
