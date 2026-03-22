import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* Background image */}
      <div className={styles.bgWrap}>
        <Image
          fill
          sizes="100vw"
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85&fit=crop"
          alt="Modern building interior"
          priority
          className={styles.bgImg}
        />
      </div>
      <div className={styles.overlayTop} />
      <div className={styles.overlayBottom} />

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.bcLink}>Home</Link>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.bcChevron}>
          <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={styles.bcActive}>About Us</span>
      </nav>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          <span>About Invent Elevator</span>
        </div>

        <h1 className={styles.heading}>
          High-quality Lift Solutions
          <br />
          Built for Modern Spaces
        </h1>

        <p className={styles.description}>
          From hydraulic cargo lifts and scissor lifts to custom car lifts and
          passenger elevators — designed for safety, durability, and industrial
          efficiency across the UAE and beyond.
        </p>

        <div className={styles.actions}>
          <a href="#products" className={styles.btnPrimary}>
            Our Products
          </a>
          <a href="/brochure" className={styles.btnSecondary}>
            Download Brochure
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollWrap}>
        <span className={styles.scrollLabel}>Explore our lift solutions</span>
        <div className={styles.scrollTrack}>
          <div className={styles.scrollThumb} />
        </div>
      </div>
    </section>
  );
}
