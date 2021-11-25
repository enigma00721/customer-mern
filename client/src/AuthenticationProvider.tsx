import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthenticationContext = createContext(null);

export const AuhtenticationProvider = (props: any) => {
  const [authenticationStatus, setAuthenticationStatus] =
    useState<string>("uncertain");

  useEffect(() => {
    axios
      .get("/auth/refreshtoken")
      .then((response) => {
        console.log(response);
        setAuthenticationStatus("loggedIn");
      })
      .catch((err) => setAuthenticationStatus("loggedOut"));
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ authenticationStatus, setAuthenticationStatus }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};
