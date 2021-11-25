import { Redirect, Route } from "react-router";

const PrivateRoute = ({ status, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        status === "loggedIn" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
