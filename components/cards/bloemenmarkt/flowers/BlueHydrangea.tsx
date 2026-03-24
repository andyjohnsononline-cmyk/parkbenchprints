interface BlueHydrangeaProps {
  className?: string;
}

export default function BlueHydrangea({ className = "" }: BlueHydrangeaProps) {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Blue hydrangea illustration">
      {/* Stem */}
      <path fill="#5a8a50" d="M58,95 Q56,120 54,145 Q53,150 57,150 Q61,150 60,145 Q62,120 60,95Z"/>
      {/* Leaf */}
      <path fill="#6aaa5e" d="M57,115 Q40,105 35,115 Q32,122 42,120 Q50,118 57,120Z"/>
      <path fill="#5a9a4e" d="M61,120 Q75,112 78,120 Q80,126 72,124 Q65,122 61,124Z"/>
      {/* Flower cluster - large round hydrangea head */}
      <g>
        {/* Background cluster shape */}
        <ellipse cx="59" cy="55" rx="38" ry="36" fill="#7baed4"/>
        {/* Individual florets */}
        <circle cx="42" cy="40" r="8" fill="#8fc0e0"/>
        <circle cx="58" cy="35" r="9" fill="#6fa8d4"/>
        <circle cx="74" cy="42" r="8" fill="#8bb8d8"/>
        <circle cx="35" cy="55" r="7" fill="#6da4cc"/>
        <circle cx="50" cy="50" r="9" fill="#7cb4dc"/>
        <circle cx="66" cy="48" r="8" fill="#5e9ac4"/>
        <circle cx="80" cy="56" r="7" fill="#7aaed0"/>
        <circle cx="40" cy="68" r="8" fill="#88bcd8"/>
        <circle cx="56" cy="65" r="9" fill="#6ca6d0"/>
        <circle cx="72" cy="66" r="8" fill="#80b6d8"/>
        <circle cx="48" cy="78" r="7" fill="#74aed4"/>
        <circle cx="64" cy="78" r="7" fill="#8ec2e0"/>
        {/* Center highlights */}
        <circle cx="50" cy="50" r="3" fill="#a8d4ec" opacity="0.7"/>
        <circle cx="66" cy="48" r="2.5" fill="#a8d4ec" opacity="0.6"/>
        <circle cx="56" cy="65" r="3" fill="#9ccce4" opacity="0.7"/>
        <circle cx="42" cy="40" r="2.5" fill="#b0daf0" opacity="0.5"/>
        <circle cx="72" cy="66" r="2" fill="#a0d0e8" opacity="0.6"/>
      </g>
    </svg>
  );
}
