import { useState, useEffect } from "react";
import { useProduct } from "@/context/ProductContext";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/api/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IProduct } from "@/types/product";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editProduct } = useProduct();

  const productId = Number(id);

  const { data: product, isLoading } = useQuery<IProduct, Error>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!id,
  });

  const [updatedProduct, setUpdatedProduct] = useState<Partial<IProduct>>({});

  useEffect(() => {
    if (product) {
      setUpdatedProduct(product);
    }
  }, [product]);

  if (isLoading) return <p>Loading...</p>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editProduct({ id: productId, updatedProduct });
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          name="title"
          value={updatedProduct.title || ""}
          onChange={handleChange}
          placeholder="Title"
        />
        <Input
          name="price"
          type="number"
          value={updatedProduct.price || ""}
          onChange={handleChange}
          placeholder="Price"
        />
        <Textarea
          name="description"
          value={updatedProduct.description || ""}
          onChange={handleChange}
          placeholder="Description"
        />
        <Input
          name="category"
          value={updatedProduct.category || ""}
          onChange={handleChange}
          placeholder="Category"
        />
        <Input
          name="image"
          value={updatedProduct.image || ""}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}
