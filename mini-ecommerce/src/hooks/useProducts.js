import { useEffect, useState } from "react";

/*
  Change API_SOURCE to:
  "dummy"     → https://dummyjson.com/products
  "fakestore" → https://fakestoreapi.com/products
*/

const API_SOURCE = "dummy"; // 👈 change this only

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        let data = [];

        // 🔹 DummyJSON API
        if (API_SOURCE === "dummy") {
          const res = await fetch(
            "https://dummyjson.com/products?limit=20"
          );
          const json = await res.json();

          data = json.products.map(p => ({
            id: p.id,
            title: p.title,
            price: p.price,
            category: p.category,
            stock: p.stock,
            image: p.thumbnail // ✅ IMAGE
          }));
        }

        // 🔹 FakeStore API
        if (API_SOURCE === "fakestore") {
          const res = await fetch(
            "https://fakestoreapi.com/products"
          );
          const json = await res.json();

          data = json.map(p => ({
            id: p.id,
            title: p.title,
            price: p.price,
            category: p.category,
            stock: Math.floor(Math.random() * 10) + 1, // mock stock
            image: p.image // ✅ IMAGE
          }));
        }

        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
}
