import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  rotation: number;
  shape: 'circle' | 'square' | 'heart' | 'star';
}

const colors = [
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#06B6D4', // Cyan
  '#6366F1', // Indigo
];

const shapes: ('circle' | 'square' | 'heart' | 'star')[] = ['circle', 'square', 'heart', 'star'];

// Deterministic particles for zero hydration mismatch and ultra-clean rendering
const PARTICLES: Particle[] = Array.from({ length: 32 }).map((_, index) => ({
  id: index,
  x: ((index * 29) % 90) + 5,
  y: ((index * 37) % 65) + 10,
  size: (index % 8) + 8,
  color: colors[index % colors.length],
  delay: (index % 6) * 0.1,
  rotation: (index * 47) % 360,
  shape: shapes[index % shapes.length],
}));

export default function ConfettiCelebration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float-slow"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          {p.shape === 'circle' && (
            <div
              className="rounded-full shadow-sm"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                opacity: 0.85,
              }}
            />
          )}
          {p.shape === 'square' && (
            <div
              className="rounded-xs rotate-45 shadow-sm"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                opacity: 0.85,
              }}
            />
          )}
          {p.shape === 'heart' && (
            <Heart
              style={{
                width: `${p.size + 4}px`,
                height: `${p.size + 4}px`,
                color: p.color,
                fill: p.color,
                opacity: 0.85,
              }}
            />
          )}
          {p.shape === 'star' && (
            <Sparkles
              style={{
                width: `${p.size + 4}px`,
                height: `${p.size + 4}px`,
                color: p.color,
                opacity: 0.85,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
