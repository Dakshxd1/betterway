import ProductCard from "./ProductCard";

export default function ProductList({ products, cart, setCart, loading }) {
  if (loading) return <p>Loading...</p>;
  if (!products.length) return <p>No products found</p>;

  return (
    <div className="grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          cart={cart}
          setCart={setCart}
        />
      ))}
    </div>
  );
}
