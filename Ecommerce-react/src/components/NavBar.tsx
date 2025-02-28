import { Link } from "react-router-dom";
import { useProduct } from "@/context/ProductContext";
import { SwitchDemo } from "@/components/mood-toggle";

export default function Navbar() {
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

      <div className="flex gap-4">
        <Link
          to="/cart"
          className="bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Cart
        </Link>
        <SwitchDemo />
      </div>
    </nav>
  );
}
