import { useState } from "react";
import { useProduct } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddProduct() {
  const { addNewProduct } = useProduct();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewProduct({
      id: 0,
      title: product.title,
      price: Number(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
      rating: { rate: 0, count: 0 },
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          name="title"
          placeholder="Title"
          value={product.title}
          onChange={handleChange}
          required
        />
        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <Input
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />
        <Input
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          required
        />
        <Button type="submit">Add Product</Button>
      </form>
    </div>
  );
}
