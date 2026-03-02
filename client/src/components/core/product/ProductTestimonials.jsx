"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./ProductTestimonials.module.css";

const AVATAR_FALLBACKS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
];

const MOCK_TESTIMONIALS = [
  {
    name: "Rajesh Mehta",
    company: "Mehta Constructions Pvt. Ltd.",
    role: "Project Director",
    message:
      "Invent Elevator delivered beyond our expectations. The installation was seamless, and the build quality is exceptional. Our clients are extremely satisfied with the smooth operation and elegant cabin finish.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    rating: 5,
  },
  {
    name: "Anita Sharma",
    company: "Greenfield Residences",
    role: "Head of Operations",
    message:
      "We've installed Invent lifts across three of our residential towers. The low maintenance requirement and energy efficiency have saved us significantly. Their after-sales support is prompt and professional.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    rating: 5,
  },
  {
    name: "David Thompson",
    company: "Thompson Logistics Hub",
    role: "Facility Manager",
    message:
      "Our cargo lift has been running for over two years without a single issue. The load capacity is exactly as advertised, and the hydraulic system operates whisper-quiet. Highly recommended for industrial use.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
    rating: 5,
  },
  {
    name: "Priya Nair",
    company: "Skyline Architects",
    role: "Principal Architect",
    message:
      "As an architect, I value products that integrate well with design intent. Invent Elevator's panoramic models fit perfectly into our contemporary projects. The customisation options are extensive and the team is highly collaborative.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
    rating: 5,
  },
];

function StarRating({ rating = 5 }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
          className={i < rating ? styles.starFilled : styles.starEmpty}
        >
          <path d="M7 1l1.56 4.8H13l-4 2.9 1.53 4.7L7 10.6l-3.53 2.8L5 8.7 1 5.8h4.44z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductTestimonials({ product }) {
  const testimonials =
    product?.testimonials?.length > 0 ? product.testimonials : MOCK_TESTIMONIALS;

  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  const goTo = (index) => {
    if (isAnimating || index === active) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActive(index);
      setIsAnimating(false);
    }, 300);
  };

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((active + 1) % testimonials.length);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(intervalRef.current);
  }, [testimonials.length]);

  const current = testimonials[active];

  return (
    <section className={styles.section}>
      {/* Background accent */}
      <div className={styles.bgAccent} />

      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Customer Stories</span>
          <h2 className={styles.heading}>What Our Clients Say</h2>
        </div>

        {/* ── Main testimonial ── */}
        <div className={styles.main}>

          {/* Left: Big quote */}
          <div className={styles.quoteCol}>
            {/* Decorative quote mark */}
            <div className={styles.quoteMark}>
              <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
                <path
                  d="M0 48V28C0 12.536 8.954 3.042 26.863 0l3.274 5.374C20.444 7.28 15.02 12.45 13.333 20.667H24V48H0zm40 0V28C40 12.536 48.954 3.042 66.863 0l3.274 5.374C60.444 7.28 55.02 12.45 53.333 20.667H64V48H40z"
                  fill="currentColor"
                  opacity="0.08"
                />
              </svg>
            </div>

            <div
              className={`${styles.quoteText} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}
            >
              <p className={styles.quote}>"{current.message}"</p>

              <div className={styles.author}>
                {/* Avatar */}
                <div className={styles.avatarWrap}>
                  <Image
                    src={current.avatar || AVATAR_FALLBACKS[active % AVATAR_FALLBACKS.length]}
                    alt={current.name}
                    fill
                    sizes="56px"
                    className={styles.avatar}
                  />
                </div>

                <div className={styles.authorInfo}>
                  <StarRating rating={current.rating || 5} />
                  <span className={styles.authorName}>{current.name}</span>
                  <span className={styles.authorMeta}>
                    {current.role}{current.company ? ` · ${current.company}` : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Nav controls */}
            <div className={styles.controls}>
              <button className={styles.navBtn} onClick={prev} aria-label="Previous">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className={styles.progress}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.progressDot} ${i === active ? styles.progressDotActive : ""}`}
                    onClick={() => goTo(i)}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button className={styles.navBtn} onClick={next} aria-label="Next">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <span className={styles.counter}>
                {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right: Stacked thumbnail cards */}
          <div className={styles.stackCol}>
            {testimonials.map((t, i) => {
              const offset = i - active;
              const isActive = i === active;
              const isPrev = i === (active - 1 + testimonials.length) % testimonials.length;
              const isNext = i === (active + 1) % testimonials.length;

              if (!isActive && !isPrev && !isNext) return null;

              return (
                <div
                  key={i}
                  className={`${styles.stackCard} ${
                    isActive ? styles.stackCardActive :
                    isPrev   ? styles.stackCardPrev   :
                               styles.stackCardNext
                  }`}
                  onClick={() => goTo(i)}
                >
                  <div className={styles.stackAvatarWrap}>
                    <Image
                      src={t.avatar || AVATAR_FALLBACKS[i % AVATAR_FALLBACKS.length]}
                      alt={t.name}
                      fill
                      sizes="48px"
                      className={styles.stackAvatar}
                    />
                  </div>
                  <div className={styles.stackInfo}>
                    <span className={styles.stackName}>{t.name}</span>
                    <span className={styles.stackRole}>{t.role}</span>
                  </div>
                  {isActive && (
                    <div className={styles.stackActiveDot} />
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
