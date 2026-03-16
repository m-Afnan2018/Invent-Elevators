"use client";
import styles from "./OurProjects.module.css";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getProjects } from "@/services/projects.service";

export default function OurProjects() {
  const [hovered, setHovered] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(Array.isArray(response) ? response : []);
      } catch (_error) {
        setProjects([]);
      }
    };

    loadProjects();
  }, []);

  const visibleProjects = useMemo(
    () => projects.filter((project) => project?._id && project?.title).slice(0, 3),
    [projects]
  );

  const fallbackImage = "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80";

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>Our Projects</span>
            <h2 className={styles.heading}>
              Real Installations, <br />
              <em>Real Impact</em>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.headerDesc}>
              Explore our portfolio of completed lift installations across
              residential, commercial, and industrial sectors worldwide. Each
              project reflects our commitment to precision engineering and
              long-term reliability.
            </p>
            <Link href="/projects" className={styles.viewAllBtn}>
              View all references
              <span className={styles.btnArrow}>→</span>
            </Link>
          </div>
        </div>

        {/* ── Masonry-style grid ── */}
        <div className={styles.grid}>
          {/* Large card — left */}
          {visibleProjects[0] ? (
            <Link
              href={visibleProjects[0].__fallback ? "/projects" : `/projects/${visibleProjects[0]._id}`}
              className={`${styles.card} ${styles.cardLarge}`}
              onMouseEnter={() => setHovered(0)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={styles.cardBg}
                style={{ backgroundImage: `url(${visibleProjects[0].featuredImage || fallbackImage})` }}
              />
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <span className={styles.cardTag}>{visibleProjects[0].category || "Project"}</span>
                <h3 className={styles.cardTitle}>{visibleProjects[0].title}</h3>
                <span className={`${styles.discoverBtn} ${hovered === 0 ? styles.discoverVisible : ""}`}>
                  Discover this project ↗
                </span>
              </div>
            </Link>
          ) : null}

          {/* Right column — two small cards stacked */}
          <div className={styles.rightCol}>
            {visibleProjects.slice(1).map((project, i) => (
              <Link
                key={project._id}
                href={project.__fallback ? "/projects" : `/projects/${project._id}`}
                className={`${styles.card} ${styles.cardSmall}`}
                onMouseEnter={() => setHovered(i + 1)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={styles.cardBg}
                  style={{ backgroundImage: `url(${project.featuredImage || fallbackImage})` }}
                />
                <div className={styles.cardOverlay} />
                <div className={styles.cardContent}>
                  <span className={styles.cardTag}>{project.category || "Project"}</span>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <span className={`${styles.discoverBtn} ${hovered === i + 1 ? styles.discoverVisible : ""}`}>
                    Discover this project ↗
                  </span>
                </div>
              </Link>
            ))}

            {!visibleProjects.length ? (
              <Link href="/projects" className={`${styles.card} ${styles.cardSmall}`}>
                <div
                  className={styles.cardBg}
                  style={{ backgroundImage: `url(${fallbackImage})` }}
                />
                <div className={styles.cardOverlay} />
                <div className={styles.cardContent}>
                  <span className={styles.cardTag}>Our Projects</span>
                  <h3 className={styles.cardTitle}>Fresh installations will appear here soon.</h3>
                </div>
              </Link>
            ) : null}
          </div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className={styles.ctaStrip}>
          <p className={styles.ctaStripText}>
            Interested in seeing more of our installations?
          </p>
          <Link href="/projects" className={styles.ctaStripBtn}>
            View all references
            <span className={styles.btnArrow}>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
