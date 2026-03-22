import ProductHero from "@/components/core/product/ProductHero";
import ProductOverview from "@/components/core/product/ProductOverview";
import ProductSpecs from "@/components/core/product/ProductSpecs";
import ProductComponents from "@/components/core/product/ProductComponents";
import ProductTestimonials from "@/components/core/product/ProductTestimonials";
import ProductCTA from "@/components/core/product/ProductCTA";
import ProductSectionNav from "@/components/core/product/ProductSectionNav";
import { getProductById } from "@/services/products.service";

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  let product = null;

  try {
    product = await getProductById(resolvedParams?.id);
  } catch (_error) {
    product = null;
  }

  return (
    <>
      <ProductHero product={product} />
      <ProductSectionNav productName={product?.name || "Product Details"} />
      <div id="overview">
        <ProductOverview product={product} />
      </div>
      <div id="specs">
        <ProductSpecs product={product} />
      </div>
      <div id="components">
        <ProductComponents product={product} />
      </div>
      <div id="testimonials">
        <ProductTestimonials product={product} />
      </div>
      <div id="quote">
        <ProductCTA product={product} />
      </div>
    </>
  );
}
