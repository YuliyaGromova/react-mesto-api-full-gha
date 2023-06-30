import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  function handleLogin() {
    props.onLogin(false);
  }

  function signOut() {
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
    handleLogin();
  }

  function openInfoUser() {
    props.handleOpenInfo(!props.isOpenInfoUser);
  }
  return (
    <header
      className={props.isOpenInfoUser ? "header header_mobile" : "header"}
    >
      <img className="logo" src={logo} alt="логотип Место" />

      {props.page === "reg" && (
        <Link to="/sign-in" className="header__link">
          {" "}
          Войти
        </Link>
      )}
      {props.page === "log" && (
        <Link to="/sign-up" className="header__link">
          {" "}
          Регистрация
        </Link>
      )}
      {props.page === "main" && (
        <>
          <button
            className={
              props.isOpenInfoUser
                ? "header__button button"
                : "header__button_noactive button"
            }
            onClick={openInfoUser}
          ></button>
          <div
            className={
              props.isOpenInfoUser ? " header__info_mobile" : "header__info"
            }
          >
            <p className="header__login">{props.login}</p>
            <button className="header__exit button" onClick={signOut}>
              Выйти
            </button>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
