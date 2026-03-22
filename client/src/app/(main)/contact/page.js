import Link from "next/link";
import ContactHero from "@/components/core/contact/ContactHero";
import styles from "./page.module.css";

export default function Contact() {
  return (
    <main className={styles.page}>
      <ContactHero />

      <section className={styles.supportStrip}>
        <div className={styles.supportInner}>
          <div>
            <p className={styles.eyebrow}>Professional Assistance</p>
            <h2>Need Help Choosing the Right Elevator?</h2>
            <p>
              Share your site requirements and our team will recommend the ideal lift
              model, specification, and installation plan.
            </p>
          </div>
          <div className={styles.links}>
            <a href="mailto:info@inventelevator.com">info@inventelevator.com</a>
            <a href="tel:+971585723553">+971 58 572 3553</a>
            <Link href="/products">Explore Products</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
