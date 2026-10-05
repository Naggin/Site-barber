export function Gallery({ photos }) {
  return (
    <section className="gallery" id="galeria" aria-labelledby="gallery-title">
      <div className="gallery__header container" data-reveal>
        <p className="section-label">NO DETALHE</p>
        <h2 className="section-heading" id="gallery-title">O TRABALHO EM CENA.</h2>
      </div>
      <div className="filmstrip">
        {photos.map((photo, index) => (
          <figure className="gallery__item" key={photo.src} data-reveal data-reveal-delay={index % 3 + 1}>
            <img
              className="filmstrip__image gallery__image"
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
      </div>
      <p className="gallery__caption container">Cada pessoa, um estilo. Cada ocasião, um cuidado.</p>
    </section>
  );
}
