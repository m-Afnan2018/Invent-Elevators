import React from "react";
import styles from "./ContactHero.module.css";

const ContactHero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <p className={styles.subtitle}>Get In Touch</p>
                <h1>Contact Us</h1>
                <p className={styles.description}>
                    Have questions or need assistance? Our team is here to help you with
                    any inquiries or support you may need.
                </p>

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