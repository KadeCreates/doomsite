'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Smooth spring animations for cursor
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorSize = useSpring(32, { stiffness: 300, damping: 20 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    document.body.classList.add('custom-cursor');

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Update CSS variable for gradient
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
      document.body.classList.add('cursor-active');
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
        cursorSize.set(64);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovering(false);
        cursorSize.set(32);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      cursorSize.set(24);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      cursorSize.set(isHovering ? 64 : 32);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('custom-cursor', 'cursor-active');
    };
  }, [isHovering, cursorX, cursorY, cursorSize]);

  return (
    <>
      {/* Outer ring with glassmorphism */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorSize,
          height: cursorSize,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div 
          className="w-full h-full rounded-full relative"
          animate={{
            borderColor: isHovering ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.4)',
            borderWidth: isHovering ? '2px' : '1px',
          }}
          style={{
            border: '1px solid rgba(255, 255, 255, 0.4)',
            background: isHovering ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            backdropFilter: isHovering ? 'blur(4px)' : 'none',
          }}
        >
          {/* Rotating border effect on hover */}
          {isHovering && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovering ? 0 : (isClicking ? 0.7 : 1),
          opacity: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      </motion.div>

      {/* Trail effect on click */}
      {isClicking && (
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-screen"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      )}
    </>
  );
}
