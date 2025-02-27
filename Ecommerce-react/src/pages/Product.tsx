import { useProduct } from "@/context/ProductContext";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductList() {
  const { products } = useProduct();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {products.length > 0
        ? products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        : Array(6)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-md" />
            ))}
    </div>
  );
}
