"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import BlogHero from "@/components/core/blogs/BlogHero";
import BlogFeatured from "@/components/core/blogs/BlogFeatured";
import BlogSecondary from "@/components/core/blogs/BlogSecondary";
import BlogGrid from "@/components/core/blogs/BlogGrid";
import { getBlogs } from "@/services/blogs.service";
import { extractCollection } from "@/lib/apiResponse";

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await getBlogs();
        setPosts(extractCollection(response));
      } catch (_error) {
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogs();
  }, []);


  const normalizedPosts = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        coverImage: post.coverImage || post.image || post.thumbnail,
        excerpt: post.excerpt || post.shortDescription || post.description,
        publishDate: post.publishDate || post.createdAt,
      })),
    [posts]
  );
  return (
    <main className={styles.page}>
      <BlogHero totalPosts={normalizedPosts.length} onSearch={setSearchQuery} />

      <section className={styles.introBand}>
        <div className={styles.introInner}>
          <div>
            <p className={styles.eyebrow}>Knowledge Center</p>
            <h2>Insights from Real Elevator Projects</h2>
            <p>
              Learn from practical installation stories, design best practices, and
              service tips that help your project stay safe, efficient, and future-ready.
            </p>
          </div>
          <Link href="/contact" className={styles.cta}>
            Talk to our experts
          </Link>
        </div>
      </section>

      <BlogFeatured post={normalizedPosts[0]} />
      <BlogSecondary posts={normalizedPosts.slice(1, 4)} />
      <BlogGrid posts={normalizedPosts} isLoading={isLoading} searchQuery={searchQuery} />
    </main>
  );
}
