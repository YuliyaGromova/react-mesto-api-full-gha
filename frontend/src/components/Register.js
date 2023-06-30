import React from "react";
import FormAuth from "./FormAuth.js";
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../Auth.js';

function Register(props) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate();
 
  React.useEffect(() => {
    props.isOpenPage('reg');
    props.handleOpenInfo(false);
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { password, email } = formValue;
    auth.register(password, email)
      .then(() => {  
        navigate('/sign-in', {replace: true});
        props.setAnswerReg(true);
      })
      .catch((err) => {
        console.log(err);
        props.setAnswerReg(false);
      })
      .finally(() => props.isOpenMessage(true))
}


    return (
      <FormAuth
      title="Регистрация"
      name="register"
      nameButton="Зарегистрироваться"
      onChange={handleChange}
      onSubmit={handleSubmit}
      password={formValue.password}
      rmail = {formValue.email}
      linkToLogin={<div className="auth__switch-login"><p className="auth__sign-in">Уже зарегистрированы? &nbsp;</p>
      <Link to="/sign-in" className="auth__link"> Войти</Link></div>}>
      </FormAuth>
    );
}

export default Register;