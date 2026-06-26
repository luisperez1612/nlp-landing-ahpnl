export function BadgeSVG() {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AHPNL Badge"
    >
      {/* Outer gold ring */}
      <circle cx="90" cy="90" r="88" fill="#1a2744" stroke="#D4AF37" strokeWidth="4" />
      {/* Inner decorative ring */}
      <circle cx="90" cy="90" r="78" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="4 3" />

      {/* Stars top */}
      <text x="90" y="38" textAnchor="middle" fill="#D4AF37" fontSize="10" letterSpacing="6" fontFamily="serif">★ ★ ★</text>

      {/* Flame / torch icon */}
      <g transform="translate(78, 44)">
        <path
          d="M12 2C12 2 7 8 7 13c0 2.8 2.2 5 5 5s5-2.2 5-5C17 8 12 2 12 2z
             M10 15c0 1.1.9 2 2 2s2-.9 2-2-2-4-2-4-2 2.9-2 4z"
          fill="#D4AF37"
        />
        {/* Torch handle */}
        <rect x="10.5" y="18" width="3" height="8" rx="1" fill="#D4AF37" />
        <rect x="8" y="24" width="8" height="2" rx="1" fill="#D4AF37" />
      </g>

      {/* Main text */}
      <text
        x="90"
        y="108"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="22"
        fontWeight="bold"
        fontFamily="Georgia, serif"
        letterSpacing="3"
      >
        AHPNL
      </text>

      {/* Tagline */}
      <text x="90" y="128" textAnchor="middle" fill="#D4AF37" fontSize="8" letterSpacing="2" fontFamily="sans-serif">
        NLP &amp; PRINCIPIOS
      </text>
      <text x="90" y="140" textAnchor="middle" fill="#D4AF37" fontSize="8" letterSpacing="2" fontFamily="sans-serif">
        PARA TU ÉXITO
      </text>

      {/* Stars bottom */}
      <text x="90" y="158" textAnchor="middle" fill="#D4AF37" fontSize="10" letterSpacing="6" fontFamily="serif">★ ★ ★</text>
    </svg>
  )
}
