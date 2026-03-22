"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import { getCategories } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";
import { getProjects } from "@/services/projects.service";
import { getBlogs } from "@/services/blogs.service";
import { extractCollection } from "@/lib/apiResponse";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1800&q=80",
];

const FALLBACK_CATEGORIES = [
  {
    _id: "home-lifts",
    __fallback: true,
    name: "Home Lifts",
    description: "Luxury mobility for modern living",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "passenger-lifts",
    __fallback: true,
    name: "Passenger Lifts",
    description: "Engineered for high-performance movement",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "car-lifts",
    __fallback: true,
    name: "Car Lifts",
    description: "Precision lifting for vehicle transportation",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "dumbwaiters",
    __fallback: true,
    name: "Dumbwaiters",
    description: "Compact efficiency for seamless service",
    image: "https://images.unsplash.com/photo-1581091215367-59ab6dcef5f0?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "chair-lifts",
    __fallback: true,
    name: "Chair Lifts",
    description: "Safe & comfortable accessibility",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "pod-lifts",
    __fallback: true,
    name: "Pod Lifts",
    description: "Architectural elegance in motion",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
  },
];

const FALLBACK_PRODUCTS = [
  {
    _id: "home-lift",
    name: "Home Lift",
    description: "Space-efficient design with silent, smooth operation and advanced safety mechanisms.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "passenger-lift",
    name: "Passenger Lift",
    description: "Energy-efficient drive systems with intelligent control panels and high load capacity.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "car-lift",
    name: "Car Lift",
    description: "Heavy-duty structural design with smooth start & stop technology.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "dumbwaiter",
    name: "Dumbwaiter",
    description: "Space-saving compact design with smooth, quiet operation.",
    image: "https://images.unsplash.com/photo-1581091215367-59ab6dcef5f0?auto=format&fit=crop&w=900&q=80",
  },
];

const FALLBACK_PROJECTS = [
  {
    _id: "p1", __fallback: true,
    title: "Luxury Villa Complex", location: "Dubai, UAE",
    description: "4 custom home lifts installed across premium residential villas.",
  },
  {
    _id: "p2", __fallback: true,
    title: "Corporate Office Tower", location: "Abu Dhabi, UAE",
    description: "High-speed passenger elevators with destination control system.",
  },
  {
    _id: "p3", __fallback: true,
    title: "Hospitality & Restaurant Chain", location: "Sharjah, UAE",
    description: "Dumbwaiter systems for seamless kitchen-to-floor service.",
  },
];

const FALLBACK_BLOGS = [
  { _id: "b1", title: "How to Choose the Right Elevator for Your Home", excerpt: "A practical guide for homeowners and architects across the UAE." },
  { _id: "b2", title: "5 Maintenance Habits That Extend Elevator Life", excerpt: "Reduce downtime with proactive, data-driven service planning." },
  { _id: "b3", title: "Elevator Safety Features Every Client Should Know", excerpt: "From ARD to emergency communication systems — what matters most." },
];

const WHY_FEATURES = [
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "500+ Design Variations",
    desc: "Fully customisable cabins, finishes, and drive systems to match any architectural vision.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: "10+ Years Expertise",
    desc: "A decade of engineering excellence delivering safe, reliable vertical mobility solutions.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    title: "International Safety Standards",
    desc: "Every installation complies with international safety certifications and local regulations.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Residential & Commercial",
    desc: "From private villas to commercial towers — we deliver precision across every project type.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Energy Efficient",
    desc: "Eco-friendly drive systems designed for low power consumption and reduced operating costs.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "15+ Trusted Partners",
    desc: "A vetted global supply chain ensuring quality components and long-term reliability.",
  },
];

const MARQUEE_ITEMS = [
  "NON-PROPRIETARY", "100% CUSTOMISABLE", "ECO-FRIENDLY", "COMPACT DESIGN",
  "SAFETY CERTIFIED", "ENGINEERED IN UAE", "10+ YEARS EXPERTISE", "100+ PROJECTS",
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [heroIdx, setHeroIdx] = useState(0);
  const heroTimer = useRef(null);

  useEffect(() => {
    heroTimer.current = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(heroTimer.current);
  }, []);

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
      } catch (_e) {}
    };
    loadHomeData();
  }, []);

  const activeCategories = useMemo(() => {
    const valid = categories.filter((c) => c?._id && c?.name && c?.isActive !== false).slice(0, 6);
    return valid.length ? valid : FALLBACK_CATEGORIES;
  }, [categories]);

  const featuredProducts = useMemo(() => {
    const valid = products.filter((p) => p?._id && p?.name);
    const featured = valid.filter((p) => p.isFeatured);
    const list = (featured.length ? featured : valid).slice(0, 4);
    return list.length ? list : FALLBACK_PRODUCTS;
  }, [products]);

  const featuredProjects = useMemo(() => {
    const valid = projects.filter((p) => p?._id && p?.title).slice(0, 3);
    return valid.length ? valid : FALLBACK_PROJECTS;
  }, [projects]);

  const latestBlogs = useMemo(() => {
    const valid = blogs.filter((b) => b?._id && b?.title).slice(0, 3);
    return valid.length ? valid : FALLBACK_BLOGS;
  }, [blogs]);

  const stats = [
    { value: "100+", label: "Projects Delivered" },
    { value: "500+", label: "Design Variations" },
    { value: "10+",  label: "Years of Expertise" },
    { value: "4.8★", label: "Google Rating" },
  ];

  return (
    <main className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        {HERO_IMAGES.map((src, i) => (
          <div key={src} className={`${styles.heroBg} ${i === heroIdx ? styles.heroBgActive : ""}`}>
            <Image src={src} alt="Invent Elevator" fill sizes="100vw" className={styles.heroBgImg} priority={i === 0} />
          </div>
        ))}
        <div className={styles.heroOverlay} />
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>Engineered in the UAE · Trusted Across Projects</span>
            <h1 className={styles.heroH1}>
              Premium Elevator Systems<br />
              <span className={styles.heroAccent}>Designed for Modern Architecture</span>
            </h1>
            <p className={styles.heroDesc}>
              From bespoke home lifts to high-performance commercial elevators — we deliver
              safe, silent, and elegantly engineered vertical mobility solutions tailored to
              every space.
            </p>
            <div className={styles.heroActions}>
              <a href="tel:+971585723553" className={styles.primaryBtn}>
                <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><path d="M3 2h3.5L8 5.5l-2 1.2a9 9 0 004.3 4.3l1.2-2L15 10.5V14a1 1 0 01-1 1C6.8 15 2 9.2 2 3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                Call Us Now
              </a>
              <Link href="/contact" className={styles.secondaryBtn}>Get a Free Quote →</Link>
            </div>
            <div className={styles.statsRow}>
              {stats.map((s) => (
                <div key={s.label} className={styles.statPill}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className={styles.scrollHint}>
          <div className={styles.scrollDot} />
        </div>
      </section>

      {/* ── Marquee Strip ── */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDot} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Categories ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.sectionEyebrow}>What We Offer</p>
              <h2 className={styles.sectionTitle}>Complete Lift Solutions</h2>
            </div>
            <Link href="/categories" className={styles.viewAll}>View All Solutions →</Link>
          </div>
          <div className={styles.categoriesGrid}>
            {activeCategories.map((cat) => (
              <Link
                key={cat._id}
                href={cat.__fallback ? "/categories" : `/categories/${cat._id}`}
                className={styles.catCard}
              >
                <div className={styles.catImgWrap}>
                  <Image
                    src={cat.image || FALLBACK_IMAGE}
                    alt={cat.name}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className={styles.catImg}
                  />
                  <div className={styles.catOverlay} />
                </div>
                <div className={styles.catBody}>
                  <h3 className={styles.catName}>{cat.name}</h3>
                  <p className={styles.catDesc}>{cat.description || "Precision engineered for reliability"}</p>
                  <span className={styles.catLink}>Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose ── */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.sectionEyebrow}>Why Choose Invent</p>
              <h2 className={styles.sectionTitle}>Elevating Spaces with Precision,<br className={styles.brDesktop} /> Safety & Design Excellence</h2>
            </div>
          </div>
          <div className={styles.whyGrid}>
            {WHY_FEATURES.map((f) => (
              <div key={f.title} className={styles.whyCard}>
                <div className={styles.whyIcon}>{f.icon}</div>
                <h3 className={styles.whyTitle}>{f.title}</h3>
                <p className={styles.whyDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.sectionEyebrow}>Our Products</p>
              <h2 className={styles.sectionTitle}>Featured Lift Systems</h2>
            </div>
            <Link href="/products" className={styles.viewAll}>All Products →</Link>
          </div>
          <div className={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <Link
                key={product._id}
                href={product.__fallback ? "/products" : `/products/${product._id}`}
                className={styles.productCard}
              >
                <div className={styles.productImgWrap}>
                  <Image
                    src={product.image || product.images?.[0] || FALLBACK_IMAGE}
                    alt={product.name}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className={styles.productImg}
                  />
                  {product.isFeatured && (
                    <span className={styles.featuredBadge}>Featured</span>
                  )}
                </div>
                <div className={styles.productBody}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  {(product.capacity || product.speed || product.stops) && (
                    <div className={styles.productSpecs}>
                      {product.capacity && <span>{product.capacity}</span>}
                      {product.speed && <span>{product.speed}</span>}
                      {product.stops && <span>{product.stops} stops</span>}
                    </div>
                  )}
                  <p className={styles.productDesc}>
                    {(product.description || product.shortDescription || "Precision engineered for reliability and comfort.").slice(0, 90)}
                    {(product.description || "").length > 90 ? "…" : ""}
                  </p>
                  <span className={styles.productCta}>View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerBg}>
          <Image
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80"
            alt="Invent Elevator"
            fill
            sizes="100vw"
            className={styles.ctaBannerImg}
          />
        </div>
        <div className={styles.ctaBannerOverlay} />
        <div className={styles.container}>
          <div className={styles.ctaBannerContent}>
            <p className={styles.ctaBannerEyebrow}>Ready to Start?</p>
            <h2 className={styles.ctaBannerTitle}>Planning a Lift Installation?</h2>
            <p className={styles.ctaBannerDesc}>
              Fill in your requirements and our engineering team will recommend the ideal
              lift model, specification, and installation plan — at no cost.
            </p>
            <div className={styles.ctaBannerActions}>
              <Link href="/contact" className={styles.ctaBannerPrimary}>Get a Free Quote</Link>
              <a href="tel:+971585723553" className={styles.ctaBannerSecondary}>
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M2.5 2H6l1.5 3.5-2 1.2a8 8 0 003.8 3.8l1.2-2L14 10v3.5a1 1 0 01-1 1C6.2 14.5 1.5 9.8 1.5 3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
                +971 58 572 3553
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.sectionEyebrow}>Our Work</p>
              <h2 className={styles.sectionTitle}>Projects Delivered</h2>
            </div>
            <Link href="/projects" className={styles.viewAll}>See All Projects →</Link>
          </div>
          <div className={styles.projectsGrid}>
            {featuredProjects.map((project, i) => (
              <Link
                key={project._id}
                href={project.__fallback ? "/projects" : `/projects/${project._id}`}
                className={styles.projectCard}
              >
                <div className={styles.projectImgWrap}>
                  <Image
                    src={project.image || project.images?.[0] || `https://images.unsplash.com/photo-${["1486406146926-c627a92ad1ab", "1460317442991-0ec209397118", "1519494026892-80bbd2d6fd0d"][i % 3]}?auto=format&fit=crop&w=900&q=80`}
                    alt={project.title}
                    fill
                    sizes="(max-width:640px) 100vw, 33vw"
                    className={styles.projectImg}
                  />
                  <div className={styles.projectImgOverlay} />
                </div>
                <div className={styles.projectBody}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  {project.location && <p className={styles.projectLocation}>📍 {project.location}</p>}
                  <p className={styles.projectDesc}>
                    {(project.description || "Custom vertical mobility solution.").slice(0, 100)}
                    {(project.description || "").length > 100 ? "…" : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      <section className={`${styles.section} ${styles.blogSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.sectionEyebrow}>Insights</p>
              <h2 className={styles.sectionTitle}>Latest from Our Blog</h2>
            </div>
            <Link href="/blogs" className={styles.viewAll}>Read More →</Link>
          </div>
          <div className={styles.blogsGrid}>
            {latestBlogs.map((blog) => (
              <Link
                key={blog._id}
                href={blog.slug ? `/blog/${blog.slug}` : blog.__fallback ? "/blogs" : `/blog/${blog._id}`}
                className={styles.blogCard}
              >
                {(blog.coverImage || blog.image) && (
                  <div className={styles.blogImgWrap}>
                    <Image
                      src={blog.coverImage || blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width:640px) 100vw, 33vw"
                      className={styles.blogImg}
                    />
                  </div>
                )}
                <div className={styles.blogBody}>
                  {blog.category && <span className={styles.blogTag}>{blog.category}</span>}
                  <h3 className={styles.blogTitle}>{blog.title}</h3>
                  <p className={styles.blogExcerpt}>
                    {blog.excerpt || blog.shortDescription || "Latest updates from our engineering and installation team."}
                  </p>
                  <span className={styles.blogReadMore}>Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
