export default function Cart({ cart, setCart }) {
  const items = Object.values(cart);

  const updateQty = (id, qty, stock) => {
    if (qty <= 0) {
      const updated = { ...cart };
      delete updated[id];
      setCart(updated);
      return;
    }

    if (qty <= stock) {
      setCart(prev => ({
        ...prev,
        [id]: { ...prev[id], quantity: qty }
      }));
    }
  };

  if (!items.length) return <p>Cart is empty</p>;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Cart</h2>

      {items.map(item => (
        <div key={item.id}>
          <p>{item.title}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={e =>
              updateQty(item.id, +e.target.value, item.stock)
            }
          />
          <button onClick={() => updateQty(item.id, 0)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹ {total}</h3>
    </div>
  );
}
