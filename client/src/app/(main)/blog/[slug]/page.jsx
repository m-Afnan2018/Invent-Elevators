"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import { getBlogs } from "@/services/blogs.service";
import { extractCollection } from "@/lib/apiResponse";

const sanitizeHtml = (html) => {
  if (!html || typeof html !== "string") return "";

  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/ on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
};

const normalize = (post) => ({
  ...post,
  coverImage: post?.coverImage || post?.image || post?.thumbnail,
  excerpt: post?.excerpt || post?.shortDescription || post?.description,
  publishDate: post?.publishDate || post?.createdAt,
});

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogSlugPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await getBlogs();
        const blogs = extractCollection(response).map(normalize);
        const selected = blogs.find((item) => item.slug === slug);
        setPost(selected || null);
      } catch (_error) {
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) loadBlog();
  }, [slug]);

  const contentHtml = useMemo(() => {
    if (!post?.content) return "";
    if (typeof post.content === "string") return sanitizeHtml(post.content);
    return "";
  }, [post]);

  if (isLoading) {
    return <main className={styles.state}>Loading article...</main>;
  }

  if (!post) {
    return (
      <main className={styles.state}>
        <p>We couldn&apos;t find this article.</p>
        <Link href="/blogs" className={styles.backLink}>Go back to all blogs</Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <Link href="/blogs" className={styles.backLink}>← Back to blogs</Link>

        <p className={styles.category}>{post.category || "Blog"}</p>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          <span>{post.author || "Invent Elevator Team"}</span>
          <span>•</span>
          <span>{formatDate(post.publishDate)}</span>
        </div>

        {post.coverImage && (
          <div className={styles.imageWrap}>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className={styles.image}
            />
          </div>
        )}

        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}

        {contentHtml ? (
          <section
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        ) : (
          <p className={styles.content}>{post.excerpt || "Content will be available soon."}</p>
        )}
      </article>
    </main>
  );
}
