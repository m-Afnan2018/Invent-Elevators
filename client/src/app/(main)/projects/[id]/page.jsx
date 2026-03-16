"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjectById } from "@/services/projects.service";
import styles from "./page.module.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getProjectById(id);
        setProject(response || null);
      } catch (_error) {
        setProject(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (isLoading) {
    return (
      <main className={styles.main}>
        <p className={styles.status}>Loading project details...</p>
      </main>
    );
  }

  if (!project?._id) {
    return (
      <main className={styles.main}>
        <p className={styles.status}>Project not found.</p>
        <Link href="/projects" className={styles.backLink}>← Back to all projects</Link>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Link href="/projects" className={styles.backLink}>← Back to all projects</Link>

      <article className={styles.card}>
        <div
          className={styles.hero}
          style={{ backgroundImage: `url(${project.featuredImage || project.image || FALLBACK_IMAGE})` }}
        />

        <div className={styles.content}>
          <p className={styles.kicker}>{project.category || "Project Showcase"}</p>
          <h1>{project.title || "Untitled Project"}</h1>
          <p>{project.description || "Detailed project information will be shared shortly."}</p>

          <div className={styles.metaGrid}>
            <div>
              <span>Client</span>
              <strong>{project.client || "Confidential"}</strong>
            </div>
            <div>
              <span>Location</span>
              <strong>{project.location || "Multiple locations"}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{project.status || "Completed"}</strong>
            </div>
            <div>
              <span>Completion</span>
              <strong>{project.completionDate || "On request"}</strong>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
