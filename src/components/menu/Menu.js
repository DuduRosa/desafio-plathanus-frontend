import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import HOST from "../../VARIAVEIS";
import "./Menu.css";
import Logo from "../../resources/images/logo.png";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";

export default function Menu() {
  const [busca, setBusca] = useState({
    busca: "",
  });

  const [history, setHistory] = useState(useHistory());

  function onChange(event) {
    const { name, value } = event.target;
    setBusca({ ...busca, [name]: value });
  }

  function onCLick() {
    history.push("/pesquisa");
  }

  return (
    <div id="menuBar">
      <div id="logo">
        <img src={Logo} alt="" id="logoMenu" />
      </div>
      <div id="container">
        <form action="" method="post">
          <div id="searchDiv">
            <input
              type="text"
              id="search"
              placeholder="Buscar"
              name="busca"
              onChange={onChange}
            />
            <Link
              to={`/pesquisa=${busca.busca}`}
              id="#botaoPesquisa"
              onClick={onCLick}
            >
              <label htmlFor="">
                <BiSearchAlt2 color="rgb(106,64,222)" />
              </label>
            </Link>
          </div>
        </form>
        <Link to="/cadastro" id="cadastro">Cadastro</Link>
        <Link to="/login" id="login">
          Login
        </Link>
      </div>
    </div>
  );
}
