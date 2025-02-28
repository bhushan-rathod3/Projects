import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ Import QueryClientProvider
import { ProductProvider } from "@/context/ProductContext";
import Navbar from "@/components/NavBar";
import Product from "@/pages/Product";
import CartPage from "@/pages/CartPage";

const queryClient = new QueryClient(); // ✅ Create a QueryClient instance

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* ✅ Wrap the entire app */}
      <ProductProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </ProductProvider>
    </QueryClientProvider>
  );
}
