import { InkMarks, InkSignature } from './InkSignature.jsx';
import { useGalleryMotion } from '../hooks/useGalleryMotion.js';

export function Gallery({ photos }) {
  const {
    motionAllowed,
    paused,
    viewportRef,
    groupRef,
    togglePaused,
    pause,
    onMouseEnter,
    onMouseLeave,
    onWheel,
  } = useGalleryMotion();

  const renderPhotos = (copy = false) => photos.map((photo) => (
    <figure className="gallery__item" key={photo.src}>
      <img
        className="filmstrip__image gallery__image"
        src={photo.src}
        alt={copy ? '' : photo.alt}
        width={photo.width}
        height={photo.height}
        loading="lazy"
        decoding="async"
      />
    </figure>
  ));

  return (
    <section className="gallery" id="galeria" aria-labelledby="gallery-title">
      <div className="gallery__masthead">
        <div className="gallery__header container" data-reveal>
          <div className="gallery__heading">
            <p className="section-label">NO DETALHE</p>
            <h2 className="section-heading" id="gallery-title">O TRABALHO EM CENA.</h2>
          </div>
          <InkSignature className="gallery__signature" />
          <InkMarks className="gallery__marks" />
        </div>
      </div>
      <div
        className={`filmstrip${motionAllowed ? ' filmstrip--moving' : ''}`}
        ref={viewportRef}
        role="region"
        aria-label="Galeria de atendimentos de Jean Kreuz"
        tabIndex={motionAllowed ? 0 : undefined}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={pause}
        onPointerDown={pause}
        onWheel={onWheel}
        data-reveal
      >
        <div className="filmstrip__track">
          <div className="filmstrip__group" ref={groupRef}>
            {renderPhotos()}
          </div>
          <div className="filmstrip__group filmstrip__group--copy" aria-hidden="true">
            {renderPhotos(true)}
          </div>
        </div>
      </div>
      <div className="gallery__footer container">
        <p className="gallery__caption">Cada pessoa, um estilo. Cada ocasião, um cuidado.</p>
        {motionAllowed && (
          <button
            className="gallery__motion-toggle"
            type="button"
            aria-pressed={paused}
            onClick={togglePaused}
          >
            {paused ? 'Retomar fotos' : 'Pausar fotos'}
          </button>
        )}
      </div>
    </section>
  );
}
