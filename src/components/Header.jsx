import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to="/">
        <button>Главная</button>
      </Link>
      <Link to="/cart">
        <button>Корзина</button>
      </Link>
      <Link to="/orders">
        <button>История заказов</button>
      </Link>
      <Link to="/login">
        <button>Авторизация</button>
      </Link>
      <Link to="/favorites">
        <button>Избранное</button>
      </Link>
    </header>
  );
}
export default Header;