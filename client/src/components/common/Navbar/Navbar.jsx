"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/services/products.service";
import { getCategories } from "@/services/categories.service";
import { getProjects } from "@/services/projects.service";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const closeTimeoutRef = useRef(null);
  const productsMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(Array.isArray(response) ? response : []);
      } catch (_error) {
        setProducts([]);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!productsMenuRef.current?.contains(event.target)) {
        setProductsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setProductsOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);


  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Our Categories" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const featuredProducts = useMemo(
    () => products.filter((item) => item?.name && item?._id),
    [products]
  );

  const activeCategories = useMemo(
    () =>
      categories
        .filter((item) => item?._id && item?.name)
        .filter((item) => item?.isActive !== false && item?.status !== "inactive")
        .slice(0, 6),
    [categories]
  );

  const featuredProjects = useMemo(
    () =>
      projects
        .filter((item) => item?._id && item?.title)
        .slice(0, 3),
    [projects]
  );

  const openProductsMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setProductsOpen(true);
  };

  const closeProductsMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 130);
  };

  useEffect(() => {
    const loadMenuData = async () => {
      try {
        const [categoryRes, projectRes] = await Promise.all([
          getCategories(),
          getProjects(),
        ]);
        setCategories(Array.isArray(categoryRes) ? categoryRes : []);
        setProjects(Array.isArray(projectRes) ? projectRes : []);
      } catch (_error) {
        setCategories([]);
        setProjects([]);
      }
    };

    loadMenuData();
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <span className={styles.logoIcon}>▲</span>
          <span className={styles.logoText}>
            Invent<strong>Elevator</strong>
          </span>
        </Link>

        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href} style={{ position: "relative" }}>
              <Link href={link.href} className={styles.navLink}>
                {link.label}
                <span className={styles.linkUnderline} />
              </Link>
            </li>
          ))}

          <li
            ref={productsMenuRef}
            className={styles.productsItem}
            onMouseEnter={openProductsMenu}
            onMouseLeave={closeProductsMenu}
          >
            <button
              type="button"
              className={`${styles.navLink} ${styles.productsTrigger}`}
              onClick={() => setProductsOpen((prev) => !prev)}
              aria-expanded={productsOpen}
              aria-haspopup="menu"
            >
              Our Products
              <span className={`${styles.productsChevron} ${productsOpen ? styles.productsChevronOpen : ""}`}>▼</span>
              <span className={styles.linkUnderline} />
            </button>

            {productsOpen && (
              <div className={styles.productsMega} role="menu">
                <div className={styles.productsInner}>
                  <div className={styles.productsLeft}>
                    <ul>
                      <li><Link href="/products" onClick={() => setProductsOpen(false)}>All Products</Link></li>
                      <li><Link href="/categories" onClick={() => setProductsOpen(false)}>Product Categories</Link></li>
                      <li><Link href="/projects" onClick={() => setProductsOpen(false)}>Projects</Link></li>
                      <li><Link href="/contact" onClick={() => setProductsOpen(false)}>Request Consultation</Link></li>
                    </ul>

                    <p className={styles.categoryTitle}>Categories</p>
                    <ul className={styles.categoryList}>
                      {activeCategories.map((category) => (
                        <li key={category._id}>
                          <Link
                            href={`/categories/${category._id}`}
                            className={`${styles.categoryLink} ${resolvedActiveCategoryId === category._id ? styles.categoryLinkActive : ""}`}
                            onMouseEnter={() => setHoveredCategoryId(category._id)}
                            onFocus={() => setHoveredCategoryId(category._id)}
                            onClick={() => setProductsOpen(false)}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.productsRight}>
                    {activeCategoryProducts.length ? (
                      activeCategoryProducts.map((product) => (
                        <Link
                          key={product._id}
                          href={`/products/${product._id}`}
                          className={styles.productCard}
                          onClick={() => setProductsOpen(false)}
                        >
                          <h4>{product.name}</h4>
                          <p>{product.description || "View complete product details."}</p>
                        </Link>
                      ))
                    ) : featuredProducts.length ? (
                      featuredProducts.slice(0, 6).map((product) => (
                        <Link
                          key={product._id}
                          href={`/products/${product._id}`}
                          className={styles.productCard}
                          onClick={() => setProductsOpen(false)}
                        >
                          <h4>{product.name}</h4>
                          <p>{product.description || "View complete product details."}</p>
                        </Link>
                      ))
                    ) : null}

                    {activeCategories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/categories/${category._id}`}
                        className={styles.productCard}
                        onClick={() => setProductsOpen(false)}
                      >
                        <h4>{category.name}</h4>
                        <p>{category.description || "Explore products in this category."}</p>
                      </Link>
                    ))}

                    {featuredProjects.map((project) => (
                      <Link
                        key={project._id}
                        href="/projects"
                        className={styles.productCard}
                        onClick={() => setProductsOpen(false)}
                      >
                        <h4>{project.title}</h4>
                        <p>{project.location || project.description || "View completed project details."}</p>
                      </Link>
                    ))}

                    {!featuredProducts.length && !activeCategories.length && !featuredProjects.length ? (
                      <Link href="/products" className={styles.productCard} onClick={() => setProductsOpen(false)}>
                        <h4>Explore Catalog</h4>
                        <p>Browse our complete list of elevators and lift solutions.</p>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>

        <div className={styles.navRight}>
          <Link href="/contact" className={styles.orderBtn}>
            <span>Get Quote</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

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

      <div
        className={`${styles.mobileOverlay} ${menuOpen ? styles.overlayOpen : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <div className={`${styles.mobileDrawer} ${menuOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerInner}>
          <ul className={styles.mobileLinks}>
            {[...navLinks, { href: "/products", label: "Our Products" }].map((link, i) => (
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
            <Link href="/contact" className={styles.mobileOrderBtn} onClick={() => setMenuOpen(false)}>
              Get Quote
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
