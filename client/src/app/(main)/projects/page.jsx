"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getProjects } from "@/services/projects.service";
import styles from "./page.module.css";

const FALLBACK_PROJECTS = [
  {
    _id: "skyline-tower",
    title: "Skyline Corporate Tower",
    description: "High-speed passenger elevator installation with smart destination control.",
    location: "Bengaluru, India",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "ocean-view",
    title: "Ocean View Residences",
    description: "Premium panoramic lifts integrated into luxury residential towers.",
    location: "Mumbai, India",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "citycare-center",
    title: "CityCare Medical Center",
    description: "Hospital-grade stretcher elevators built for continuous reliability.",
    location: "Hyderabad, India",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  },
];

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

  const showcaseProjects = useMemo(() => {
    const validProjects = projects.filter((project) => project?._id && project?.title);
    return validProjects.length ? validProjects : FALLBACK_PROJECTS;
  }, [projects]);

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <p className={styles.eyebrow}>Live Portfolio</p>
        <h1>Our Projects</h1>
        <p>
          Explore completed lift installations and delivery success stories across
          residential, commercial, and healthcare spaces.
        </p>
      </section>

      <div className={styles.grid}>
        {showcaseProjects.map((project) => (
          <article key={project._id} className={styles.card}>
            <div
              className={styles.cardImage}
              style={{
                backgroundImage: `url(${project.image || "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80"})`,
              }}
            />
            <div className={styles.cardBody}>
              <h3>{project.title || "Untitled Project"}</h3>
              <p>{project.description || "Project details will be shared on request."}</p>
              <span>{project.location || "Multiple locations"}</span>
            </div>
          </article>
        ))}
      </div>

      <Link href="/contact" className={styles.cta}>
        Request project portfolio
      </Link>
    </main>
  );
}
