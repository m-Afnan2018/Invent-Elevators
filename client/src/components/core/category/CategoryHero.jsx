import Link from "next/link";
import Image from "next/image";
import styles from "./CategoryHero.module.css";

export default function CategoryHero({ category }) {
  const {
    name = "Category",
    description = "",
    image = "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
    _count = {},
  } = category || {};

  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <div className={styles.bgWrap}>
        <Image
          src={image}
          alt={name}
          fill
          priority
          sizes="100vw"
          className={styles.bgImg}
        />
      </div>

      {/* Layered overlays */}
      <div className={styles.overlayTop} />
      <div className={styles.overlayBottom} />
      <div className={styles.overlayNoise} />

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.bcLink}>Home</Link>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.bcChevron}>
          <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <Link href="/products" className={styles.bcLink}>Products</Link>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.bcChevron}>
          <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={styles.bcActive}>{name}</span>
      </nav>

      {/* Main Content */}
      <div className={styles.content}>

        {/* Eyebrow tag */}
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          <span>Our Products</span>
        </div>

        <h1 className={styles.heading}>{name}</h1>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {/* Stats row */}
        {(_count?.subCategories > 0 || _count?.products > 0) && (
          <div className={styles.statsRow}>
            {_count?.subCategories > 0 && (
              <div className={styles.statItem}>
                <span className={styles.statNum}>{_count.subCategories}</span>
                <span className={styles.statLbl}>Categories</span>
              </div>
            )}
            {_count?.subCategories > 0 && _count?.products > 0 && (
              <div className={styles.statSep} />
            )}
            {_count?.products > 0 && (
              <div className={styles.statItem}>
                <span className={styles.statNum}>{_count.products}</span>
                <span className={styles.statLbl}>Products</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom scroll indicator */}
      <div className={styles.scrollWrap}>
        <span className={styles.scrollLabel}>Scroll to explore</span>
        <div className={styles.scrollTrack}>
          <div className={styles.scrollThumb} />
        </div>
      </div>
    </section>
  );
}
