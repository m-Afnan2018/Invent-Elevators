import Image from "next/image";
import Link from "next/link";
import styles from "./BlogFeatured.module.css";

// Mock featured post using Blog model fields
const MOCK_FEATURED = {
  _id: "1",
  title: "The Future of Vertical Mobility: How Smart Elevators Are Reshaping Modern Architecture",
  excerpt:
    "From AI-powered predictive maintenance to energy-regenerative drives, the elevator industry is undergoing a quiet revolution. We explore the technologies that will define the next decade of vertical transportation.",
  coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=85",
  category: "Industry Trends",
  author: "Invent Elevator Team",
  publishDate: new Date("2026-02-15"),
  tags: ["Smart Elevators", "Architecture", "Innovation"],
  slug: "future-of-vertical-mobility",
  readTime: 8,
};

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogFeatured({ post }) {
  const blog = post || MOCK_FEATURED;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Section label ── */}
        <div className={styles.sectionLabel}>
          <span className={styles.labelLine} />
          <span className={styles.labelText}>Featured Article</span>
        </div>

        {/* ── Featured Card ── */}
        <Link href={`/blogs/${blog.slug || blog._id}`} className={styles.card}>

          {/* Image — left 60% */}
          <div className={styles.imgCol}>
            <div className={styles.imgWrap}>
              <Image
                src={blog.coverImage || "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=85"}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 60vw"
                className={styles.img}
              />
              <div className={styles.imgOverlay} />

              {/* Category pill over image */}
              {blog.category && (
                <span className={styles.categoryPill}>{blog.category}</span>
              )}

              {/* Read time badge */}
              {blog.readTime && (
                <span className={styles.readTimeBadge}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  {blog.readTime} min read
                </span>
              )}
            </div>
          </div>

          {/* Content — right 40% */}
          <div className={styles.contentCol}>
            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className={styles.tags}>
                {blog.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}

            <h2 className={styles.title}>{blog.title}</h2>

            {blog.excerpt && (
              <p className={styles.excerpt}>{blog.excerpt}</p>
            )}

            {/* Author + date */}
            <div className={styles.meta}>
              <div className={styles.authorAvatar}>
                {blog.author?.charAt(0).toUpperCase() || "I"}
              </div>
              <div className={styles.metaInfo}>
                <span className={styles.authorName}>{blog.author || "Invent Team"}</span>
                <span className={styles.metaDate}>{formatDate(blog.publishDate)}</span>
              </div>
            </div>

            {/* Read CTA */}
            <div className={styles.readCta}>
              <span className={styles.readCtaText}>Read Article</span>
              <span className={styles.readCtaArrow}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3.5 9h11M10 4.5L14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>

        </Link>
      </div>
    </section>
  );
}
