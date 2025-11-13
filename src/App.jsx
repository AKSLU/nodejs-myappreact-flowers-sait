import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Main from './components/Main.jsx';
import FlowerPage from './components/FlowerPage.jsx';
import Cart from './components/Cart.jsx';
import Orders from './components/Orders.jsx';
import Login from "./components/Login.jsx";
import Favorites from "./components/Favorites.jsx";
import { CartProvider } from './components/CartContext.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';

function App() {
  const [flowers, setFlowers] = useState([]);
  const [loadingFlowers, setLoadingFlowers] = useState(true);
  const [errorFlowers, setErrorFlowers] = useState(null);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/flowers");
        if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);
        const data = await response.json();
        setFlowers(data);
      } catch (err) {
        setErrorFlowers(err.message);
      } finally {
        setLoadingFlowers(false);
      }
    };
    fetchFlowers();
  }, []);

  const handlePurchase = (cartItems, total, clearCart) => {
    if (cartItems.length === 0) {
      alert("Корзина пуста!");
      return;
    }
    const order = {
      items: cartItems,
      total,
      date: new Date().toLocaleString()
    };
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...saved, order]));
    alert(`Вы успешно купили товары на сумму ${total} тг!`);
    if (clearCart) clearCart();
  };

  if (loadingFlowers) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Загрузка данных…</div>;
  }
  if (errorFlowers) {
    return <div style={{ textAlign: 'center', color: 'red', padding: '2rem' }}>Ошибка: {errorFlowers}</div>;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Main flowers={flowers} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/flower/:id"
              element={
                <ProtectedRoute>
                  <FlowerPage flowers={flowers} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart onPurchase={handlePurchase} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <div style={{ textAlign: 'center', color: '#fff', padding: '2rem' }}>
                  Страница не найдена
                </div>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
