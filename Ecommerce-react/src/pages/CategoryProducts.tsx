import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { IProduct } from "@/types/product";

export default function CategoryProducts() {
  const { category } = useParams();

  const { data: products, isLoading } = useQuery<IProduct[]>({
    queryKey: ["categoryProducts", category],
    queryFn: async () => {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      return res.json();
    },
    enabled: !!category,
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Category: {category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array(6)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-md" />
              ))
          : products?.map((product: IProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
