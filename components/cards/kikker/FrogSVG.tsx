interface FrogSVGProps {
  className?: string;
}

export default function FrogSVG({ className = "" }: FrogSVGProps) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Frog illustration"
    >
      {/* Body */}
      <ellipse cx="100" cy="140" rx="60" ry="50" fill="#6DB356" />

      {/* Belly */}
      <ellipse cx="100" cy="150" rx="40" ry="32" fill="#A8D98A" />

      {/* Left eye bulge */}
      <circle cx="70" cy="85" r="24" fill="#6DB356" />
      {/* Right eye bulge */}
      <circle cx="130" cy="85" r="24" fill="#6DB356" />

      {/* Left eyeball */}
      <circle cx="70" cy="82" r="16" fill="white" />
      <circle cx="73" cy="80" r="8" fill="#1A1A1A" />
      <circle cx="76" cy="77" r="3" fill="white" />

      {/* Right eyeball */}
      <circle cx="130" cy="82" r="16" fill="white" />
      <circle cx="133" cy="80" r="8" fill="#1A1A1A" />
      <circle cx="136" cy="77" r="3" fill="white" />

      {/* Mouth (big happy grin) */}
      <path
        d="M65 130 Q100 160 135 130"
        stroke="#3D7A2A"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Nostrils */}
      <circle cx="88" cy="110" r="3" fill="#3D7A2A" />
      <circle cx="112" cy="110" r="3" fill="#3D7A2A" />

      {/* Left front leg */}
      <path
        d="M50 155 Q30 175 25 190 Q30 192 38 188 Q36 194 44 190 Q42 196 50 192 L55 175"
        fill="#5DA348"
      />

      {/* Right front leg */}
      <path
        d="M150 155 Q170 175 175 190 Q170 192 162 188 Q164 194 156 190 Q158 196 150 192 L145 175"
        fill="#5DA348"
      />

      {/* Left back leg */}
      <ellipse cx="55" cy="180" rx="20" ry="10" fill="#5DA348" />

      {/* Right back leg */}
      <ellipse cx="145" cy="180" rx="20" ry="10" fill="#5DA348" />

      {/* Cheek blush */}
      <ellipse cx="58" cy="120" rx="12" ry="6" fill="#F4A7A7" opacity="0.4" />
      <ellipse cx="142" cy="120" rx="12" ry="6" fill="#F4A7A7" opacity="0.4" />

      {/* Crown / party hat for 1 April */}
      <path
        d="M75 70 L85 40 L100 60 L115 35 L125 70"
        fill="#E8C84A"
        stroke="#D4A730"
        strokeWidth="1.5"
      />
      <circle cx="85" cy="40" r="4" fill="#E85D5D" />
      <circle cx="115" cy="35" r="4" fill="#5D8BE8" />
      <circle cx="100" cy="60" r="3" fill="#E85D5D" />
    </svg>
  );
}
