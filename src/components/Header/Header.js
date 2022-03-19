import { NavLink } from 'react-router-dom';
import './Header.css';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export const Header = ({ isLoggedIn, setIsLoggedIn, userName, setIsAdmin }) => {

  const handleLogOut = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setIsAdmin(false);
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