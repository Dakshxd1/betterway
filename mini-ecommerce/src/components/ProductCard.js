import React from "react";
import bg from "../assets/product-bg.png";

function ProductCard({ product, cart, setCart }) {
  const inStock = product.stock > 0;

  const addToCart = () => {
    setCart(prev => {
      const qty = prev[product.id]?.quantity || 0;
      if (qty >= product.stock) return prev;

      return {
        ...prev,
        [product.id]: { ...product, quantity: qty + 1 }
      };
    });
  };

  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${product.image || bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <h3>{product.title}</h3>
      <p>₹ {product.price}</p>
      <p>{product.category}</p>
      <p>{inStock ? "In Stock" : "Out of Stock"}</p>

      <button disabled={!inStock} onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default React.memo(ProductCard);
