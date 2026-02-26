import styles from "./People.module.css";

export default function People() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Left Column: Image ── */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            {/* Replace src with your actual team/people image */}
            <img
              src="/images/people-team.jpg"
              alt="Invent Elevator dedicated team"
              className={styles.image}
            />
            <div className={styles.imageOverlay} />
          </div>
        </div>

        {/* ── Right Column: Content ── */}
        <div className={styles.contentCol}>
          <h2 className={styles.heading}>It&apos;s All About the People</h2>
          <div className={styles.bodyGroup}>
            <p className={styles.body}>
              Behind every successful lift installation is a dedicated team of engineers,
              technicians, and support professionals. At Invent Elevator, our people are
              our strongest foundation.
            </p>
            <p className={styles.body}>
              From design and manufacturing to installation and after-sales service, our
              team works with passion, responsibility, and attention to detail. Their
              expertise ensures that every elevator system delivers long-term reliability,
              safety, and smooth performance.
            </p>
            <p className={styles.body}>
              We believe great technology is powered by great people — and that commitment
              reflects in every project we deliver.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
