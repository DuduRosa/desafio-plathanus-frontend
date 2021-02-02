import React, { useEffect, useState } from "react";
import axios from "axios";
import HOST from "../../../VARIAVEIS";

import "./Cadastrar.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Dash() {
  //RECEBER LISTA DE AUTORES
  useEffect(() => {
    axios
      .get(`${HOST}/autores`)
      .then(function (response) {
        const data = response.data;
        setAutores(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  const initialValue = {
    titulo: "",
    texto: "",
    autor: "",
    tag: "",
    capa: "",
    id_autor: "",
  };

  const [autores, setAutores] = useState([]);
  const [noticia, setNoticia] = useState(initialValue);
  const [history, setHistory] = useState(useHistory());

  function onChange(event) {
    const { name, value } = event.target;
    setNoticia({ ...noticia, [name]: value });
  }

  function validação() {
    if (!noticia.autor == 0) {
      axios
        .post(`${HOST}/cadastrarnoticia`, noticia)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      history.push("/dashboard");
    } else {
      console.log("Insira o nome do autor");
    }
  }

  function postUser(e) {
    e.preventDefault();
    validação();
  }

  return (
    <div id="dashboardView">
      <Link to="/dashboard" id="btnVoltar">Voltar</Link>
      <form action="" method="post" onSubmit={postUser}>
        <div className="formItem">
          <label>Titulo da noticia</label>
          <input type="text" name="titulo" onChange={onChange} required maxLength="40" />
        </div>

        <div id="formTextArea">
          <label>Texto da noticia</label>
          <textarea name="texto" onChange={onChange} required></textarea>
        </div>

        <div className="formItem">
          <label>Escolha o autor</label>
          <select
            onChange={onChange}
            name="autor"
            required
            placeholder="Autor"
            id="autores"
          >
            <option selected disabled hidden value={0}>
              Escolha o nome do Autor
            </option>
            {autores.map((autor) => {
              return (
                <>
                  <option name="autor" value={autor.id_autor}>
                    {autor.nome}
                  </option>
                </>
              );
            })}
          </select>
        </div>

        <div className="formItem">
          <label>Tag</label>
          <input
            type="text"
            placeholder="Politica, Saude, Educação , ETC ..."
            required
            name="tag"
            onChange={onChange}
            value={noticia.tag}
          />
        </div>

        <button type="submit" id="btnCadastrar">Cadastrar</button>
      </form>
    </div>
  );
}
