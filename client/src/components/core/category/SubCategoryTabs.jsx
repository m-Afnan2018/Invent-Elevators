"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./SubCategoryTabs.module.css";

export default function SubCategoryTabs({ subCategories = [], activeTab, onTabChange }) {
  const wrapRef = useRef(null);
  const scrollRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [showLeft, setShowLeft] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return;
      setIsSticky(wrapRef.current.getBoundingClientRect().top <= 68);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const checkFades = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 8);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    checkFades();
    window.addEventListener("resize", checkFades);
    return () => window.removeEventListener("resize", checkFades);
  }, [subCategories]);

  // Scroll active into view
  useEffect(() => {
    const active = scrollRef.current?.querySelector("[data-active='true']");
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeTab]);

  const allTabs = [
    { _id: "all", name: "All", image: null, icon: null },
    ...subCategories,
  ];

  return (
    <div ref={wrapRef} className={`${styles.wrapper} ${isSticky ? styles.sticky : ""}`}>
      <div className={styles.container}>

        {/* Fade left */}
        <div className={`${styles.fade} ${styles.fadeLeft} ${showLeft ? styles.fadeVisible : ""}`} />

        {/* Scrollable tabs */}
        <div
          ref={scrollRef}
          className={styles.scroll}
          onScroll={checkFades}
        >
          {allTabs.map((tab) => {
            const isActive = activeTab === tab._id;
            return (
              <button
                key={tab._id}
                data-active={isActive}
                onClick={() => onTabChange(tab._id)}
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
              >
                {/* Thumbnail */}
                {tab.image ? (
                  <div className={`${styles.thumb} ${isActive ? styles.thumbActive : ""}`}>
                    <Image
                      src={tab.image}
                      alt={tab.name}
                      fill
                      sizes="40px"
                      className={styles.thumbImg}
                    />
                  </div>
                ) : (
                  <div className={`${styles.thumbIcon} ${isActive ? styles.thumbIconActive : ""}`}>
                    {tab._id === "all" ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
                        <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
                        <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
                        <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                )}

                <span className={styles.tabName}>{tab.name}</span>

                {/* Active indicator */}
                {isActive && <span className={styles.activeBar} />}
              </button>
            );
          })}
        </div>

        {/* Fade right */}
        <div className={`${styles.fade} ${styles.fadeRight} ${showRight ? styles.fadeVisible : ""}`} />

        {/* Right side count */}
        <div className={styles.rightMeta}>
          {subCategories.length > 0 && (
            <span className={styles.metaText}>
              {activeTab === "all"
                ? `${subCategories.length} categories`
                : subCategories.find((s) => s._id === activeTab)?.name}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
