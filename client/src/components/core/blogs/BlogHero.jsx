"use client";

import { useState } from "react";
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
      {/* Noise texture overlay */}
      <div className={styles.noise} />

      {/* Grid lines decoration */}
      <div className={styles.gridLines}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.gridLine} />
        ))}
      </div>

      <div className={styles.container}>

        {/* ── Top meta row ── */}
        <div className={styles.metaRow}>
          <div className={styles.metaPill}>
            <span className={styles.metaDot} />
            Journal &amp; Insights
          </div>
          {totalPosts > 0 && (
            <span className={styles.metaCount}>{totalPosts} articles</span>
          )}
        </div>

        {/* ── Heading ── */}
        <div className={styles.headingWrap}>
          <h1 className={styles.heading}>
            <span className={styles.headingLine}>The Invent</span>
            <span className={styles.headingLineAlt}>
              Elevator
              <span className={styles.headingAccent}> Blog</span>
            </span>
          </h1>
          <p className={styles.subheading}>
            Engineering insights, installation guides, industry news and
            vertical mobility trends — straight from our team of experts.
          </p>
        </div>

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

      {/* Bottom fade into content */}
      <div className={styles.bottomFade} />
    </section>
  );
}
