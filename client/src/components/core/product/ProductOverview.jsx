import Image from "next/image";
import styles from "./ProductOverview.module.css";

const FALLBACK_IMGS = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  "https://images.unsplash.com/photo-1590504805261-29a56cc04b06?w=900&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80",
];

// Default feature highlights if none passed
const DEFAULT_FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: "Space Efficient Design",
    desc: "Engineered to fit into tight spaces without compromising on cabin comfort or load capacity.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Safety Certified",
    desc: "Built to meet international safety standards with redundant braking and overload protection systems.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 10h6M10 7v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: "Easy Installation",
    desc: "Pre-assembled modules reduce on-site installation time significantly, minimizing disruption.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 16V8l6-5 6 5v8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <rect x="7" y="11" width="6" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    title: "Low Maintenance",
    desc: "Screw & nut drive system requires no hydraulic oil, machine room or pit — minimal upkeep needed.",
  },
];

export default function ProductOverview({ product }) {
  const {
    name = "Product",
    description = "A world-class vertical mobility solution designed for modern residential and commercial architecture.",
    image,
    features = DEFAULT_FEATURES,
  } = product || {};

  const galleryImgs = [
    image || FALLBACK_IMGS[0],
    FALLBACK_IMGS[1],
    FALLBACK_IMGS[2],
  ];

  return (
    <section className={styles.section} id="overview">
      <div className={styles.container}>

        {/* ── Top: Title + intro ── */}
        <div className={styles.intro}>
          <div className={styles.introLeft}>
            <span className={styles.eyebrow}>Product Overview</span>
            <h2 className={styles.heading}>
              Built for Modern<br />Architecture
            </h2>
          </div>
          <div className={styles.introRight}>
            <p className={styles.body}>{description}</p>
            <div className={styles.divider} />
            <p className={styles.body}>
              Invent Elevator combines advanced engineering with thoughtful design to
              deliver lift solutions that integrate seamlessly into your space — without
              compromising on performance, safety, or aesthetics.
            </p>
          </div>
        </div>

        {/* ── Image Gallery ── */}
        <div className={styles.gallery}>
          {/* Large image */}
          <div className={styles.galleryMain}>
            <Image
              src={galleryImgs[0]}
              alt={`${name} main view`}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className={styles.galleryImg}
            />
            <div className={styles.galleryMainOverlay} />
            <div className={styles.galleryLabel}>
              <span>{name}</span>
            </div>
          </div>

          {/* Two stacked images */}
          <div className={styles.galleryStack}>
            <div className={styles.galleryThumb}>
              <Image
                src={galleryImgs[1]}
                alt={`${name} detail view`}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className={styles.galleryImg}
              />
            </div>
            <div className={styles.galleryThumb}>
              <Image
                src={galleryImgs[2]}
                alt={`${name} interior view`}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className={styles.galleryImg}
              />
              {/* Dark overlay with text on last thumb */}
              <div className={styles.thumbOverlay}>
                <span className={styles.thumbOverlayText}>View All Photos</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9h10M9 4l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── Features Grid ── */}
        <div className={styles.features}>
          <div className={styles.featuresHeader}>
            <h3 className={styles.featuresTitle}>Key Features</h3>
            <p className={styles.featuresSubtitle}>
              Everything engineered with purpose — every detail refined for reliability.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {(features.length > 0 ? features : DEFAULT_FEATURES).map((f, i) => (
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

      </div>
    </section>
  );
}
