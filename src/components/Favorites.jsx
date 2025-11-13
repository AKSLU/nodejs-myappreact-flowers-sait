import React, { useEffect, useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const removeFromFavorites = (id) => {
    const filtered = favorites.filter(f => f.id !== id);
    setFavorites(filtered);
    localStorage.setItem("favorites", JSON.stringify(filtered));
  };

  if (favorites.length === 0) return <p>Нет избранных товаров</p>;

  return (
    <main>
      <h2>Избранные товары ({favorites.length})</h2>
      <div className="cards-container">
        {favorites.map(flower => (
          <div key={flower.id} className="card show">
            <img src={flower.image} alt={flower.name} />
            <h3>{flower.name}</h3>
            <p>{flower.category}</p>
            <strong>{flower.price} тг</strong>
            <br />
            <button onClick={() => removeFromFavorites(flower.id)}>Удалить из избранного</button>
          </div>
        ))}
      </div>
    </main>
  );
}
