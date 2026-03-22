import React from "react";
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
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <p className={styles.subtitle}>Get In Touch</p>
        <h1>Let&apos;s Talk About Your Lift Project</h1>
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

        <div className={styles.breadcrumb}>
          <span>Home</span>
          <span className={styles.separator}> / </span>
          <span className={styles.active}>Contact</span>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
