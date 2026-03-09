"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import { getCategories } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";
import { getProjects } from "@/services/projects.service";
import { getBlogs } from "@/services/blogs.service";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [categoryRes, productRes, projectRes, blogRes] = await Promise.all([
          getCategories(),
          getProducts(),
          getProjects(),
          getBlogs(),
        ]);

        setCategories(Array.isArray(categoryRes) ? categoryRes : []);
        setProducts(Array.isArray(productRes) ? productRes : []);
        setProjects(Array.isArray(projectRes) ? projectRes : []);
        setBlogs(Array.isArray(blogRes) ? blogRes : []);
      } catch (_error) {
        setCategories([]);
        setProducts([]);
        setProjects([]);
        setBlogs([]);
      }
    };

    loadHomeData();
  }, []);

  const activeCategories = useMemo(
    () =>
      categories
        .filter((category) => category?._id && category?.name)
        .filter((category) => category?.isActive !== false && category?.status !== "inactive")
        .slice(0, 6),
    [categories]
  );

  const featuredProducts = useMemo(
    () => products.filter((product) => product?._id && product?.name).slice(0, 4),
    [products]
  );

  const featuredProjects = useMemo(
    () => projects.filter((project) => project?._id && project?.title).slice(0, 3),
    [projects]
  );

  const latestBlogs = useMemo(
    () => blogs.filter((blog) => blog?._id && blog?.title).slice(0, 3),
    [blogs]
  );

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.container}>
          <p className={styles.eyebrow}>Invent Elevator · Complete Vertical Mobility</p>
          <h1>Elegant Elevators for Modern Homes & Commercial Towers</h1>
          <p>
            Inspired by the premium global aesthetic, we deliver luxury-ready lift
            systems that are safe, smooth, and fully customizable — integrated with
            your existing backend product, project, and lead management workflows.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryBtn}>Request Consultation</Link>
            <Link href="/products" className={styles.secondaryBtn}>Explore Product Range</Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2>Product Categories</h2>
            <Link href="/categories">View All</Link>
          </div>
          <div className={styles.gridThree}>
            {activeCategories.map((category) => (
              <Link key={category._id} href={`/categories/${category._id}`} className={styles.categoryCard}>
                <div
                  className={styles.cardMedia}
                  style={{ backgroundImage: `url(${category.image || FALLBACK_IMAGE})` }}
                />
                <div className={styles.cardBody}>
                  <h3>{category.name}</h3>
                  <span>Discover solutions →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.lightSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2>Featured Products</h2>
            <Link href="/products">All Products</Link>
          </div>
          <div className={styles.gridFour}>
            {featuredProducts.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`} className={styles.productCard}>
                <img src={product.image || FALLBACK_IMAGE} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description || "Precision engineered for reliability and comfort."}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2>Projects Delivered</h2>
            <Link href="/projects">See All Projects</Link>
          </div>
          <div className={styles.gridThree}>
            {featuredProjects.map((project) => (
              <Link key={project._id} href="/projects" className={styles.projectCard}>
                <h3>{project.title}</h3>
                <p>{project.location || project.description || "Custom-installed for demanding spaces."}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.lightSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2>Insights & Blogs</h2>
            <Link href="/blogs">Read More</Link>
          </div>
          <div className={styles.gridThree}>
            {latestBlogs.map((blog) => (
              <Link key={blog._id} href="/blogs" className={styles.blogCard}>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt || blog.shortDescription || "Latest updates from our engineering and installation team."}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
