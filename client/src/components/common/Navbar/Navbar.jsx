"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [productsOpen, setProductsOpen] = useState(true);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/categories", label: "Our Categories" },
        { href: "/products", label: "Our Products" },
        { href: "/blogs", label: "Blogs" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.navInner}>
                {/* Logo */}
                <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
                    <span className={styles.logoIcon}>▲</span>
                    <span className={styles.logoText}>
                        Invent<strong>Elevator</strong>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                {/* <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.navLink}>
                {link.label}
                <span className={styles.linkUnderline} />
              </Link>
            </li>
          ))}
        </ul> */}

                <ul className={styles.navLinks}>
                    {navLinks.map((link) => (

                        link.label === "Our Products" ?
                            <li key={link.href}
                                className={styles.navLink}
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setProductsOpen(!productsOpen) }}
                            >
                                {link.label}
                                <span className={styles.linkUnderline} />
                            </li>

                            : <li
                                key={link.href}
                                // onMouseEnter={() => link.label === "Our Products" && setProductsOpen(true)}
                                // onMouseLeave={() => link.label === "Our Products" && setProductsOpen(false)}
                                style={{ position: "relative" }}
                            >
                                <Link href={link.href} className={styles.navLink}>
                                    {link.label}
                                    <span className={styles.linkUnderline} />
                                </Link>

                                {link.label === "Our Products" && productsOpen && (
                                    <div className={styles.productsMega}>
                                        <div className={styles.productsInner}>
                                            <div className={styles.productsLeft}>
                                                <ul>
                                                    <li>Home Lifts</li>
                                                    <li>Platform Lifts</li>
                                                    <li>Cabin Lifts</li>
                                                    <li>Goods Lifts</li>
                                                    <li>Our Services</li>
                                                </ul>
                                            </div>

                                            <div className={styles.productsRight}>
                                                <div className={styles.productCard}>
                                                    <h4>Cloud Plus</h4>
                                                    <p>Next generation smart lift solution.</p>
                                                </div>

                                                <div className={styles.productCard}>
                                                    <h4>A4000</h4>
                                                    <p>Compact residential elevator.</p>
                                                </div>

                                                <div className={styles.productCard}>
                                                    <h4>Air Series</h4>
                                                    <p>Minimal modern lift design.</p>
                                                </div>

                                                <div className={styles.productCard}>
                                                    <h4>C1 Pure</h4>
                                                    <p>Space-saving cabin lift.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>

                    ))}
                </ul>

                {/* Right Side */}
                <div className={styles.navRight}>
                    <Link href="/order" className={styles.orderBtn}>
                        <span>Order Now</span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>

                    {/* Hamburger */}
                    <button
                        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>

            {/* Mobile Overlay */}
            <div
                className={`${styles.mobileOverlay} ${menuOpen ? styles.overlayOpen : ""}`}
                onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Drawer */}
            <div className={`${styles.mobileDrawer} ${menuOpen ? styles.drawerOpen : ""}`}>
                <div className={styles.drawerInner}>
                    <ul className={styles.mobileLinks}>
                        {navLinks.map((link, i) => (
                            <li
                                key={link.href}
                                className={styles.mobileLinkItem}
                                style={{ animationDelay: menuOpen ? `${i * 0.06 + 0.1}s` : "0s" }}
                            >
                                <Link
                                    href={link.href}
                                    className={styles.mobileLink}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span className={styles.mobileLinkIndex}>0{i + 1}</span>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.drawerFooter}>
                        <Link href="/order" className={styles.mobileOrderBtn} onClick={() => setMenuOpen(false)}>
                            Order Now
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <p className={styles.drawerTagline}>Elevating spaces since 1947</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}
