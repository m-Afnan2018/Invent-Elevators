"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductsGrid.module.css";

// Unsplash fallback images for elevator/lift products
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  "https://images.unsplash.com/photo-1590504805261-29a56cc04b06?w=800&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
];

// Mock products using Unsplash — replace with real API data
const MOCK_PRODUCTS = [
  {
    _id: "1",
    name: "Hydraulic Cargo Lift",
    description: "Heavy-duty vertical lifting solution designed for warehouses, factories, and industrial facilities. Built for high load capacity and long-term durability.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    capacity: "5000 kg",
    speed: "0.5 m/s",
    stops: 4,
    slug: "hydraulic-cargo-lift",
    isFeatured: true,
    subCategory: { name: "Cargo" },
  },
  {
    _id: "2",
    name: "Four Post Car Lift",
    description: "Robust vehicle lifting solution ideal for automobile workshops, service stations, and parking facilities. Designed for stability and reliability.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    capacity: "3500 kg",
    speed: "0.3 m/s",
    stops: 2,
    slug: "four-post-car-lift",
    isFeatured: false,
    subCategory: { name: "Car Lifts" },
  },
  {
    _id: "3",
    name: "Scissor Lift Table",
    description: "Compact yet powerful lifting platform built for smooth material handling in industrial and commercial environments.",
    image: "https://images.unsplash.com/photo-1590504805261-29a56cc04b06?w=800&q=80",
    capacity: "2000 kg",
    speed: "0.1 m/s",
    stops: 2,
    slug: "scissor-lift-table",
    isFeatured: false,
    subCategory: { name: "Industrial" },
  },
  {
    _id: "4",
    name: "Home Elevator",
    description: "Modern and space-efficient elevator solution crafted for residential buildings and private homes with premium style and safety.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    capacity: "400 kg",
    speed: "0.6 m/s",
    stops: 6,
    slug: "home-elevator",
    isFeatured: true,
    subCategory: { name: "Residential" },
  },
  {
    _id: "5",
    name: "Goods Lift",
    description: "Efficient vertical transport for goods across multi-storey buildings. Ideal for retail, hospitality, and commercial applications.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    capacity: "1500 kg",
    speed: "0.4 m/s",
    stops: 5,
    slug: "goods-lift",
    isFeatured: false,
    subCategory: { name: "Cargo" },
  },
  {
    _id: "6",
    name: "Panoramic Elevator",
    description: "Sleek glass elevator designed to complement modern architecture while offering smooth, scenic vertical transport experiences.",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    capacity: "630 kg",
    speed: "1.0 m/s",
    stops: 8,
    slug: "panoramic-elevator",
    isFeatured: false,
    subCategory: { name: "Passenger" },
  },
];

const DEMO_DATA_NOTE = "Showing sample products until live catalog data is available.";

// ── Skeleton Card ──
function SkeletonCard() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonImg} />
      <div className={styles.skeletonBody}>
        <div className={`${styles.skeletonLine} ${styles.skeletonShort}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonLong}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonMed}`} />
        <div className={styles.skeletonSpecs} />
        <div className={styles.skeletonCta} />
      </div>
    </div>
  );
}

// ── Product Card ──
function ProductCard({ product, index }) {
  const {
    _id,
    name,
    description,
    image,
    capacity,
    speed,
    stops,
    slug,
    isFeatured,
    subCategory,
  } = product;

  const fallbackImg = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

  return (
    <article className={styles.card}>
      {/* ── Image ── */}
      <div className={styles.imgWrap}>
        <Image
          src={image || fallbackImg}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.img}
        />
        {/* Gradient over image */}
        <div className={styles.imgGradient} />

        {/* Badges */}
        <div className={styles.badges}>
          {isFeatured && (
            <span className={styles.badgeFeatured}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <path d="M5 0l1.12 3.45H9.51L6.7 5.58l1.07 3.3L5 6.88l-2.77 2L3.3 5.58.49 3.45H3.88z" />
              </svg>
              Featured
            </span>
          )}
          {subCategory?.name && (
            <span className={styles.badgeCat}>{subCategory.name}</span>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>
        <div className={styles.bodyTop}>
          <h3 className={styles.name}>{name}</h3>
          {description && (
            <p className={styles.desc}>
              {description.length > 100 ? description.slice(0, 100) + "…" : description}
            </p>
          )}
        </div>

        {/* Specs */}
        {(capacity || speed || stops) && (
          <div className={styles.specs}>
            {capacity && (
              <div className={styles.specItem}>
                <span className={styles.specValue}>{capacity}</span>
                <span className={styles.specLabel}>Capacity</span>
              </div>
            )}
            {speed && (
              <div className={styles.specItem}>
                <span className={styles.specValue}>{speed}</span>
                <span className={styles.specLabel}>Speed</span>
              </div>
            )}
            {stops && (
              <div className={styles.specItem}>
                <span className={styles.specValue}>{stops}</span>
                <span className={styles.specLabel}>Stops</span>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <Link href={`/products/${_id}`} className={styles.cta}>
          <span>View Product</span>
          <span className={styles.ctaArrow}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 2.5L12.5 7 8 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>
    </article>
  );
}

// ── Main Grid ──
const ITEMS_PER_PAGE = 9;

export default function ProductsGrid({
  products,
  isLoading = false,
  activeSubCategory = "all",
  subCategories = [],
}) {
  // Use mock data when API returns no products yet.
  const hasLiveData = Array.isArray(products) && products.length > 0;
  const data = hasLiveData ? products : MOCK_PRODUCTS;
  const [visible, setVisible] = useState(ITEMS_PER_PAGE);


  const activeLabel =
    activeSubCategory === "all" || !activeSubCategory
      ? "All Products"
      : subCategories.find((s) => s._id === activeSubCategory)?.name ?? "Products";

  const shown = data.slice(0, visible);
  const hasMore = visible < data.length;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Top bar ── */}
        <div className={styles.topBar}>
          <div className={styles.topLeft}>
            <h2 className={styles.sectionHeading}>{activeLabel}</h2>
            {!isLoading && (
              <span className={styles.countPill}>{data.length} products</span>
            )}
          </div>
          {!isLoading && !hasLiveData && (
            <span className={styles.countPill}>{DEMO_DATA_NOTE}</span>
          )}
        </div>

        {/* ── Grid or States ── */}
        {isLoading ? (
          <div className={styles.grid}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : data.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyRing}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M10 22V14l6-4 6 4v8" stroke="#ccc" strokeWidth="1.5" strokeLinejoin="round" />
                <rect x="13" y="16" width="6" height="6" rx="1" stroke="#ccc" strokeWidth="1.5" />
              </svg>
            </div>
            <p className={styles.emptyTitle}>No products here yet</p>
            <p className={styles.emptyDesc}>Check back soon or browse another category.</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {shown.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </div>

            {hasMore && (
              <div className={styles.loadMore}>
                <button
                  className={styles.loadMoreBtn}
                  onClick={() => setVisible((v) => v + ITEMS_PER_PAGE)}
                >
                  Load more
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className={styles.loadMeta}>
                  {visible} of {data.length}
                </span>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
