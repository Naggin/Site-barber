export function InkSignature({ className = '', compact = false, word = 'Kreuz' }) {
  const classes = `ink-signature${compact ? ' ink-signature--compact' : ''}${className ? ` ${className}` : ''}`;

  return (
    <span className={classes} aria-hidden="true">
      <span className="ink-signature__word">{word}</span>
      <svg
        className="ink-signature__underline"
        viewBox="0 0 250 55"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
      >
        <path
          d="M9 24C38 18 57 21 82 17C111 13 130 20 158 15C187 10 208 14 239 8"
          strokeWidth="4"
          pathLength="1"
        />
        <path
          d="M20 34C47 28 60 34 87 29C119 24 137 31 167 25C188 21 212 24 228 19"
          strokeWidth="2.5"
          pathLength="1"
        />
        <path
          d="M223 32C223 29 225 26 225 26C225 26 228 30 228 33C228 37 223 37 223 32ZM234 22C234 20 236 18 236 18C236 18 238 21 238 23C238 26 234 26 234 22ZM212 43C212 41 214 38 214 38C214 38 216 41 216 43C216 46 212 46 212 43Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    </span>
  );
}

export function InkMarks({ className = '' }) {
  return (
    <svg
      className={`ink-marks${className ? ` ${className}` : ''}`}
      viewBox="0 0 120 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M13 11L31 30M29 9L15 31M47 22L60 35M58 20L46 37" />
      <path d="M11 54L41 52M49 51L68 49M77 48L101 46" />
      <path d="M20 66L37 65M45 64L83 61M93 60L108 58" strokeWidth="1.5" />
    </svg>
  );
}
