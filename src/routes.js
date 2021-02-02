import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Dash from "./pages/Dashboard/Dash";
import Cadastrar from "./pages/Dashboard/cadastrar/Cadastrar";
import Editar from "./pages/Dashboard/editar/Editar";
import Erro from "./pages/404/Erro";
import Visualizar from "./pages/Dashboard/visualizar/Visualizar";
import Noticia from "./pages/Home/Noticia/Noticia";
import Pesquisa from "./pages/Home/Pesquisa/Pesquisa";
import CadastroAutor from "./pages/Home/CadastrarAutor/CadastroAutor";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/pesquisa=:id">
          <Pesquisa />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/cadastro" exact>
          <CadastroAutor />
        </Route>
        <PrivateRoute path="/dashboard" exact>
          <Dash />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/cadastrar" exact>
          <Cadastrar />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/editar/:id" exact>
          <Editar />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/visualizar/:id">
          <Visualizar />
        </PrivateRoute>
        <PrivateRoute path="/noticias/:id">
          <Noticia />
        </PrivateRoute>
        <Route path="*">
          <Erro />
        </Route>
      </Switch>
    </Router>
  );
}
