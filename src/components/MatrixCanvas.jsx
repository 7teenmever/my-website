import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const MATRIX_CHARS = 'アイウエオカキクケコ0123456789ABCDEF<>{}[]|/\\';
const THEME_COLORS = {
  dark: { meta: '#050508', char: '#00d4ff', trail: 'rgba(5, 5, 8, 0.08)' },
  light: { meta: '#f0f4ff', char: '#0093d1', trail: 'rgba(240, 244, 255, 0.18)' }
};

export default function MatrixCanvas() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const matrixState = useRef({
    frame: 0,
    lastFrame: 0,
    fontSize: 14,
    columns: 0,
    drops: [],
    running: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resizeCanvas() {
      if (prefersReducedMotion || window.innerWidth < 640) {
        canvas.width = 0;
        canvas.height = 0;
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      matrixState.current.columns = Math.floor(window.innerWidth / matrixState.current.fontSize);
      matrixState.current.drops = Array.from(
        { length: matrixState.current.columns },
        () => Math.ceil(Math.random() * 24)
      );
    }

    function drawMatrix(timestamp) {
      if (!matrixState.current.running || !canvas.width || !canvas.height) return;

      if (timestamp - matrixState.current.lastFrame < 55) {
        matrixState.current.frame = requestAnimationFrame(drawMatrix);
        return;
      }

      matrixState.current.lastFrame = timestamp;
      ctx.fillStyle = THEME_COLORS[theme].trail;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = THEME_COLORS[theme].char;
      ctx.font = `${matrixState.current.fontSize}px "JetBrains Mono", monospace`;

      matrixState.current.drops.forEach((drop, index) => {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = index * matrixState.current.fontSize;
        const y = drop * matrixState.current.fontSize;

        ctx.fillText(char, x, y);

        if (y > window.innerHeight && Math.random() > 0.975) {
          matrixState.current.drops[index] = 0;
        } else {
          matrixState.current.drops[index] += 1;
        }
      });

      matrixState.current.frame = requestAnimationFrame(drawMatrix);
    }

    function startMatrix() {
      if (prefersReducedMotion || document.hidden || window.innerWidth < 640) {
        matrixState.current.running = false;
        if (matrixState.current.frame) {
          cancelAnimationFrame(matrixState.current.frame);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      matrixState.current.running = true;
      matrixState.current.lastFrame = 0;
      matrixState.current.frame = requestAnimationFrame(drawMatrix);
    }

    resizeCanvas();
    startMatrix();
    function handleResize() {
      resizeCanvas();
      startMatrix();
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        matrixState.current.running = false;
        if (matrixState.current.frame) cancelAnimationFrame(matrixState.current.frame);
      } else {
        startMatrix();
      }
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () =>veEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      matrixState.current.running = false;
      if (matrixState.current.frame) cancelAnimationFrame(matrixState.current.frame);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      id="matrix-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
