import Image from "next/image";
import Link from "next/link";
import styles from "./BlogSecondary.module.css";

const MOCK_POSTS = [
  {
    _id: "2",
    title: "Hydraulic vs Traction Elevators: Which Is Right for Your Building?",
    excerpt: "A detailed engineering comparison of the two dominant elevator technologies — covering cost, energy, maintenance and suitability for different building types.",
    coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
    category: "Engineering",
    author: "Raj Kumar",
    publishDate: new Date("2026-01-28"),
    tags: ["Hydraulic", "Traction", "Comparison"],
    slug: "hydraulic-vs-traction-elevators",
    readTime: 6,
  },
  {
    _id: "3",
    title: "5 Things to Consider Before Installing a Home Lift",
    excerpt: "From shaft dimensions to power supply requirements, here's what every homeowner should evaluate before committing to a residential elevator installation.",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    category: "Home Lifts",
    author: "Priya Nair",
    publishDate: new Date("2026-01-14"),
    tags: ["Home Lifts", "Installation", "Guide"],
    slug: "things-to-consider-home-lift",
    readTime: 5,
  },
  {
    _id: "4",
    title: "How EN 81-41 Safety Standards Are Shaping the Platform Lift Industry",
    excerpt: "Unpacking the European safety norm that governs platform lifts — and how manufacturers like Invent Elevator are designing for compliance from the ground up.",
    coverImage: "https://images.unsplash.com/photo-1590504805261-29a56cc04b06?w=900&q=80",
    category: "Safety & Compliance",
    author: "Invent Elevator Team",
    publishDate: new Date("2025-12-20"),
    tags: ["Safety", "EN 81-41", "Compliance"],
    slug: "en-81-41-safety-standards",
    readTime: 7,
  },
];

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Large card (left) ──
function LargeCard({ post }) {
  return (
    <Link href={post?.slug ? `/blog/${post.slug}` : "/blogs"} className={styles.largeCard}>
      {/* Image */}
      <div className={styles.largeImgWrap}>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className={styles.largeImg}
        />
        <div className={styles.largeOverlay} />

        {/* Overlaid content */}
        <div className={styles.largeContent}>
          <div className={styles.largeMeta}>
            {post.category && (
              <span className={styles.largeCat}>{post.category}</span>
            )}
            {post.readTime && (
              <span className={styles.largeReadTime}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M5.5 3.2V5.5l1.4 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {post.readTime} min
              </span>
            )}
          </div>
          <h3 className={styles.largeTitle}>{post.title}</h3>
          <p className={styles.largeExcerpt}>
            {post.excerpt?.length > 120 ? post.excerpt.slice(0, 120) + "…" : post.excerpt}
          </p>
          <div className={styles.largeFoot}>
            <span className={styles.largeAuthor}>{post.author}</span>
            <span className={styles.largeDot}>·</span>
            <span className={styles.largeDate}>{formatDate(post.publishDate)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Small card (right stack) ──
function SmallCard({ post }) {
  return (
    <Link href={post?.slug ? `/blog/${post.slug}` : "/blogs"} className={styles.smallCard}>
      {/* Image */}
      <div className={styles.smallImgWrap}>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 900px) 100vw, 25vw"
          className={styles.smallImg}
        />
        <div className={styles.smallOverlay} />
        {post.category && (
          <span className={styles.smallCat}>{post.category}</span>
        )}
      </div>

      {/* Content */}
      <div className={styles.smallContent}>
        <div className={styles.smallMeta}>
          {post.readTime && (
            <span className={styles.smallReadTime}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5.5 3.2V5.5l1.4 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {post.readTime} min read
            </span>
          )}
        </div>
        <h3 className={styles.smallTitle}>{post.title}</h3>
        <div className={styles.smallFoot}>
          <span className={styles.smallAuthor}>{post.author}</span>
          <span className={styles.smallDot}>·</span>
          <span className={styles.smallDate}>{formatDate(post.publishDate)}</span>
        </div>

        {/* Arrow */}
        <div className={styles.smallArrow}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function BlogSecondary({ posts }) {
  const data = posts?.length > 0 ? posts : MOCK_POSTS;
  const [large, ...smalls] = data;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Label ── */}
        <div className={styles.sectionLabel}>
          <span className={styles.labelLine} />
          <span className={styles.labelText}>Latest Articles</span>
        </div>

        {/* ── Magazine row ── */}
        <div className={styles.row}>
          {/* Left: large card */}
          {large && <LargeCard post={large} />}

          {/* Right: two small cards stacked */}
          {smalls.length > 0 && (
            <div className={styles.smallStack}>
              {smalls.slice(0, 2).map((post) => (
                <SmallCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
