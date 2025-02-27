import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/api/product";
import { useProduct } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { removeProduct } = useProduct();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(Number(id)),
  });

  if (isLoading) return <Skeleton className="h-64 w-full rounded-md" />;
  if (!product)
    return <p className="text-center text-red-500">Product not found.</p>;

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      removeProduct(product.id);
      alert("Product deleted successfully.");
      navigate("/");
    }
  };

  return (
    <Card className="p-6 max-w-3xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-contain"
      />
      <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
      <p className="text-gray-500">${product.price}</p>
      <p className="mt-2">{product.description}</p>

      <div className="flex gap-4 mt-4">
        <Button asChild>
          <Link to={`/edit-product/${product.id}`}>Edit</Link>
        </Button>
        <Button onClick={confirmDelete} className="bg-red-500 text-white">
          Delete
        </Button>
      </div>
    </Card>
  );
}
