"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./BlogGrid.module.css";

const MOCK_POSTS = [
  {
    _id: "5",
    title: "Understanding Elevator Pit Requirements for Modern Buildings",
    excerpt: "Pit depth, waterproofing, lighting — everything architects and contractors need to know about elevator pit design.",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    category: "Engineering",
    author: "Raj Kumar",
    publishDate: new Date("2025-12-10"),
    tags: ["Pit Design", "Architecture", "Engineering"],
    slug: "elevator-pit-requirements",
    readTime: 5,
    status: "published",
  },
  {
    _id: "6",
    title: "Energy Regenerative Drives: The Green Future of Elevators",
    excerpt: "How regenerative drives are cutting elevator energy consumption by up to 75% — and why they matter for sustainable buildings.",
    coverImage: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    category: "Industry Trends",
    author: "Invent Elevator Team",
    publishDate: new Date("2025-11-22"),
    tags: ["Energy", "Green Tech", "Innovation"],
    slug: "energy-regenerative-drives",
    readTime: 6,
    status: "published",
  },
  {
    _id: "7",
    title: "Scissor Lift vs Hydraulic Lift: A Practical Buyer's Guide",
    excerpt: "Side-by-side comparison of two popular industrial lifting solutions — helping you choose based on load, space, and budget.",
    coverImage: "https://images.unsplash.com/photo-1590504805261-29a56cc04b06?w=800&q=80",
    category: "Buyer's Guide",
    author: "Priya Nair",
    publishDate: new Date("2025-11-08"),
    tags: ["Scissor Lift", "Hydraulic", "Guide"],
    slug: "scissor-lift-vs-hydraulic",
    readTime: 7,
    status: "published",
  },
  {
    _id: "8",
    title: "How to Maintain Your Home Elevator: A Complete Annual Checklist",
    excerpt: "Preventive maintenance saves costs and extends product life. Use our detailed checklist to keep your home lift running perfectly.",
    coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    category: "Maintenance",
    author: "Invent Elevator Team",
    publishDate: new Date("2025-10-30"),
    tags: ["Maintenance", "Home Lifts", "Checklist"],
    slug: "home-elevator-maintenance-checklist",
    readTime: 8,
    status: "published",
  },
  {
    _id: "9",
    title: "Car Lift Installation in Residential Complexes: Key Considerations",
    excerpt: "From load capacity to ceiling height clearance — the essential factors behind a safe and efficient residential car lift installation.",
    coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    category: "Installation",
    author: "Raj Kumar",
    publishDate: new Date("2025-10-15"),
    tags: ["Car Lifts", "Installation", "Residential"],
    slug: "car-lift-residential-installation",
    readTime: 5,
    status: "published",
  },
  {
    _id: "10",
    title: "Top 7 Elevator Design Trends Shaping Commercial Buildings in 2026",
    excerpt: "Panoramic cabins, minimalist finishes, destination dispatch — the design ideas that are redefining how elevators integrate with architecture.",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Industry Trends",
    author: "Invent Elevator Team",
    publishDate: new Date("2025-09-28"),
    tags: ["Design", "Commercial", "Trends"],
    slug: "elevator-design-trends-2026",
    readTime: 6,
    status: "published",
  },
];

const ITEMS_PER_PAGE = 6;

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Single Blog Card ──
function BlogCard({ post }) {
  return (
    <Link href={`/blogs/${post.slug || post._id}`} className={styles.card}>
      {/* Image */}
      <div className={styles.imgWrap}>
        <Image
          src={post.coverImage || "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.img}
        />
        <div className={styles.imgOverlay} />
        {post.category && (
          <span className={styles.catBadge}>{post.category}</span>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Read time */}
        {post.readTime && (
          <div className={styles.readTime}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5.5 3.2V5.5l1.4 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {post.readTime} min read
          </div>
        )}

        <h3 className={styles.title}>{post.title}</h3>

        {post.excerpt && (
          <p className={styles.excerpt}>
            {post.excerpt.length > 110 ? post.excerpt.slice(0, 110) + "…" : post.excerpt}
          </p>
        )}

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className={styles.tags}>
            {post.tags.slice(0, 2).map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.author}>
            <div className={styles.authorAvatar}>
              {post.author?.charAt(0).toUpperCase() || "I"}
            </div>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{post.author}</span>
              <span className={styles.authorDate}>{formatDate(post.publishDate)}</span>
            </div>
          </div>

          <div className={styles.arrow}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Skeleton card ──
function SkeletonCard() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonImg} />
      <div className={styles.skeletonBody}>
        <div className={`${styles.skeletonLine} ${styles.skeletonSm}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonLg}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonMd}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonSm}`} />
        <div className={styles.skeletonFoot} />
      </div>
    </div>
  );
}

// ── Main Component ──
export default function BlogGrid({ posts, searchQuery = "", isLoading = false }) {
  const data = posts?.length > 0 ? posts : MOCK_POSTS;
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Build unique categories from posts
  const categories = useMemo(() => {
    const cats = [...new Set(data.map((p) => p.category).filter(Boolean))];
    return ["All", ...cats];
  }, [data]);

  // Filter by category + search query
  const filtered = useMemo(() => {
    return data.filter((post) => {
      const matchCat = activeCategory === "All" || post.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        post.title?.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q) ||
        post.tags?.some((t) => t.toLowerCase().includes(q)) ||
        post.category?.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [data, activeCategory, searchQuery]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory, searchQuery]);

  const shown = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Header + Filters ── */}
        <div className={styles.topBar}>
          <div className={styles.topLeft}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>All Articles</span>
            </div>
            {!isLoading && (
              <span className={styles.resultCount}>
                {filtered.length} {filtered.length === 1 ? "result" : "results"}
              </span>
            )}
          </div>

          {/* Category filter pills */}
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid / States ── */}
        {isLoading ? (
          <div className={styles.grid}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#d8d8d4" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M13 20h14M20 13v14" stroke="#d8d8d4" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className={styles.emptyTitle}>No articles found</p>
            <p className={styles.emptyDesc}>
              Try a different category or search term.
            </p>
            <button
              className={styles.emptyReset}
              onClick={() => { setActiveCategory("All"); }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {shown.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>

            {/* Load more */}
            {hasMore && (
              <div className={styles.loadMore}>
                <button
                  className={styles.loadMoreBtn}
                  onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
                >
                  Load more articles
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className={styles.loadMeta}>
                  Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}
                </span>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
