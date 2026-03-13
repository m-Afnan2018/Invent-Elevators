"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects } from "@/services/projects.service";
import styles from "./page.module.css";

export default function ProjectsPage() {
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

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <p className={styles.eyebrow}>Live Portfolio</p>
        <h1>Our Projects</h1>
        <p>Explore completed lift installations and delivered projects from our live portfolio.</p>
      </section>

      <div className={styles.grid}>
        {projects.length ? (
          projects.map((project) => (
            <article key={project._id} className={styles.card}>
              <h3>{project.title || "Untitled Project"}</h3>
              <p>{project.description || "Project details will be shared on request."}</p>
              <span>{project.location || "Multiple locations"}</span>
            </article>
          ))
        ) : (
          <p className={styles.empty}>No projects available right now. Please check back soon.</p>
        )}
      </div>

      <Link href="/contact" className={styles.cta}>
        Request project portfolio
      </Link>
    </main>
  );
}
