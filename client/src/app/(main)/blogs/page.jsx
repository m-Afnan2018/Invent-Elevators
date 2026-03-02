// app/blogs/page.jsx
"use client";
import { useState } from "react";
import BlogHero      from "@/components/core/blogs/BlogHero";
import BlogFeatured  from "@/components/core/blogs/BlogFeatured";
import BlogSecondary from "@/components/core/blogs/BlogSecondary";
import BlogGrid      from "@/components/core/blogs/BlogGrid";

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <BlogHero      />
      <BlogFeatured  />
      <BlogSecondary />
      <BlogGrid      />
    </>
  );
}