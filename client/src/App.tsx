import React, { useContext } from "react";
import "./App.css";
import { AuthenticationContext } from "./AuthenticationProvider";
import Dashboard from "./pages/Dashboard";
import { Switch } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

function App() {
  const valueOf = useContext(AuthenticationContext);
  const status = valueOf.authenticationStatus;
  console.log(status);

  if (status === "uncertain") return <>Loading</>;
  else
    return (
      <div className="App">
        <Switch>
          <PublicRoute status={status} path="/register" component={Register} />
          <PublicRoute status={status} path="/login" component={Login} />
          <PrivateRoute status={status} path="/" component={Dashboard} />
        </Switch>
      </div>
    );
}

export default App;
