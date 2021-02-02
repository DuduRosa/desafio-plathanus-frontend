import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Auth from './Auth';

export default function PrivateRoute({ children, ...rest }) {
  let auth = Auth.getToken() ; //useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
