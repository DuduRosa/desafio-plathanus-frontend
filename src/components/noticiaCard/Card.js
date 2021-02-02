import React, { useEffect, useState } from "react";
import "./Card.css";

import axios from "axios";
import HOST from "../../VARIAVEIS";

import { Link } from "react-router-dom";

import Img from "../../resources/images/sinovac.jpg";

export default function Card(props) {
  const [maxPrevia, setMaxPrevia] = useState("");

  useEffect(() => {
    let max = props.texto;
    max = max.substr(0, 200);
    max = max + "...";
    setMaxPrevia(max);
  }, []);

  return (
    <div id="cardView">
      <div id="cardImg">
        <img src={Img} />
      </div>
      <div id="cardContent">
        <h4 id="tema">{props.tag}</h4>
        <Link to={`/noticias/${props.id_noticia}`}>
          <h3 id="titulo">{props.titulo}</h3>
        </Link>
        <text id="previa">{maxPrevia}</text>
      </div>
    </div>
  );
}
