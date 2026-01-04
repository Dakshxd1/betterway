import { useEffect, useMemo, useState } from "react";
import "./App.css";
import useProducts from "./hooks/useProducts";
import Filters from "./components/Filters";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { loadCart, saveCart } from "./utils/storage";

function App() {
  const { products, loading } = useProducts();
  const [cart, setCart] = useState(() => loadCart());
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: ""
  });

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (filters.search) {
      data = data.filter(p =>
        p.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      data = data.filter(p => p.category === filters.category);
    }

    if (filters.sort === "low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (filters.sort === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [products, filters]);

  return (
    <div className="container">
      <h1>Mini E-Commerce</h1>

      <Filters
        products={products}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="layout">
        <ProductList
          products={filteredProducts}
          cart={cart}
          setCart={setCart}
          loading={loading}
        />

        <Cart cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default App;
