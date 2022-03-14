import { NavLink } from 'react-router-dom';
import './Header.css';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export const Header = ({ isLoggedIn, setIsLoggedIn, userName }) => {

  const handleLogOut = () => {
    localStorage.setItem('isLoggedIn', false)
    setIsLoggedIn(false);
  }

  return (
    <header className="mainHeader">
      {isLoggedIn ? (
        <nav>
          Добро пожаловать, &nbsp; <strong>{userName}</strong>
          <NavLink onClick={handleLogOut} exact to="/login">
            <ExitToAppIcon />
            Выход
          </NavLink>
        </nav>
      ) : (
        "Добро пожаловать, незнакомец!"
      )}
    </header>
  );
};