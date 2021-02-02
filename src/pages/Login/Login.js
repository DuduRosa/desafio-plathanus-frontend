import React, { useState } from "react";
import HOST from "../../VARIAVEIS";
import axios from "axios";

import "./Login.css";
import Logo from "../../resources/images/logo.png";
import Auth from "../../Auth";
import { useHistory } from "react-router-dom";
// import History from "../../history";

export default function Login() {
  const initialValue = {
    usuario: "",
    senha: "",
  };
  const [user, setUser] = useState(initialValue);
  const [history, setHistory] = useState(useHistory());

  function onChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  function postUser(e) {
    e.preventDefault();

    axios
      .post(`${HOST}/login`, {
        usuario: user.usuario,
        senha: user.senha,
      })
      .then(function (response) {
        if (!response.data == "" && !response.data == false) {
          Auth.saveToken(response.data);
          history.push("/dashboard");
        } else {
          console.log("Nao Passou");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div id="loginView">
      <div id="formView">
        <div id="logo">
          <img src={Logo} alt="" id="logoLogin" />
        </div>
        <form action="" method="post" onSubmit={postUser}>
          <div id="inputs">
            <h3>Login</h3>
            <input
              type="text"
              name="usuario"
              placeholder="Usuario"
              autoFocus
              required
              onChange={onChange}
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              required
              onChange={onChange}
            />
            <button id="btnLogin" type="submit">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
