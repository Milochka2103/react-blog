import { Link } from 'react-router-dom';
import './Header.css'

export const Header = () => {

  return (
    <header className="mainHeader">
      <nav>
        <Link to="/">Home</Link>
        <Link to="login">Login</Link>
      </nav>
    </header>
  );
}