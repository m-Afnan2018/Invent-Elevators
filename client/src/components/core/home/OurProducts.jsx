"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./OurProducts.module.css";
import Link from "next/link";
import { getProducts } from "@/services/products.service";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80";

const FALLBACK_PRODUCTS = [
  {
    _id: "fallback-1",
    __fallback: true,
    name: "Premium Passenger Elevator",
    description: "Smooth, low-noise vertical mobility for commercial and residential towers.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    subCategory: { name: "Passenger" },
  },
  {
    _id: "fallback-2",
    __fallback: true,
    name: "Hydraulic Cargo Lift",
    description: "Heavy-duty lift system engineered for warehouses and industrial floors.",
    image: "https://images.unsplash.com/photo-1581091215367-59ab6dcef5f0?auto=format&fit=crop&w=800&q=80",
    subCategory: { name: "Cargo" },
  },
  {
    _id: "fallback-3",
    __fallback: true,
    name: "Panoramic Glass Elevator",
    description: "Contemporary glass cabin solution designed to elevate modern architecture.",
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=80",
    subCategory: { name: "Panoramic" },
  },
  {
    _id: "fallback-4",
    __fallback: true,
    name: "Compact Home Lift",
    description: "Space-efficient home elevator with reliable safety systems and elegant finish.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    subCategory: { name: "Home" },
  },
];

export default function OurProducts() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        setItems(Array.isArray(response) ? response : []);
      } catch (_error) {
        setItems([]);
      }
    };

    loadProducts();
  }, []);

  const products = useMemo(() => {
    const liveProducts = items.filter((item) => item?._id && item?.name);
    const source = liveProducts.length ? liveProducts : FALLBACK_PRODUCTS;
    return source.slice(0, 4);
  }, [items]);

  const usingFallbackData = products.some((item) => item?.__fallback);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>Our Products</span>
            <h2 className={styles.heading}>
              Precision-Built <em>Lift Solutions</em>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.headerDesc}>
              From residential home lifts to heavy-duty industrial cargo
              elevators, every Invent Elevator product is engineered to the
              highest standards of safety, performance, and reliability.
            </p>
            <Link href="/categories" className={styles.viewAllBtn}>
              View all products
              <span className={styles.btnArrow}>→</span>
            </Link>
          </div>
        </div>

        {usingFallbackData && (
          <p className={styles.headerDesc}>
            Showing temporary sample products while live catalog data is being synced.
          </p>
        )}

        <div className={styles.grid}>
          {products.map((product, i) => (
            <div
              key={product._id}
              className={styles.card}
              style={{ "--delay": `${i * 0.09}s` }}
            >
              <div className={styles.cardImageWrapper}>
                <img
                  src={product.image || FALLBACK_IMAGE}
                  alt={product.name}
                  className={styles.cardImage}
                />
                {product?.subCategory?.name && (
                  <span className={styles.cardTag}>{product.subCategory.name}</span>
                )}
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.cardDesc}>
                  {product.description || "Built for reliable performance and modern lift applications."}
                </p>

                <Link href={`/products/${product._id}`} className={styles.cardCta}>
                  <span>View Product</span>
                  <span className={styles.ctaIconWrap}>→</span>
                </Link>
              </div>

              <div className={styles.cardBar} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
