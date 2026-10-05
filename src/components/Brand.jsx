export function Brand({ name = 'KREUZ BARBER', onClick }) {
  return (
    <a className="brand" href="#inicio" aria-label={`${name} — início`} onClick={onClick}>
      <span className="brand__line">KREUZ</span>
      <span className="brand__line">BARBER</span>
    </a>
  );
}
