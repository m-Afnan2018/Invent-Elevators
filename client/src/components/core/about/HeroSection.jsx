"use client";
import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* Background image with overlay */}
      <div className={styles.bgWrapper}>
        <Image
          fill
          sizes="100vw"
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85&fit=crop"
          alt="Modern building interior"
          priority
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <p className={styles.eyebrow}>About Invent Elevator</p>
        <h1 className={styles.headline}>
          High-quality Hydraulic Cargo Lifts,
          <br />
          Scissor Lifts, Car Lifts &amp; Custom
          <br />
          Vertical Solutions
        </h1>
        <p className={styles.subtext}>
          Designed for safety, durability, and industrial efficiency.
        </p>

        <div className={styles.actions}>
          <a href="#products" className={styles.btnPrimary}>
            Our products
          </a>
          <a href="#brochure" className={styles.btnSecondary}>
            Download Brochure
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollLabel}>Explore our lift solutions</span>
        <div className={styles.scrollArrow}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 3v14M4 11l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
