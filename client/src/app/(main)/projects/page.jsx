"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects } from "@/services/projects.service";

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
    <main style={{ padding: "120px 24px 60px", maxWidth: 1100, margin: "0 auto" }}>
      <h1>Our Projects</h1>
      <p>Explore completed lift installations and delivered projects.</p>
      <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
        {projects.length ? (
          projects.map((project) => (
            <article key={project._id} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 16 }}>
              <h3>{project.title || "Untitled Project"}</h3>
              <p>{project.description || "Project details will be shared on request."}</p>
            </article>
          ))
        ) : (
          <p>No projects available right now. Please check back soon.</p>
        )}
      </div>
      <Link href="/contact" style={{ display: "inline-block", marginTop: 24 }}>
        Request project portfolio
      </Link>
    </main>
  );
}
