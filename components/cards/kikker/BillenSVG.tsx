interface BillenSVGProps {
  className?: string;
}

export default function BillenSVG({ className = "" }: BillenSVGProps) {
  return (
    <svg
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Playful billen illustration"
    >
      {/* Left cheek */}
      <ellipse cx="120" cy="110" rx="65" ry="70" fill="#FDDCCC" />
      {/* Right cheek */}
      <ellipse cx="180" cy="110" rx="65" ry="70" fill="#FDDCCC" />

      {/* Center line */}
      <path
        d="M150 50 Q148 100 150 175"
        stroke="#F0C4A8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Left blush */}
      <ellipse cx="100" cy="100" rx="18" ry="10" fill="#F8B4B4" opacity="0.5" />
      {/* Right blush */}
      <ellipse cx="200" cy="100" rx="18" ry="10" fill="#F8B4B4" opacity="0.5" />

      {/* Little stars / sparkles for fun */}
      <g fill="#E8C84A" opacity="0.7">
        <path d="M60 40 L63 48 L70 48 L64 53 L67 60 L60 56 L53 60 L56 53 L50 48 L57 48 Z" />
        <path d="M240 30 L242 36 L248 36 L243 39 L245 45 L240 42 L235 45 L237 39 L232 36 L238 36 Z" />
        <path d="M250 140 L252 146 L258 146 L253 149 L255 155 L250 152 L245 155 L247 149 L242 146 L248 146 Z" />
        <path d="M45 150 L47 156 L53 156 L48 159 L50 165 L45 162 L40 165 L42 159 L37 156 L43 156 Z" />
      </g>
    </svg>
  );
}
