import { useNavigate } from 'react-router-dom';
import './LoginPage.css'


export const LoginPage = () => {

  let navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/');
  }

  return (
    <h1>
      <form className="loginForm" onSubmit={handleLogin}>
        <h2>Авторизация</h2>
        <div>
          <input
            className="loginFormInput"
            type="text"
            placeholder="Имя пользователя"
            required
          />
        </div>
        <div>
          <input
            className="loginFormInput"
            type="password"
            placeholder="Пароль"
            required
          />
        </div>
        <div>
          <button className="blackBtn" type="submit">
            Войти
          </button>
        </div>
      </form>
    </h1>
  );
}