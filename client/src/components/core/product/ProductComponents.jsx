import Image from "next/image";
import styles from "./ProductComponents.module.css";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
  "https://images.unsplash.com/photo-1590504805261-29a56cc04b06?w=600&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
];

export default function ProductComponents({ product }) {
  const components = product?.components ?? [];
  if (components.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.eyebrow}>What&apos;s Included</span>
            <h2 className={styles.heading}>Product Components</h2>
          </div>
          <p className={styles.headerDesc}>
            Every component is precision-engineered and factory-tested before
            delivery — ensuring seamless integration and long-term reliability.
          </p>
        </div>

        {/* ── Components Grid ── */}
        <div className={styles.grid}>
          {components.map((comp, i) => {
            const img = comp.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];
            // Merge specs + filledData, show up to 4 entries
            const mergedSpecs = {
              ...(comp.specs || {}),
              ...(comp.filledData || {}),
            };
            const specEntries = Object.entries(mergedSpecs).slice(0, 4);
            // componentType may be a populated object or a raw ObjectId string
            const typeName =
              typeof comp.componentType === "object" && comp.componentType !== null
                ? comp.componentType.name
                : "Component";

            return (
              <article key={comp._id || i} className={styles.card}>
                {/* Image */}
                <div className={styles.imgWrap}>
                  <Image
                    src={img}
                    alt={comp.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.img}
                  />
                  <div className={styles.imgOverlay} />

                  {/* Type badge */}
                  <span className={styles.typeBadge}>{typeName}</span>
                </div>

                {/* Content */}
                <div className={styles.content}>
                  <div className={styles.contentTop}>
                    <h3 className={styles.name}>{comp.name}</h3>
                    <p className={styles.desc}>{comp.description}</p>
                  </div>

                  {/* Inline specs */}
                  {specEntries.length > 0 && (
                    <div className={styles.specList}>
                      {specEntries.map(([key, val]) => (
                        <div key={key} className={styles.specItem}>
                          <span className={styles.specKey}>
                            {key.replace(/([A-Z])/g, " $1").replace(/^\w/, c => c.toUpperCase())}
                          </span>
                          <span className={styles.specVal}>{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Bottom note ── */}
        <div className={styles.note}>
          <div className={styles.noteIcon}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 8v5M9 6v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <p className={styles.noteText}>
            All components are customisable. Contact our team to configure the
            product to your specific architectural and operational requirements.
          </p>
          <a href="/contact" className={styles.noteLink}>
            Get in touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
