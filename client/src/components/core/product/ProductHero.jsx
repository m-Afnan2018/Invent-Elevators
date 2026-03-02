import Image from "next/image";
import Link from "next/link";
import styles from "./ProductHero.module.css";

// Unsplash fallback
const FALLBACK =
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80";

export default function ProductHero({ product }) {
  const {
    name = "Product",
    description = "",
    image = FALLBACK,
    capacity,
    speed,
    stops,
    category,
    subCategory,
    isFeatured,
  } = product || {};

  const highlights = [
    capacity && { label: "Capacity", value: capacity },
    speed && { label: "Speed", value: speed },
    stops && { label: "Stops", value: stops },
  ].filter(Boolean);

  return (
    <section className={styles.hero}>
      {/* ── Background image ── */}
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
      <div className={styles.overlayBottom} />
      <div className={styles.overlayTop} />

      {/* ── Breadcrumb ── */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.bcLink}>Home</Link>
        <span className={styles.bcSep}>/</span>
        <Link href="/products" className={styles.bcLink}>Products</Link>
        {subCategory?.name && (
          <>
            <span className={styles.bcSep}>/</span>
            <Link
              href={`/products/${category?.slug || ""}`}
              className={styles.bcLink}
            >
              {subCategory.name}
            </Link>
          </>
        )}
        <span className={styles.bcSep}>/</span>
        <span className={styles.bcCurrent}>{name}</span>
      </nav>

      {/* ── Main content ── */}
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          {/* Tag row */}
          <div className={styles.tags}>
            {isFeatured && (
              <span className={styles.tagFeatured}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M5 0l1.12 3.45H9.51L6.7 5.58l1.07 3.3L5 6.88l-2.77 2L3.3 5.58.49 3.45H3.88z" />
                </svg>
                Featured
              </span>
            )}
            {subCategory?.name && (
              <span className={styles.tagCat}>{subCategory.name}</span>
            )}
          </div>

          <h1 className={styles.heading}>{name}</h1>

          {description && (
            <p className={styles.desc}>{description}</p>
          )}

          {/* CTAs */}
          <div className={styles.ctas}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Get a Quote
            </Link>
            <a href="#overview" className={styles.ctaSecondary}>
              Explore Product
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Spec pills ── */}
        {highlights.length > 0 && (
          <div className={styles.specBar}>
            {highlights.map((h, i) => (
              <div key={i} className={styles.specPill}>
                <span className={styles.specValue}>{h.value}</span>
                <span className={styles.specLabel}>{h.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Scroll rail ── */}
      <div className={styles.scrollRail}>
        <div className={styles.scrollThumb} />
      </div>
    </section>
  );
}
