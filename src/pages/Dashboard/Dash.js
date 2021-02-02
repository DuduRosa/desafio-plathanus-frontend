import React, { useEffect, useState } from "react";
import "./Dash.css";

import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import axios from "axios";
import HOST from "../../VARIAVEIS";

export default function Dash() {
  const [noticias, setNoticias] = useState([]);
  useEffect(() => {
    axios
      .get(`${HOST}/noticias`)
      .then(function (response) {
        // handle success
        const { data } = response;
        setNoticias(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [noticias]);

  return (
    <div id="dashboardView">
      <div id="b-dash">
        <Link to="/" id="btnHome">
          Home
        </Link>
        <Link to="/dashboard/cadastrar" id="btnAdicionar">
          <h4>Adicionar </h4>
          <IoMdAdd color="rgb(35, 207, 92)" />
        </Link>
      </div>
      <div id="overflowTable">
        <table>
          <thead>
            <tr>
              <th>Autor</th>
              <th>Titulo</th>
              <th>Tag</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {noticias.map((noticia) => {
              return (
                <tr>
                  <td width="20%">{noticia.autor}</td>
                  <td width="40%">
                    <Link to={`/dashboard/visualizar/${noticia.id_noticia}`}>
                      {noticia.titulo}
                    </Link>
                  </td>
                  <td width="20%">{noticia.tag}</td>
                  <td width="20%">{noticia.created_at}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
