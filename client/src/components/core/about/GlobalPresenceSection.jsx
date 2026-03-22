"use client";
import styles from "./GlobalPresenceSection.module.css";

export default function GlobalPresenceSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left: Heading */}
        <div className={styles.left}>
          <h2 className={styles.heading}>
            A global lift company with local presence
          </h2>
        </div>

        {/* Right: Body text */}
        <div className={styles.right}>
          <p className={styles.body}>
            Engineered in the UAE and trusted across projects throughout the region,
            Invent Elevator delivers space-efficient, ready-to-install lift solutions
            designed for modern residential and commercial environments. We combine
            advanced engineering with refined aesthetics to deliver vertical
            mobility systems that integrate seamlessly into villas, offices,
            restaurants, and high-rise developments.
          </p>
        </div>
      </div>

      {/* Full-width image below */}
      <div className={styles.imageWrapper}>
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1800&q=85&fit=crop"
          alt="Modern building lobby with elevator"
          className={styles.image}
        />
        <div className={styles.imageOverlay} />

        {/* Floating stat cards */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>100+</span>
            <span className={styles.statLabel}>Projects Delivered</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Design Variations</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Years of Expertise</span>
          </div>
        </div>
      </div>
    </section>
  );
}
