'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className={styles.header}>
            <div className={styles.navbar}>

                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    MyBrand
                </Link>

                {/* Menu */}
                <ul className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/services">Services</Link></li>
                    <li><Link href="/contact">Contact</Link></li>

                    {/* Mobile CTA */}
                    <li className={styles.mobileCta}>
                        <Link href="/get-started" className={styles.cta}>
                            Get Started
                        </Link>
                    </li>
                </ul>

                {/* Desktop CTA */}
                <Link href="/get-started" className={styles.ctaDesktop}>
                    Get Started
                </Link>

                {/* Hamburger */}
                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

            </div>
        </header>
    )
}
