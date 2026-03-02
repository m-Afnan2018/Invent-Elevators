import CategoryHero from "@/components/core/category/CategoryHero";
import ProductsGrid from "@/components/core/category/ProductsGrid";
import SubCategoryTabs from "@/components/core/category/SubCategoryTabs";


export default function Categories() {
    return <>
        <CategoryHero />
        <SubCategoryTabs />
        <ProductsGrid />
    </>
}