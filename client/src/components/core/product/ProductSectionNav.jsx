"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./ProductSectionNav.module.css";

const SECTIONS = [
  { id: "overview",     label: "Overview" },
  { id: "specs",        label: "Specifications" },
  { id: "components",   label: "Components" },
  { id: "testimonials", label: "Reviews" },
  { id: "quote",        label: "Get a Quote" },
];

export default function ProductSectionNav({ productName }) {
  const [visible, setVisible]     = useState(false);
  const [activeId, setActiveId]   = useState("");
  const [scrolled, setScrolled]   = useState(false);
  const rafRef                    = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        setVisible(y > 500);
        setScrolled(y > 600);

        // Find active section
        let current = "";
        for (const { id } of SECTIONS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 120) current = id;
        }
        setActiveId(current);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className={`${styles.nav} ${visible ? styles.visible : ""} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        {/* Product name */}
        <span className={styles.title}>{productName}</span>

        {/* Section links */}
        <nav className={styles.links}>
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`${styles.link} ${activeId === id ? styles.linkActive : ""}`}
            >
              {label}
              {activeId === id && <span className={styles.activeLine} />}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <Link href="/contact" className={styles.cta}>
          Get a Quote
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
