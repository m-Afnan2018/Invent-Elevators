"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import { getCategories } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";
import { getProjects } from "@/services/projects.service";
import { getBlogs } from "@/services/blogs.service";
import { extractCollection } from "@/lib/apiResponse";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80";

const FALLBACK_CATEGORIES = [
  {
    _id: "home-lifts",
    __fallback: true,
    name: "Home Elevators",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "passenger-lifts",
    __fallback: true,
    name: "Passenger Lifts",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "hospital-elevators",
    __fallback: true,
    name: "Hospital Elevators",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
  },
];

const FALLBACK_PRODUCTS = [
  {
    _id: "gearless-machine",
    name: "Gearless Machine-Room Elevator",
    description: "Quiet, smooth, and energy efficient operation for premium buildings.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "villa-lift",
    name: "Villa Lift",
    description: "Compact footprint elevator engineered for modern residential spaces.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "panoramic-lift",
    name: "Panoramic Elevator",
    description: "Architectural glass cabin design that adds elegance and visibility.",
    image:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "freight-lift",
    name: "Freight Elevator",
    description: "Robust heavy-duty lifting solution for industrial and logistics sites.",
    image:
      "https://images.unsplash.com/photo-1581091215367-59ab6dcef5f0?auto=format&fit=crop&w=900&q=80",
  },
];

const FALLBACK_PROJECTS = [
  {
    _id: "project-1",
    __fallback: true,
    title: "Skyline Corporate Tower",
    location: "Bengaluru, India",
    description: "8 high-speed passenger elevators with destination control.",
  },
  {
    _id: "project-2",
    __fallback: true,
    title: "Green Valley Residences",
    location: "Pune, India",
    description: "Luxury home lift integration across 12 premium villas.",
  },
  {
    _id: "project-3",
    __fallback: true,
    title: "CityCare Medical Center",
    location: "Hyderabad, India",
    description: "Bed and stretcher elevator systems with emergency power backup.",
  },
];

const FALLBACK_BLOGS = [
  {
    _id: "blog-1",
    title: "How to Choose the Right Elevator for Your Building",
    excerpt: "A practical checklist for architects, builders, and property owners.",
  },
  {
    _id: "blog-2",
    title: "5 Maintenance Habits That Extend Elevator Life",
    excerpt: "Reduce downtime with proactive, data-driven service planning.",
  },
  {
    _id: "blog-3",
    title: "Elevator Safety Features Every Client Should Know",
    excerpt: "From ARD to emergency communication systems, here is what matters.",
  },
];

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

        setCategories(extractCollection(categoryRes, ["categories"]));
        setProducts(extractCollection(productRes));
        setProjects(extractCollection(projectRes));
        setBlogs(extractCollection(blogRes));
      } catch (_error) {
        setCategories([]);
        setProducts([]);
        setProjects([]);
        setBlogs([]);
      }
    };

    loadHomeData();
  }, []);

  const activeCategories = useMemo(() => {
    const dynamicCategories = categories
      .filter((category) => category?._id && category?.name)
      .filter((category) => category?.isActive !== false && category?.status !== "inactive")
      .slice(0, 6);

    return dynamicCategories.length ? dynamicCategories : FALLBACK_CATEGORIES;
  }, [categories]);

  const featuredProducts = useMemo(() => {
    const dynamicProducts = products.filter((product) => product?._id && product?.name).slice(0, 4);
    return dynamicProducts.length ? dynamicProducts : FALLBACK_PRODUCTS;
  }, [products]);

  const featuredProjects = useMemo(() => {
    const dynamicProjects = projects.filter((project) => project?._id && project?.title).slice(0, 3);
    return dynamicProjects.length ? dynamicProjects : FALLBACK_PROJECTS;
  }, [projects]);

  const latestBlogs = useMemo(() => {
    const dynamicBlogs = blogs.filter((blog) => blog?._id && blog?.title).slice(0, 3);
    return dynamicBlogs.length ? dynamicBlogs : FALLBACK_BLOGS;
  }, [blogs]);

  const operationalStats = [
    { label: "Projects Delivered", value: projects.length || 150 },
    { label: "Active Product Models", value: products.length || 35 },
    { label: "Cities Served", value: 22 },
    { label: "Support Availability", value: "24/7" },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero} style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className={styles.heroOverlay} />
        <div className={styles.container}>
          <p className={styles.eyebrow}>Invent Elevator · Complete Vertical Mobility</p>
          <h1>Elegant Elevators for Modern Homes & Commercial Towers</h1>
          <p>
            We design, install, and maintain world-class lift systems with a seamless
            customer journey — from planning and product selection to commissioning and
            after-sales support.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryBtn}>Request Consultation</Link>
            <Link href="/products" className={styles.secondaryBtn}>Explore Product Range</Link>
          </div>
          <div className={styles.statsGrid}>
            {operationalStats.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
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
              <Link
                key={category._id}
                href={category.__fallback ? "/categories" : `/categories/${category._id}`}
                className={styles.categoryCard}
              >
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
              <Link
                key={project._id}
                href={project.__fallback ? "/projects" : `/projects/${project._id}`}
                className={styles.projectCard}
              >
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
