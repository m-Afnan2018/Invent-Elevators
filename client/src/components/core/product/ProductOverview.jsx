import ProductGalleryClient from "./ProductGalleryClient";
import styles from "./ProductOverview.module.css";

const FEATURE_ICONS = [
  <svg key="0" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.6"/><path d="M7 10h6M10 7v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  <svg key="3" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 16V8l6-5 6 5v8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><rect x="7" y="11" width="6" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.6"/></svg>,
];

// Build features from customSpecs only — no generic fallback
function buildFeatures(customSpecs = {}) {
  const entries = Object.entries(customSpecs);
  if (entries.length === 0) return [];
  return entries.slice(0, 4).map(([key, val], i) => ({
    icon: FEATURE_ICONS[i % FEATURE_ICONS.length],
    title: key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").replace(/^\w/, c => c.toUpperCase()),
    desc: String(val),
  }));
}

export default function ProductOverview({ product }) {
  const {
    name = "Product",
    description = "A world-class vertical mobility solution designed for modern residential and commercial architecture.",
    capacity,
    speed,
    stops,
    customSpecs = {},
    category,
    categories = [],
  } = product || {};

  const features = buildFeatures(customSpecs);

  // Build quick stats from core fields
  const quickStats = [
    capacity && { label: "Load Capacity", value: capacity },
    speed    && { label: "Travel Speed",  value: speed },
    stops    && { label: "No. of Stops",  value: stops },
  ].filter(Boolean);

  // Category name for display
  const categoryName = (category?.name) || (categories[0]?.name) || "";

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Intro Row ── */}
        <div className={styles.intro}>
          <div className={styles.introLeft}>
            {categoryName && (
              <span className={styles.eyebrow}>{categoryName}</span>
            )}
            <h2 className={styles.heading}>{name}</h2>
          </div>
          <div className={styles.introRight}>
            <p className={styles.body}>{description}</p>

            {/* Quick stats strip — only if admin filled them */}
            {quickStats.length > 0 && (
              <div className={styles.quickStats}>
                {quickStats.map((s, i) => (
                  <div key={i} className={styles.quickStat}>
                    <span className={styles.quickStatValue}>{s.value}</span>
                    <span className={styles.quickStatLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Image Gallery (interactive, client component) ── */}
        <ProductGalleryClient product={product} />

        {/* ── Key Features — only show if admin added customSpecs ── */}
        {features.length > 0 && (
          <div className={styles.features}>
            <div className={styles.featuresHeader}>
              <h3 className={styles.featuresTitle}>Key Features</h3>
              <p className={styles.featuresSubtitle}>
                Every detail refined for reliability and long-term performance.
              </p>
            </div>

            <div className={styles.featuresGrid}>
              {features.map((f, i) => (
                <div key={i} className={styles.featureCard}>
                  <div className={styles.featureIconWrap}>
                    {f.icon}
                  </div>
                  <div className={styles.featureText}>
                    <h4 className={styles.featureTitle}>{f.title}</h4>
                    <p className={styles.featureDesc}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
