import Image from "next/image";
import Link from "next/link";
import styles from "./ContactHero.module.css";

const quickFacts = [
  "Fast response from technical team",
  "Sales and maintenance consultation",
  "Project planning support",
];

const CONTACT_ITEMS = [
  {
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
        <path d="M3 2h3.5L8 5.5l-2 1.2a9 9 0 004.3 4.3l1.2-2L15 10.5V14a1 1 0 01-1 1C6.8 15 2 9.2 2 3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Call us",
    value: "+971 58 572 3553",
    href: "tel:+971585723553",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
        <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 6l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Email us",
    value: "info@inventelevator.com",
    href: "mailto:info@inventelevator.com",
  },
];

const ContactHero = () => {
  return (
    <section className={styles.hero}>
      {/* Background image */}
      <div className={styles.bgWrap}>
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80"
          alt="Modern office building"
          fill
          priority
          sizes="100vw"
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
        <span className={styles.bcActive}>Contact</span>
      </nav>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          <span>Get In Touch</span>
        </div>

        <h1 className={styles.heading}>Let&apos;s Talk About<br />Your Lift Project</h1>

        <p className={styles.description}>
          From early planning to post-installation support, our specialists are ready
          to guide you with reliable and premium mobility solutions.
        </p>

        <div className={styles.contactChips}>
          {CONTACT_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className={styles.contactChip}>
              <span className={styles.chipIcon}>{item.icon}</span>
              <span>
                <span className={styles.chipLabel}>{item.label}</span>
                <strong className={styles.chipValue}>{item.value}</strong>
              </span>
            </a>
          ))}
        </div>

        <div className={styles.facts}>
          {quickFacts.map((fact) => (
            <span key={fact}>✓ {fact}</span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollWrap}>
        <span className={styles.scrollLabel}>Scroll to explore</span>
        <div className={styles.scrollTrack}>
          <div className={styles.scrollThumb} />
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
