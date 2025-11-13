import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "./CartContext.jsx";
import "../App.css";

export default function FlowerPage({ flowers }) {
  const { id } = useParams();
  const { cart, setCart } = useCart();

  if (!flowers || flowers.length === 0) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Загрузка данных...</div>;
  }

  const flower = flowers.find(f => f.id === +id);
  if (!flower) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Цветок не найден</div>;
  }

  const addToCart = () => {
    const existing = cart.find(item => item.id === flower.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === flower.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...flower, quantity: 1 }]);
    }
    alert(`${flower.name} добавлен(а) в корзину`);
  };

  const addToFavorites = () => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!saved.find(item => item.id === flower.id)) {
      localStorage.setItem("favorites", JSON.stringify([...saved, flower]));
      alert(`${flower.name} добавлен(а) в избранное`);
    }
  };

  return (
    <main>
      <div className="card show" style={{ maxWidth: "400px", margin: "2rem auto" }}>
        <img src={flower.image} alt={flower.name} />
        <h3>{flower.name}</h3>
        <p>{flower.category}</p>
        <strong>{flower.price} тг</strong>
        <p>{flower.description}</p>
        <button onClick={addToCart} className="details-link">Добавить в корзину</button>
        <button onClick={addToFavorites}>❤ В избранное</button>
        <br /><br />
        <Link to="/" className="details-link">← Вернуться в магазин</Link>
      </div>
    </main>
  );
}
