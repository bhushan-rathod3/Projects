import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/store/cartStore";
import { fetchProductById } from "@/api/product";
import { Button } from "@/components/ui/button";

const userId = 1;

export default function CartPage() {
  const { cartItems, fetchUserCart, updateItem, clearCart } = useCartStore();

  useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchUserCart(userId),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItemDetails
              key={item.productId}
              productId={item.productId}
              quantity={item.quantity}
              updateItem={updateItem}
            />
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <Button onClick={clearCart} className="mt-6 bg-red-500 text-white">
          Clear Cart
        </Button>
      )}
    </div>
  );
}

const CartItemDetails = ({
  productId,
  quantity,
  updateItem,
}: {
  productId: number;
  quantity: number;
  updateItem: (cartId: number, productId: number, quantity: number) => void;
}) => {
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="flex items-center gap-6 p-4 border-b border-gray-300">
      <img
        src={product.image}
        alt={product.title}
        className="w-20 h-20 object-contain bg-gray-100 rounded-lg"
      />

      <div className="flex-1">
        <p className="font-semibold">{product.title}</p>
        <p className="text-gray-600">${product.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => updateItem(userId, productId, quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </Button>
        <span className="text-lg font-medium">{quantity}</span>
        <Button onClick={() => updateItem(userId, productId, quantity + 1)}>
          +
        </Button>
      </div>
    </div>
  );
};
