"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./BlogHero.module.css";

export default function BlogHero({ totalPosts = 0, onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) onSearch?.("");
  };

  return (
    <section className={styles.hero}>
      {/* Background image */}
      <div className={styles.bgWrap}>
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=80"
          alt="Engineering and construction"
          fill
          priority
          sizes="100vw"
          className={styles.bgImg}
        />
      </div>
      <div className={styles.overlayTop} />
      <div className={styles.overlayBottom} />

      {/* Grid lines decoration */}
      <div className={styles.gridLines}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.gridLine} />
        ))}
      </div>

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.bcLink}>Home</Link>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.bcChevron}>
          <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={styles.bcActive}>Blog</span>
      </nav>

      <div className={styles.container}>

        {/* ── Eyebrow ── */}
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          <span>Journal &amp; Insights</span>
          {totalPosts > 0 && (
            <span className={styles.postCount}>{totalPosts} articles</span>
          )}
        </div>

        {/* ── Heading ── */}
        <h1 className={styles.heading}>The Invent Elevator Blog</h1>

        <p className={styles.subheading}>
          Engineering insights, installation guides, industry news and vertical
          mobility trends — straight from our team of experts.
        </p>

        {/* ── Search bar ── */}
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12.5 12.5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search articles, topics or tags…"
              value={query}
              onChange={handleChange}
              aria-label="Search blog"
            />
            {query && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => { setQuery(""); onSearch?.(""); }}
                aria-label="Clear search"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            )}
            <button type="submit" className={styles.searchBtn}>
              Search
            </button>
          </div>
        </form>

        {/* ── Popular tags ── */}
        <div className={styles.tagsRow}>
          <span className={styles.tagsLabel}>Popular:</span>
          {["Hydraulic Lifts", "Home Elevators", "Installation", "Safety Standards", "Industry News"].map((tag) => (
            <button
              key={tag}
              className={styles.tagChip}
              onClick={() => { setQuery(tag); onSearch?.(tag); }}
            >
              {tag}
            </button>
          ))}
        </div>

      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollWrap}>
        <span className={styles.scrollLabel}>Scroll to explore</span>
        <div className={styles.scrollTrack}>
          <div className={styles.scrollThumb} />
        </div>
      </div>
    </section>
  );
}
