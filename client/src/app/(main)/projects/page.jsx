"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/services/projects.service";
import { extractCollection } from "@/lib/apiResponse";
import styles from "./page.module.css";

const FALLBACK_PROJECTS = [
  {
    _id: "luxury-villa-uae",
    __fallback: true,
    title: "Luxury Villa Complex",
    description: "4 custom home lifts installed across premium residential villas with silent operation and bespoke cabin finishes.",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "corporate-tower-uae",
    __fallback: true,
    title: "Corporate Office Tower",
    description: "High-speed passenger elevators with intelligent destination control and energy-efficient drive systems.",
    location: "Abu Dhabi, UAE",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "restaurant-chain-uae",
    __fallback: true,
    title: "Hospitality & Restaurant Chain",
    description: "Dumbwaiter systems installed for seamless kitchen-to-floor service in a multi-floor dining establishment.",
    location: "Sharjah, UAE",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "residential-complex",
    __fallback: true,
    title: "Residential Complex",
    description: "Passenger lifts across a multi-tower residential development with centralised monitoring.",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "medical-facility",
    __fallback: true,
    title: "Medical Facility",
    description: "Bed and stretcher elevator systems with emergency power backup for uninterrupted operations.",
    location: "UAE",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "car-park-structure",
    __fallback: true,
    title: "Multi-Level Car Park",
    description: "Heavy-duty car lift systems engineered for high-frequency vehicle transportation in limited spaces.",
    location: "UAE",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(extractCollection(response));
      } catch (_error) {
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  const showcaseProjects = useMemo(() => {
    const valid = projects.filter((p) => p?._id && p?.title);
    return valid.length ? valid : FALLBACK_PROJECTS;
  }, [projects]);

  return (
    <main className={styles.main}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        {/* Background image */}
        <div className={styles.heroBgWrap}>
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80"
            alt="Modern building projects"
            fill
            priority
            sizes="100vw"
            className={styles.heroBgImg}
          />
        </div>
        <div className={styles.heroOverlayTop} />
        <div className={styles.heroOverlayBottom} />

        {/* Breadcrumb */}
        <nav className={styles.heroBreadcrumb}>
          <Link href="/" className={styles.heroBcLink}>Home</Link>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.heroBcChevron}>
            <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={styles.heroBcActive}>Projects</span>
        </nav>

        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>Our Portfolio</span>
          </div>
          <h1 className={styles.heroTitle}>Projects Delivered</h1>
          <p className={styles.heroDesc}>
            Explore completed lift installations and success stories across residential
            villas, commercial towers, hospitality venues, and healthcare facilities
            across the UAE.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <strong>100+</strong>
              <span>Projects</span>
            </div>
            <div className={styles.heroStat}>
              <strong>500+</strong>
              <span>Design Variations</span>
            </div>
            <div className={styles.heroStat}>
              <strong>10+</strong>
              <span>Years</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.heroScrollWrap}>
          <span className={styles.heroScrollLabel}>Scroll to explore</span>
          <div className={styles.heroScrollTrack}>
            <div className={styles.heroScrollThumb} />
          </div>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          {isLoading ? (
            <div className={styles.grid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.skeleton}>
                  <div className={styles.skeletonImg} />
                  <div className={styles.skeletonBody}>
                    <div className={styles.skeletonLine} style={{ width: "70%" }} />
                    <div className={styles.skeletonLine} style={{ width: "90%" }} />
                    <div className={styles.skeletonLine} style={{ width: "50%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {showcaseProjects.map((project) => (
                <Link
                  key={project._id}
                  href={project.__fallback ? "/projects" : `/projects/${project._id}`}
                  className={styles.card}
                >
                  <div className={styles.cardImgWrap}>
                    <Image
                      src={project.image || project.images?.[0] || "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80"}
                      alt={project.title}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className={styles.cardImg}
                    />
                    <div className={styles.cardImgOverlay} />
                    {project.location && (
                      <span className={styles.locationBadge}>📍 {project.location}</span>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>
                      {(project.description || "Custom vertical mobility solution.").slice(0, 120)}
                      {(project.description || "").length > 120 ? "…" : ""}
                    </p>
                    <span className={styles.cardLink}>View Project →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className={styles.ctaWrap}>
            <p className={styles.ctaText}>Want to see more? Request our full project portfolio.</p>
            <Link href="/contact" className={styles.cta}>
              Request Portfolio →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
