import React from "react";
import styles from "./ContactHero.module.css";

const quickFacts = [
  "Fast response from technical team",
  "Sales and maintenance consultation",
  "Project planning support",
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

        <div className={styles.facts}>
          {quickFacts.map((fact) => (
            <span key={fact}>{fact}</span>
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
