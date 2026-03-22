"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./ProductOverview.module.css";

const FALLBACK_IMGS = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  "https://images.unsplash.com/photo-1590504805261-29a56cc04b06?w=900&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80",
];

export default function ProductGalleryClient({ product }) {
  const { name = "Product", image, images = [] } = product || {};

  // Collect all unique images
  const allImgs = [image, ...images]
    .filter(Boolean)
    .filter((img, idx, arr) => arr.indexOf(img) === idx);

  // Pad gallery grid with fallbacks
  const displayImgs = [
    allImgs[0] || FALLBACK_IMGS[0],
    allImgs[1] || FALLBACK_IMGS[1],
    allImgs[2] || FALLBACK_IMGS[2],
  ];

  // Lightbox uses all real images, or fallbacks if none
  const lightboxImgs = allImgs.length > 0 ? allImgs : FALLBACK_IMGS;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const openLightbox = useCallback((idx = 0) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prev = useCallback(
    () => setLightboxIdx((i) => (i - 1 + lightboxImgs.length) % lightboxImgs.length),
    [lightboxImgs.length]
  );

  const next = useCallback(
    () => setLightboxIdx((i) => (i + 1) % lightboxImgs.length),
    [lightboxImgs.length]
  );

  // Keyboard navigation + body scroll lock
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, closeLightbox, prev, next]);

  return (
    <>
      {/* ── Gallery Grid ── */}
      <div className={styles.gallery}>
        {/* Large main image */}
        <div
          className={styles.galleryMain}
          onClick={() => openLightbox(0)}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={displayImgs[0]}
            alt={`${name} main view`}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className={styles.galleryImg}
          />
          <div className={styles.galleryMainOverlay} />
          <div className={styles.galleryLabel}>
            <span>{name}</span>
          </div>
        </div>

        {/* Two stacked thumbnails */}
        <div className={styles.galleryStack}>
          <div
            className={styles.galleryThumb}
            onClick={() => openLightbox(Math.min(1, lightboxImgs.length - 1))}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={displayImgs[1]}
              alt={`${name} detail view`}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className={styles.galleryImg}
            />
          </div>
          <div
            className={styles.galleryThumb}
            onClick={() => openLightbox(0)}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={displayImgs[2]}
              alt={`${name} interior view`}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className={styles.galleryImg}
            />
            <div
              className={styles.thumbOverlay}
              onClick={(e) => {
                e.stopPropagation();
                openLightbox(0);
              }}
            >
              <span className={styles.thumbOverlayText}>View Gallery</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3.5 8h9M8.5 4l4 4-4 4"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      {lightboxOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              zIndex: 10000,
            }}
            aria-label="Close gallery"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Counter */}
          <div
            style={{
              position: "absolute",
              top: 24,
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.7)",
              fontSize: 13,
              fontFamily: "Sora, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            {lightboxIdx + 1} / {lightboxImgs.length}
          </div>

          {/* Prev button */}
          {lightboxImgs.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              style={{
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
              }}
              aria-label="Previous image"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M11 4L6 9l5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {/* Main image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(90vw, 1000px)",
              height: "min(80vh, 700px)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Image
              src={lightboxImgs[lightboxIdx]}
              alt={`${name} image ${lightboxIdx + 1}`}
              fill
              sizes="90vw"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* Next button */}
          {lightboxImgs.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              style={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
              }}
              aria-label="Next image"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M7 4l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {/* Thumbnail strip */}
          {lightboxImgs.length > 1 && (
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 8,
                maxWidth: "90vw",
                overflowX: "auto",
                padding: "4px 8px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxImgs.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  style={{
                    position: "relative",
                    width: 60,
                    height: 44,
                    borderRadius: 6,
                    overflow: "hidden",
                    cursor: "pointer",
                    border:
                      i === lightboxIdx
                        ? "2px solid #b0742e"
                        : "2px solid rgba(255,255,255,0.2)",
                    flexShrink: 0,
                    transition: "border-color 0.2s",
                  }}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    sizes="60px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
