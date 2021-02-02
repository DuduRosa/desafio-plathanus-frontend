import React, { useState } from "react";
import HOST from "../../../VARIAVEIS";
import axios from "axios";

import "./CadastroAutor.css";
import Logo from "../../../resources/images/logo.png";
import { useHistory } from "react-router-dom";
// import History from "../../history";

export default function Login() {
  const initialValue = {
    nome: "",
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
      .post(`${HOST}/cadastroautor`, user)
      .then(function (response) {
        if (response.status != 500) {
          history.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // history.push("/dashboard");
  }

  return (
    <div id="loginView">
      <div id="formView">
        <div id="logo">
          <img src={Logo} alt="" id="logoLogin" />
        </div>
        <form action="" method="post" onSubmit={postUser}>
          <div id="inputs">
            <h3>Cadastro</h3>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              autoFocus
              required
              onChange={onChange}
            />
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
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
