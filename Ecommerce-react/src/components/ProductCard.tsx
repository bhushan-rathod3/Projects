import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IProduct } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(1, product.id);
  };

  return (
    <Card className="w-full max-w-sm shadow-md">
      <CardHeader>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain bg-gray-100"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-bold">{product.title}</CardTitle>
        <p className="text-gray-500">${product.price}</p>
        <div className="flex gap-2 mt-2">
          <Button asChild>
            <Link to={`/product/${product.id}`}>View Details</Link>
          </Button>
          <Button onClick={handleAddToCart} className="bg-green-500 text-white">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
