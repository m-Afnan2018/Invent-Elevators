import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCTA.module.css";

const BENEFITS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Free Consultation",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M2 8h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M6 12h3M13 12h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    label: "No Hidden Costs",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
    label: "Custom Configuration",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10a7 7 0 1 0 14 0A7 7 0 0 0 3 10z" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M10 7v3l2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Fast Response Time",
  },
];

export default function ProductCTA({ product }) {
  const productName = product?.name || "This Product";

  return (
    <section className={styles.section}>
      {/* Background image with dark overlay */}
      <div className={styles.bgWrap}>
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
          alt="Invent Elevator"
          fill
          sizes="100vw"
          className={styles.bgImg}
        />
      </div>
      <div className={styles.overlay} />

      <div className={styles.container}>

        {/* ── Left content ── */}
        <div className={styles.left}>
          <div className={styles.tagRow}>
            <span className={styles.tag}>
              <span className={styles.tagDot} />
              Ready to Order
            </span>
          </div>

          <h2 className={styles.heading}>
            Interested in<br />
            <em className={styles.headingEm}>{productName}?</em>
          </h2>

          <p className={styles.desc}>
            Our engineering team is ready to help you configure the perfect lift
            solution for your space. Get a personalised quote, technical drawings,
            and expert guidance — all at no cost.
          </p>

          {/* Benefits */}
          <div className={styles.benefits}>
            {BENEFITS.map((b, i) => (
              <div key={i} className={styles.benefit}>
                <span className={styles.benefitIcon}>{b.icon}</span>
                <span className={styles.benefitLabel}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className={styles.ctas}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Get a Free Quote
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/contact" className={styles.ctaSecondary}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M3 2h3.5l1.5 3.5-2 1.2a9.1 9.1 0 0 0 4.3 4.3l1.2-2L15 10.5V14A1 1 0 0 1 14 15C6.8 15 2 9.2 2 3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              Talk to an Expert
            </Link>
          </div>
        </div>

        {/* ── Right: Info card ── */}
        <div className={styles.right}>
          <div className={styles.card}>
            {/* Card header */}
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderIcon}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2l2.09 6.43H20l-5.45 3.96 2.08 6.43L11 14.87l-5.63 3.95 2.08-6.43L2 8.43h6.91z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className={styles.cardHeaderTitle}>Expert Support</p>
                <p className={styles.cardHeaderSub}>Available Mon – Sat, 9am – 6pm</p>
              </div>
            </div>

            <div className={styles.cardDivider} />

            {/* Contact options */}
            <div className={styles.contactOptions}>
              <a href="mailto:info@inventelevator.com" className={styles.contactOption}>
                <div className={styles.contactOptionIcon}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 6l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.contactOptionText}>
                  <span className={styles.contactOptionLabel}>Email us</span>
                  <span className={styles.contactOptionValue}>info@inventelevator.com</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={styles.contactOptionArrow}>
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <a href="tel:+971585723553" className={styles.contactOption}>
                <div className={styles.contactOptionIcon}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 2h3.5l1.5 3.5-2 1.2a9.1 9.1 0 0 0 4.3 4.3l1.2-2L15 10.5V14A1 1 0 0 1 14 15C6.8 15 2 9.2 2 3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.contactOptionText}>
                  <span className={styles.contactOptionLabel}>Call us</span>
                  <span className={styles.contactOptionValue}>+971 58 572 3553</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={styles.contactOptionArrow}>
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <Link href="/contact" className={styles.contactOption}>
                <div className={styles.contactOptionIcon}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 4h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 5l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.contactOptionText}>
                  <span className={styles.contactOptionLabel}>Contact form</span>
                  <span className={styles.contactOptionValue}>Send us your enquiry</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={styles.contactOptionArrow}>
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <a href="/brochure.pdf" download className={styles.contactOption}>
                <div className={styles.contactOptionIcon}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 3v9M5 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.contactOptionText}>
                  <span className={styles.contactOptionLabel}>Download</span>
                  <span className={styles.contactOptionValue}>Product Brochure (PDF)</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={styles.contactOptionArrow}>
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Trust note */}
            <div className={styles.trustNote}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1l1.12 4.45H13l-3.8 2.76 1.45 4.45L7 10.38l-3.65 2.28 1.45-4.45L1 5.45h4.88z" fill="rgba(255,255,255,0.3)"/>
              </svg>
              <span>Trusted by 500+ projects across residential & commercial sectors</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
