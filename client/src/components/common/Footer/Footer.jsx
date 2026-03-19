"use client";

import styles from "./Footer.module.css";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCategories } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";
import { getProjects } from "@/services/projects.service";
import { getBlogs } from "@/services/blogs.service";
import { extractCollection } from "@/lib/apiResponse";

export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadFooterData = async () => {
      const [categoriesRes, productsRes, projectsRes, blogsRes] = await Promise.allSettled([
        getCategories(),
        getProducts(),
        getProjects(),
        getBlogs(),
      ]);

      setCategories(categoriesRes.status === "fulfilled" ? extractCollection(categoriesRes.value, ["categories"]) : []);
      setProducts(productsRes.status === "fulfilled" ? extractCollection(productsRes.value) : []);
      setProjects(projectsRes.status === "fulfilled" ? extractCollection(projectsRes.value) : []);
      setBlogs(blogsRes.status === "fulfilled" ? extractCollection(blogsRes.value) : []);
    };

    loadFooterData();
  }, []);

  const categoryLinks = useMemo(
    () =>
      categories
        .filter((category) => category?._id && category?.name)
        .slice(0, 6)
        .map((category) => ({ label: category.name, href: `/categories/${category._id}` })),
    [categories]
  );

  const latestBlogLinks = useMemo(
    () =>
      blogs
        .filter((blog) => blog?._id && blog?.title)
        .slice(0, 4)
        .map((blog) => ({ label: blog.title, href: `/blogs` })),
    [blogs]
  );

  const companyLinks = [
    { label: "About Invent Lift Group", href: "/about" },
    { label: "Contact us", href: "/contact" },
    { label: "Our Products", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "Blogs", href: "/blogs" },
  ];

  const liveInfo = [
    `${categories.length} Categories`,
    `${products.length} Products`,
    `${projects.length} Projects`,
    `${blogs.length} Blogs`,
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.topBand}>
        <div className={styles.topInner}>
          <div className={styles.topLeft}>
            <p className={styles.topTagline}>Our experts are here to help</p>
            <a href="mailto:info@inventelevator.com" className={styles.topEmail}>info@inventelevator.com</a>
          </div>
          <div className={styles.topRight}><Link href="/contact" className={styles.topCta}>Request a consultation →</Link></div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.mainInner}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}><span className={styles.logoIcon}>▲</span><span className={styles.logoText}>Invent<strong>Elevator</strong></span></Link>
            <p className={styles.brandDesc}>Elevating homes and businesses with precision-engineered lift solutions focused on quality, safety, and responsive support.</p>
            <div className={styles.utilRow}><span className={styles.langBadge}>🌐 English (Global)</span><Link href="/login" className={styles.loginLink}>Login</Link></div>
            <div className={styles.liveChips}>{liveInfo.map((chip) => <span key={chip}>{chip}</span>)}</div>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Our Categories</h4>
            <ul className={styles.linkList}>
              {(categoryLinks.length ? categoryLinks : [{ label: "Browse All Categories", href: "/categories" }]).map((link) => (
                <li key={link.label}><Link href={link.href} className={styles.footerLink}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Company</h4>
            <ul className={styles.linkList}>
              {companyLinks.map((link) => (
                <li key={link.label}><Link href={link.href} className={styles.footerLink}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Latest Insights</h4>
            <ul className={styles.linkList}>
              {(latestBlogLinks.length ? latestBlogLinks : [{ label: "Read Our Blog Articles", href: "/blogs" }]).map((link) => (
                <li key={link.label}><Link href={link.href} className={styles.footerLink}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Get in Touch</h4>
            <ul className={styles.linkList}>
              <li><a href="mailto:info@inventelevator.com" className={styles.footerLink}>info@inventelevator.com</a></li>
              <li><a href="tel:+4600000000" className={styles.footerLink}>+46 00 000 000</a></li>
            </ul>
            <div className={styles.cookieWrap}>
              <h4 className={styles.colHeading} style={{ marginTop: "1.5rem" }}>Preferences</h4>
              <button className={styles.cookieBtn}>🍪 Cookie settings</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>© 2026 Invent Elevator. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy-policy" className={styles.legalLink}>Privacy Policy</Link>
            <span className={styles.dot}>·</span>
            <Link href="/terms" className={styles.legalLink}>Terms of use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
