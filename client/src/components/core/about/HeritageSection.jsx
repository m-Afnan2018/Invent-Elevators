"use client";
import styles from "./HeritageSection.module.css";

export default function HeritageSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left: Image */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=85&fit=crop"
              alt="Engineer working on elevator system"
              className={styles.image}
            />
            {/* Floating badge */}
            <div className={styles.badge}>
              <span className={styles.badgeNumber}>25+</span>
              <span className={styles.badgeText}>Years of Engineering Excellence</span>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className={styles.contentCol}>
          <p className={styles.eyebrow}>Who We Are</p>
          <h2 className={styles.heading}>Our Heritage &amp; Expertise</h2>
          <div className={styles.divider} />
          <p className={styles.body}>
            Founded with a vision to innovate vertical transportation, Invent
            Elevator has since embraced an engineering-led approach focused on
            accessibility, quality, and forward-thinking design. Over the years,
            our team of skilled professionals has developed lift solutions that
            are fast to install, easy to maintain, and adaptive to modern
            architectural requirements — all while maintaining high standards of
            safety and reliability.
          </p>

          {/* Feature list */}
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M3 9.5l4 4 8-8"
                    stroke="#b0742e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>Fast installation with minimal structural modification</span>
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M3 9.5l4 4 8-8"
                    stroke="#b0742e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>Engineered for long-term durability and low maintenance</span>
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M3 9.5l4 4 8-8"
                    stroke="#b0742e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>Compliant with international safety and quality standards</span>
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M3 9.5l4 4 8-8"
                    stroke="#b0742e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>Adaptive designs for residential, commercial & industrial use</span>
            </li>
          </ul>

          <a href="#products" className={styles.cta}>
            Explore Our Solutions
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
