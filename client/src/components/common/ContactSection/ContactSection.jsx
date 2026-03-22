"use client";
import Image from "next/image";
import styles from "./ContactSection.module.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { createLead } from "@/services/leads.service";

const countries = [
  "Afghanistan", "Australia", "Canada", "China", "France",
  "Germany", "India", "Italy", "Japan", "Pakistan",
  "Saudi Arabia", "South Africa", "UAE", "United Kingdom", "United States",
];

export default function ContactSection() {
  const [form, setForm] = useState({
    firstname: "", lastname: "", phone: "", email: "", country: "", message: "", agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agreed) {
      toast.error("Please accept the privacy policy to continue.");
      return;
    }

    if (!form.firstname || !form.lastname || !form.email) {
      toast.error("Please fill required details.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createLead({
        name: `${form.firstname} ${form.lastname}`.trim(),
        email: form.email,
        phone: form.phone,
        location: form.country,
        message: form.message,
        source: 'Website Contact Form',
      });

      setSubmitted(true);
      setForm({ firstname: "", lastname: "", phone: "", email: "", country: "", message: "", agreed: false });
      toast.success("Thanks! Your request has been submitted.");
    } catch (_error) {
      toast.error("Could not submit right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Left: Expert Guidance copy ── */}
        <div className={styles.leftCol}>
          {/* Image */}
          <div className={styles.imageWrap}>
            <Image
              width={800}
              height={320}
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
              alt="Expert consultation"
              className={styles.consultImg}
            />
            {/* Floating support card */}
            <div className={styles.supportCard}>
              <div className={styles.supportIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.0 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z" />
                </svg>
              </div>
              <div>
                <p className={styles.supportLabel}>24/7 Support</p>
                <p className={styles.supportContact}>info@inventelevator.com</p>
                <p className={styles.supportContact}><a href="tel:+971585723553" style={{color:"inherit",textDecoration:"none"}}>+971 58 572 3553</a></p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={styles.copyBlock}>
            <span className={styles.eyebrow}>Expert Guidance &amp; Technical Support</span>
            <h2 className={styles.heading}>
              We&apos;re Here to <br /><em>Help You Lift</em>
            </h2>
            <p className={styles.body}>
              At Invent Elevator, we believe strong engineering must be backed by
              strong service. Our technical experts assist you with product
              selection, installation planning, and ongoing maintenance to ensure
              long-term reliability and performance.
            </p>
            <a href="mailto:info@inventelevator.com" className={styles.contactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
              </svg>
              info@inventelevator.com
            </a>
          </div>
        </div>

        {/* ── Right: Contact form ── */}
        <div className={styles.rightCol}>
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Do you have any questions?</h3>
              <p className={styles.formSubtitle}>We would love to help.</p>
            </div>

            {submitted ? (
              <div className={styles.successMsg}>
                <span className={styles.successIcon}>✓</span>
                <h4>Thank you for reaching out!</h4>
                <p>Our team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {/* Name row */}
                <div className={styles.row}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="firstname">First name</label>
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      placeholder="First name"
                      className={styles.input}
                      value={form.firstname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="lastname">Last name</label>
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      placeholder="Last name"
                      className={styles.input}
                      value={form.lastname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="phone">Phone number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className={styles.input}
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    className={styles.input}
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Country */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="country">Country</label>
                  <div className={styles.selectWrap}>
                    <select
                      id="country"
                      name="country"
                      className={styles.select}
                      value={form.country}
                      onChange={handleChange}
                    >
                      <option value="">Select...</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <span className={styles.selectArrow}>▾</span>
                  </div>
                </div>

                {/* Message */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    className={styles.textarea}
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                {/* Privacy checkbox */}
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="agreed"
                    className={styles.checkbox}
                    checked={form.agreed}
                    onChange={handleChange}
                    required
                  />
                  <span className={styles.checkboxCustom} />
                  <span className={styles.checkboxText}>
                    I agree to the{" "}
                    <a href="/privacy-policy" className={styles.privacyLink}>privacy policy</a>.
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={!form.agreed || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
