import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HOST from "../../../VARIAVEIS";

import "./Editar.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Visualizar() {
  const { id } = useParams();

  function onChange(event) {
    const { name, value } = event.target;
    setNovaNoticia({ ...novaNoticia, [name]: value });
  }

  const initialValue = {
    id_noticia: id,
    titulo: "",
    texto: "",
    autor: "",
    tag: "",
    capa: "",
    id_autor: "",
  };

  //RECEBE A NOTICIA
  useEffect(() => {
    axios
      .get(`${HOST}/visualizar/${id}`)
      .then(function (response) {
        const data = response.data[0];
        initialValue.titulo = data.titulo;
        initialValue.texto = data.texto_noticia;
        initialValue.tag = data.tag;
        console.log(initialValue);
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
  const [novaNoticia, setNovaNoticia] = useState(initialValue);

  function validação() {
    if (!novaNoticia.autor == 0) {
      axios
        .put(`${HOST}/editar`, novaNoticia)
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
      <Link to="/dashboard">Voltar</Link>
      <form action="" method="post" onSubmit={postUser}>
        <div className="formItem">
          <label>Titulo da noticia</label>
          <input
            type="text"
            name="titulo"
            onChange={onChange}
            required
            value={novaNoticia.titulo}
          />
        </div>

        <div id="formTextArea">
          <label>Texto da noticia</label>
          <textarea
            name="texto"
            onChange={onChange}
            required
            value={novaNoticia.texto}
          ></textarea>
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
              ESCOLHA O AUTOR
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
            value={novaNoticia.tag}
          />
        </div>
        <button type="submit" id="botaoSalvar">
          Salvar
        </button>
      </form>
    </div>
  );
}
