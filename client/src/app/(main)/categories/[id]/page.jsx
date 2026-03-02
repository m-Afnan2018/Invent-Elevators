import CategoryPageClient from "@/components/core/category/CategoryPageClient";

export default async function CategoryByIdPage({ params }) {
  const resolvedParams = await params;
  return <CategoryPageClient categoryId={resolvedParams?.id} />;
}
