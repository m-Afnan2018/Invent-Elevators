"use client";
import Image from "next/image";
import styles from "./InsightsSection.module.css";
import Link from "next/link";

const articles = [
  {
    id: 1,
    category: "Buying Guide",
    title: "Choosing the Right Home Elevator",
    desc: "Discover key factors to consider when selecting a residential lift from space requirements to safety features and design flexibility.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    readTime: "5 min read",
    href: "/blog/choosing-right-home-elevator",
    cta: "View More",
  },
  {
    id: 2,
    category: "Technology",
    title: "Hydraulic vs. Screw Drive Technology",
    desc: "Understand the differences between lift mechanisms and find out which solution delivers better efficiency, maintenance ease, and performance.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    readTime: "7 min read",
    href: "/blog/hydraulic-vs-screw-drive",
    cta: "Discover this project",
  },
  {
    id: 3,
    category: "Safety",
    title: "Safety Standards in Modern Elevators",
    desc: "Explore the latest safety innovations and compliance standards that ensure reliable and secure vertical transportation systems.",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80",
    readTime: "6 min read",
    href: "/blog/safety-standards-modern-elevators",
    cta: "Discover this project",
  },
];

const categoryColors = {
  "Buying Guide": { bg: "rgba(21,101,192,0.1)", color: "#1565c0" },
  Technology:     { bg: "rgba(2,119,189,0.1)",  color: "#0277bd" },
  Safety:         { bg: "rgba(46,125,50,0.1)",   color: "#2e7d32" },
};

export default function InsightsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>Insights &amp; Industry Updates</span>
            <h2 className={styles.heading}>
              Stay Ahead with <br />
              <em>Expert Knowledge</em>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.headerDesc}>
              Stay updated with the latest trends, innovations, and expert
              insights in elevator technology, installation practices, and
              vertical mobility solutions.
            </p>
            <Link href="/blogs" className={styles.viewAllBtn}>
              View all references
              <span className={styles.btnArrow}>→</span>
            </Link>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className={styles.grid}>
          {articles.map((article, i) => {
            const badge = categoryColors[article.category] || categoryColors["Safety"];
            return (
              <article
                key={article.id}
                className={styles.card}
                style={{ "--delay": `${i * 0.1}s` }}
              >
                {/* Image */}
                <div className={styles.cardImageWrap}>
                  <Image
                    width={100}
                    height={100}
                    src={article.image}
                    alt={article.title}
                    className={styles.cardImage}
                  />
                  {/* Category badge */}
                  <span
                    className={styles.categoryBadge}
                    style={{ background: badge.bg, color: badge.color }}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Body */}
                <div className={styles.cardBody}>
                  <span className={styles.readTime}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {article.readTime}
                  </span>

                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  <p className={styles.cardDesc}>{article.desc}</p>

                  <Link href={article.href} className={styles.cardCta}>
                    {article.cta}
                    <span className={styles.ctaArrow}>↗</span>
                  </Link>
                </div>

                {/* Hover line */}
                <div className={styles.cardBar} />
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
