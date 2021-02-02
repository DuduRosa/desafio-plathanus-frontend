import React, { useEffect } from "react";
import Menu from "../../../components/menu/Menu";
import Agrupador from "../../../components/agrupadorCards/Agrupador";

import { useState } from "react";
import HOST from "../../../VARIAVEIS";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Card from "../../../components/noticiaCard/Card";
import "./Pesquisa.css";

export default function Home() {
  const { id } = useParams();

  const [busca, setBusca] = useState([]);

  useEffect(() => {
    axios
      .post(`${HOST}/pesquisa`, {
        titulo: id,
      })
      .then(function (response) {
        const data = response.data;
        setBusca(data);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div id="pesquisaView">
      <Link to="/" id="btnHome">Home</Link>
      {busca.map((buscar) => {
        return (
          <Card
            id="cardPesquisa"
            autor={buscar.autor}
            created_at={buscar.created_at}
            id_noticia={buscar.id_noticia}
            tag={buscar.tag}
            titulo={buscar.titulo}
            texto={buscar.texto_noticia}
          />
        );
      })}
    </div>
  );
}
