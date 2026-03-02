"use client";

import { useEffect, useMemo, useState } from "react";
import CategoryHero from "./CategoryHero";
import ProductsGrid from "./ProductsGrid";
import SubCategoryTabs from "./SubCategoryTabs";
import { getCategories, getSubCategoriesByCategory } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";

export default function CategoryPageClient({ categoryId = null }) {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [categoryRes, productRes] = await Promise.all([getCategories(), getProducts()]);

        const allCategories = Array.isArray(categoryRes) ? categoryRes : [];
        const activeCategory = categoryId
          ? allCategories.find((item) => item._id === categoryId)
          : allCategories[0];

        setCategories(allCategories);

        if (!activeCategory?._id) {
          setSubCategories([]);
          setProducts(Array.isArray(productRes) ? productRes : []);
          return;
        }

        const [subCategoryRes] = await Promise.all([
          getSubCategoriesByCategory(activeCategory._id),
        ]);

        const mappedSubcategories = Array.isArray(subCategoryRes) ? subCategoryRes : [];
        setSubCategories(mappedSubcategories);

        const allProducts = Array.isArray(productRes) ? productRes : [];
        const filteredByCategory = allProducts.filter((product) => {
          const singleCategory = product?.category?._id || product?.category;
          const manyCategories = Array.isArray(product?.categories)
            ? product.categories.map((entry) => entry?._id || entry)
            : [];

          return (
            singleCategory === activeCategory._id ||
            manyCategories.includes(activeCategory._id)
          );
        });

        setProducts(filteredByCategory);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [categoryId]);

  const activeCategory = useMemo(() => {
    if (!categories.length) return null;
    if (!categoryId) return categories[0];
    return categories.find((item) => item._id === categoryId) || categories[0];
  }, [categories, categoryId]);

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return products;

    return products.filter((product) => {
      const singleSubCategory = product?.subCategory?._id || product?.subCategory;
      const manySubCategories = Array.isArray(product?.subCategories)
        ? product.subCategories.map((entry) => entry?._id || entry)
        : [];

      return singleSubCategory === activeTab || manySubCategories.includes(activeTab);
    });
  }, [products, activeTab]);

  const categoryWithCounts = {
    ...(activeCategory || {}),
    _count: {
      subCategories: subCategories.length,
      products: products.length,
    },
  };

  return (
    <>
      <CategoryHero category={categoryWithCounts} />
      <SubCategoryTabs
        subCategories={subCategories}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <ProductsGrid
        key={activeTab}
        products={filteredProducts}
        isLoading={isLoading}
        activeSubCategory={activeTab}
        subCategories={subCategories}
      />
    </>
  );
}
