import React from 'react';

interface BalloonProps {
  size: number;
  color: string;
  glowColor: string;
}

export default function Balloon({ size, color, glowColor }: BalloonProps) {
  // Generate a safe unique key for gradient references
  const gradId = React.useMemo(() => `glow-${color.replace('#', '')}`, [color]);

  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 100 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none drop-shadow-xl"
    >
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="45%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={glowColor} />
        </radialGradient>
      </defs>

      {/* Main Balloon Egg Shape and Tri-knot */}
      <path
        d="M50 10C24 10 6 28 6 56C6 84 24 105 45 109V113L40 115V120H60V115L55 113V109C76 105 94 84 94 56C94 28 76 10 50 10Z"
        fill={`url(#${gradId})`}
      />

      {/* String at the bottom */}
      <path
        d="M50 120C45 132 55 142 50 156"
        stroke="#94a3b8"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Highlights for 3D realism */}
      <ellipse
        cx="30"
        cy="30"
        rx="6"
        ry="10"
        transform="rotate(-25 30 30)"
        fill="#ffffff"
        opacity="0.45"
      />
    </svg>
  );
}
