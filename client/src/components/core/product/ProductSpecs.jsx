import styles from "./ProductSpecs.module.css";

// Default specs using product model fields + customSpecs
const buildSpecs = (product) => {
  const {
    capacity,
    speed,
    stops,
    customSpecs = {},
  } = product || {};

  const core = [
    capacity && { label: "Load Capacity", value: capacity, group: "Performance" },
    speed    && { label: "Travel Speed",  value: speed,    group: "Performance" },
    stops    && { label: "Number of Stops", value: stops,  group: "Performance" },
  ].filter(Boolean);

  // Flatten customSpecs object into rows
  const custom = Object.entries(customSpecs).map(([key, val]) => ({
    label: key
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase()),
    value: String(val),
    group: "Technical",
  }));

  return [...core, ...custom];
};

// Group specs by their group key
const groupSpecs = (specs) => {
  return specs.reduce((acc, spec) => {
    if (!acc[spec.group]) acc[spec.group] = [];
    acc[spec.group].push(spec);
    return acc;
  }, {});
};


const GROUP_ICONS = {
  Performance: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Technical: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 2v2M9 14v2M2 9h2M14 9h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Installation: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Compliance: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2l1.8 5.5H17l-4.8 3.5 1.8 5.5L9 13l-5 3.5 1.8-5.5L1 7.5h6.2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
};

export default function ProductSpecs({ product }) {
  const specs = buildSpecs(product);
  if (specs.length === 0) return null;
  const groups   = groupSpecs(specs);
  const groupKeys = Object.keys(groups);

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>Technical Details</span>
            <h2 className={styles.heading}>Specifications</h2>
          </div>
          <p className={styles.headerDesc}>
            Every number engineered with purpose. Explore the full technical
            breakdown of this product — from performance to compliance.
          </p>
        </div>

        {/* ── Group nav pills ── */}
        <div className={styles.groupNav}>
          {groupKeys.map((g) => (
            <a key={g} href={`#spec-group-${g}`} className={styles.groupNavPill}>
              <span className={styles.groupNavIcon}>
                {GROUP_ICONS[g] || GROUP_ICONS.Technical}
              </span>
              {g}
            </a>
          ))}
        </div>

        {/* ── Spec Groups ── */}
        <div className={styles.groups}>
          {groupKeys.map((groupName, gi) => (
            <div
              key={groupName}
              id={`spec-group-${groupName}`}
              className={styles.group}
            >
              {/* Group header */}
              <div className={styles.groupHeader}>
                <div className={styles.groupIcon}>
                  {GROUP_ICONS[groupName] || GROUP_ICONS.Technical}
                </div>
                <h3 className={styles.groupTitle}>{groupName}</h3>
                <span className={styles.groupCount}>
                  {groups[groupName].length} specs
                </span>
              </div>

              {/* Spec rows */}
              <div className={styles.table}>
                {groups[groupName].map((spec, si) => (
                  <div
                    key={si}
                    className={`${styles.row} ${si % 2 === 0 ? styles.rowEven : ""}`}
                  >
                    <span className={styles.rowLabel}>{spec.label}</span>
                    <span className={styles.rowDots} />
                    <span className={styles.rowValue}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Download strip ── */}
        <div className={styles.downloadStrip}>
          <div className={styles.downloadLeft}>
            <div className={styles.downloadIcon}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 3v12M6 10l5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className={styles.downloadTitle}>Full Technical Datasheet</p>
              <p className={styles.downloadSub}>PDF • Includes drawings, wiring diagrams & certifications</p>
            </div>
          </div>
          <a href="/brochure.pdf" download className={styles.downloadBtn}>
            Download Brochure
          </a>
        </div>

      </div>
    </section>
  );
}
