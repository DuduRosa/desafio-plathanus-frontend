import React from "react";
import Card from "../noticiaCard/Card";
import "./Agrupador.css";
import { useEffect, useState } from "react";
import axios from "axios";
import HOST from "../../VARIAVEIS";

export default function Agrupador() {
  const [noticias, setNoticias] = useState([]);

  
  useEffect(() => {
    // Make a request for a user with a given ID
    axios
      .get(`${HOST}/noticiashome`)
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
  }, []);

  return (
    <div id="agrupadorDiv">
      <ul>
        {noticias.map((noticia) => {
          return (
            <Card
              autor={noticia.autor}
              created_at={noticia.created_at}
              id_noticia={noticia.id_noticia}
              tag={noticia.tag}
              titulo={noticia.titulo}
              texto={noticia.texto_noticia}
            />
          );
        })}
      </ul>
    </div>
  );
}
