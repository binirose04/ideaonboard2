export default function Lightbox({ lightbox, closeLightbox }) {
  if (!lightbox) return null;

  return (
    <div className="lightbox-overlay active" onClick={closeLightbox}>
      <button type="button" className="lightbox-close" aria-label="Close preview" onClick={closeLightbox}>
        ×
      </button>
      <img id="lightboxImage" src={lightbox.src} alt={lightbox.alt} onClick={(event) => event.stopPropagation()} />
    </div>
  );
}
