import React from "react";
import FormAuth from "./FormAuth.js";
import { useNavigate } from "react-router-dom";
import * as auth from "../Auth.js";

function Login(props) {
  React.useEffect(() => {
    props.isOpenPage("log");
    props.handleOpenInfo(false);
  },[]);

  const navigate = useNavigate();

  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  function handleLogin() {
    props.onLogin(true);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.password, formValue.email)
      .then((data) => {
        if (data.token) {
          handleLogin();
          localStorage.setItem("token", data.token);
          setFormValue({ email: "", password: "" });
          props.loginToHeader(formValue.email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        props.setAnswerReg(false);
        props.isOpenMessage(true);
      });
  };

  return (
    <FormAuth
      title="Вход"
      name="login"
      nameButton="Войти"
      linkToLogin=""
      onSubmit={handleSubmit}
      onChange={handleChange}
      link="/"
    ></FormAuth>
  );
}

export default Login;
