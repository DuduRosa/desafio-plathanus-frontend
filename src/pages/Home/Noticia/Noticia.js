import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HOST from "../../../VARIAVEIS";
import "./Noticia.css";
import Menu from "../../../components/menu/Menu";

export default function () {
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${HOST}/visualizar/${id}`)
      .then(function (response) {
        setNoticia(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  const [noticia, setNoticia] = useState([]);

  return (
    <div id="noticiaView">
      <Menu />
      {noticia.map((e) => {
        return (
          <div id="conteudo">
            {console.log(e)}
            <h1 id="titulo">{e.titulo}</h1>
            <h4 id="texto">{e.texto_noticia}</h4>
            <div id="agrupador">
              <h6>Escrito por : {e.autor}</h6>
              <h6>Genero : {e.tag}</h6>
            </div>
          </div>
        );
      })}
    </div>
  );
}
