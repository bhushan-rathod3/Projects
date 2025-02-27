import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/product";
import { IProduct } from "../types/product";

interface ProductContextType {
  products: IProduct[];
  categories: string[];
  addNewProduct: (product: IProduct) => void;
  editProduct: (variables: {
    id: number;
    updatedProduct: Partial<IProduct>;
  }) => void;
  removeProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data: products = [] } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      updatedProduct,
    }: {
      id: number;
      updatedProduct: Partial<IProduct>;
    }) => updateProduct(id, updatedProduct),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        addNewProduct: addMutation.mutate,
        editProduct: updateMutation.mutate,
        removeProduct: deleteMutation.mutate,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
