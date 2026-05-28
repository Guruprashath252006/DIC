import React, { useEffect, useRef } from 'react';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const Squares = ({
  direction = 'right',
  speed = 0.5,
  borderColor = 'rgba(184, 154, 66, 0.1)',
  squareSize = 52,
  accentColor = '184, 154, 66'
}) => {
  const canvasRef = useRef(null);
  const gridOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let reducedMotion = false;
    let lastTimestamp = 0;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateReducedMotion = () => {
      reducedMotion = mediaQuery.matches;
    };

    updateReducedMotion();

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGrid = () => {
      const axisStep = reducedMotion ? 0 : speed;

      if (direction === 'right') gridOffset.current.x = (gridOffset.current.x + axisStep) % squareSize;
      if (direction === 'left') gridOffset.current.x = (gridOffset.current.x - axisStep + squareSize) % squareSize;
      if (direction === 'up') gridOffset.current.y = (gridOffset.current.y - axisStep + squareSize) % squareSize;
      if (direction === 'down') gridOffset.current.y = (gridOffset.current.y + axisStep) % squareSize;

      const { x: offsetX, y: offsetY } = gridOffset.current;

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      for (let y = offsetY; y < height + squareSize; y += squareSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      for (let x = offsetX; x < width + squareSize; x += squareSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      return { offsetX, offsetY };
    };

    const drawNodes = (offsetX, offsetY, time) => {
      ctx.fillStyle = `rgba(${accentColor}, 0.18)`;

      for (let x = offsetX; x < width + squareSize; x += squareSize * 4) {
        for (let y = offsetY; y < height + squareSize; y += squareSize * 4) {
          const pulse = reducedMotion ? 0.55 : 0.35 + (Math.sin((x + y) * 0.01 + time * 0.0012) + 1) * 0.16;
          ctx.globalAlpha = clamp(pulse, 0.12, 0.48);
          ctx.beginPath();
          ctx.arc(x, y, 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    const draw = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      lastTimestamp = timestamp;

      ctx.clearRect(0, 0, width, height);
      const { offsetX, offsetY } = drawGrid();
      drawNodes(offsetX, offsetY, timestamp);

      animationFrameId = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateReducedMotion);
    } else {
      mediaQuery.addListener(updateReducedMotion);
    }

    animationFrameId = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);

      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', updateReducedMotion);
      } else {
        mediaQuery.removeListener(updateReducedMotion);
      }

      window.cancelAnimationFrame(animationFrameId);
    };
  }, [accentColor, borderColor, direction, speed, squareSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        background: 'transparent'
      }}
    />
  );
};

export default Squares;
