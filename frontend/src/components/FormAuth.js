import React from "react";


function FormAuth(props) {

    return (
      <section className="auth" id={props.name}>
        
        <form className="auth__form" name={props.name} onSubmit={props.onSubmit} noValidate>
            <h2 className="auth__title">{props.title}</h2>
            <input
            className="auth__item"
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            onChange={props.onChange}
            value={props.email}
            required>

            </input>
            <input
            className="auth__item"
            type="password"
            placeholder="Пароль"
            id="password"
            name="password"
            autoComplete="on"
            onChange={props.onChange}
            value= {props.password}
            required></input>
            <button className="auth__submit" type="submit" name="saveUser">{props.nameButton}</button>
            {props.linkToLogin}
        </form>
      </section>
    );
}

export default FormAuth;