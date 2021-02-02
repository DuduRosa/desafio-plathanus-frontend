import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HOST from "../../../VARIAVEIS";

import "./Visualizar.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Visualizar() {
  const { id } = useParams();

  const [noticia, setNoticia] = useState([]);

  function excluir() {
    axios
      .post(`${HOST}/excluir`, { id: id })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    history.push("/dashboard");
  }

  useEffect(() => {
    axios
      .get(`${HOST}/visualizar/${id}`)
      .then(function (response) {
        const data = response.data[0];
        setNoticia(data);
        console.log(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

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

  const [autores, setAutores] = useState([]);
  const [history, setHistory] = useState(useHistory());

  return (
    <div id="dashboardView">
      <form action="" method="post">
        <div className="formItem">
          <label>Titulo da noticia</label>
          <input type="text" name="titulo" disabled value={noticia.titulo} />
        </div>

        <div id="formTextArea">
          <label>Texto da noticia</label>
          <textarea
            name="texto"
            disabled
            value={noticia.texto_noticia}
          ></textarea>
        </div>

        <div className="formItem">
          <label>Escolha o autor</label>
          <select
            name="autor"
            required
            disabled
            placeholder="Autor"
            id="autores"
          >
            <option selected disabled value={0}>
              {noticia.autor}
            </option>
          </select>
        </div>

        <div className="formItem">
          <label>Tag</label>
          <input
            type="text"
            placeholder="Politica, Saude, Educação , ETC ..."
            name="tag"
            value={noticia.tag}
            disabled
          />
        </div>
      </form>
      <div id="btnsDiv">
        <Link className="botoes" to={`/dashboard/editar/${noticia.id_noticia}`}>
          Editar
        </Link>
        <button
          className="botoes"
          onClick={excluir}
          style={{ backgroundColor: "red" }}
        >
          Excluir
        </button>
        <Link to="/dashboard" className="botoes">
          Voltar
        </Link>
      </div>
    </div>
  );
}
