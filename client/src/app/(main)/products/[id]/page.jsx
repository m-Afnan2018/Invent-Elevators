
import ProductHero        from "@/components/core/product/ProductHero";
import ProductOverview    from "@/components/core/product/ProductOverview";
import ProductSpecs       from "@/components/core/product/ProductSpecs";
import ProductComponents  from "@/components/core/product/ProductComponents";
import ProductTestimonials from "@/components/core/product/ProductTestimonials";
import ProductCTA         from "@/components/core/product/ProductCTA";

export default function Products() {
    return <>
        <ProductHero  />
        <ProductOverview />
        <ProductSpecs  />
        <ProductComponents />
        <ProductTestimonials  />
        <ProductCTA  />
    </>
}