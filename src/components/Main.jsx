import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Main() {
  const [flowers, setFlowers] = useState([]);
  const [filter, setFilter] = useState("Все");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/flowers");
        if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);
        const data = await response.json();
        setFlowers(data);
      } catch (err) {
        console.error("Ошибка при загрузке цветов:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFlowers();
  }, []);

  if (loading) return <p className="loading">Загрузка...</p>;
  if (error) return <p className="error">Ошибка: {error}</p>;

  const categories = ["Все", ...new Set(flowers.map(p => p.category))];
  const filtered = filter === "Все" ? flowers : flowers.filter(p => p.category === filter);

  const addToFavorites = (flower) => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!saved.find(item => item.id === flower.id)) {
      localStorage.setItem("favorites", JSON.stringify([...saved, flower]));
      alert(`${flower.name} добавлен(а) в избранное`);
    }
  };

  return (
    <main>
      <h2>Наши цветы ({flowers.length})</h2>

      <div className="categories">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="cards-container">
        {filtered.map(p => (
          <div key={p.id} className="card show">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.category}</p>
            <strong>{p.price} тг</strong>
            <br />
            <Link to={`/flower/${p.id}`} className="details-link">
              Подробнее
            </Link>
            <button onClick={() => addToFavorites(p)}>❤ В избранное</button>
          </div>
        ))}
      </div>
    </main>
  );
}
