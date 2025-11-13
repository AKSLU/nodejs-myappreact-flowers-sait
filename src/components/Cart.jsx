import React from "react";
import { useCart } from "./CartContext.jsx";

export default function Cart({ onPurchase }) {
  const { cart, setCart, clearCart } = useCart();

  const changeQuantity = (id, delta) => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <p>Корзина пуста</p>;
  }

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <h2>Корзина</h2>
      {cart.map(item => (
        <div key={item.id} style={{ marginBottom: "1rem" }}>
          <strong>{item.name}</strong> — {item.price} тг
          <br />
          <button onClick={() => changeQuantity(item.id, -1)}>-</button>
          <span style={{ margin: "0 8px" }}>{item.quantity}</span>
          <button onClick={() => changeQuantity(item.id, 1)}>+</button>
          <button onClick={() => removeItem(item.id)} style={{ marginLeft: "10px" }}>
            Удалить
          </button>
        </div>
      ))}
      <p>Итого: {total} тг</p>
      <button onClick={() => { onPurchase(cart, total); clearCart(); }}>
        Оформить заказ
      </button>
    </div>
  );
}
