import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ status, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        status === "loggedIn" ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
