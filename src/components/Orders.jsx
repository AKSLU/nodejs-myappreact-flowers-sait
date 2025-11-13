import React, { useEffect, useState } from "react";
import "../App.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) return <p className="empty-message">История заказов пуста</p>;

  return (
    <div className="orders-page">
      <h2 className="orders-title">История заказов</h2>
      {orders.map((order, idx) => (
        <div key={idx} className="order-card">
          <strong>Заказ #{idx + 1}</strong>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>
                {item.name} × {item.quantity} = {item.price * item.quantity} тг
              </li>
            ))}
          </ul>
          <p className="order-total">Итого: {order.total} тг</p>
        </div>
      ))}
    </div>
  );
}