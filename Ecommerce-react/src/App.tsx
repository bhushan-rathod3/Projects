import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "@/pages/Product";
import ProductDetails from "@/pages/ProductDetails";
import AddProduct from "@/pages/AddProduct";
import EditProduct from "@/pages/EditProduct";
import CategoryProducts from "@/pages/CategoryProducts";
import { ProductProvider, useProduct } from "@/context/ProductContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { SwitchDemo } from "@/components/mood-toggle";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ProductProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route
                path="/category/:category"
                element={<CategoryProducts />}
              />
            </Routes>
          </Router>
        </ProductProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function Navbar() {
  const { categories } = useProduct();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 shadow-md">
      <Link to="/" className="text-xl font-bold">
        MyStore
      </Link>

      <div className="flex gap-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className="capitalize text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              {category}
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No categories found</p>
        )}
      </div>

      <Link
        to="/add-product"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Product
      </Link>
      <SwitchDemo />
    </nav>
  );
}
