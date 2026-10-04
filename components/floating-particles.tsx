'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  life: number;
  maxLife: number;
  type: 'circle' | 'heart' | 'star';
}

interface FloatingParticlesProps {
  count?: number;
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
}

export default function FloatingParticles({
  count = 30,
  intensity = 'medium',
  color = '#D6B56A',
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const speedMult = intensity === 'low' ? 0.4 : intensity === 'high' ? 1.2 : 0.7;

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      size: Math.random() * 4 + 1,
      speedY: -(Math.random() * 0.8 + 0.3) * speedMult,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      life: 0,
      maxLife: Math.random() * 300 + 200,
      type: ['circle', 'circle', 'circle', 'heart', 'star'][Math.floor(Math.random() * 5)] as Particle['type'],
    });

    particlesRef.current = Array.from({ length: count }, createParticle);
    // Spread them across the screen initially
    particlesRef.current.forEach(p => {
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
    });

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.moveTo(0, -size / 4);
      ctx.bezierCurveTo(size / 2, -size, size, -size / 4, 0, size / 2);
      ctx.bezierCurveTo(-size, -size / 4, -size / 2, -size, 0, -size / 4);
      ctx.closePath();
      ctx.restore();
    };

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.1
          ? progress * 10 * p.opacity
          : progress > 0.8
            ? (1 - progress) * 5 * p.opacity
            : p.opacity;

        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = color;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size);
          ctx.fill();
        } else if (p.type === 'star') {
          drawStar(ctx, p.x, p.y, p.size);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        if (p.life >= p.maxLife || p.y < -50) {
          particlesRef.current[i] = createParticle();
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [count, intensity, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
