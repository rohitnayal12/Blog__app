import React, { useContext } from "react";
import { AuthContext } from "./Auth_context";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  

  const { Authstate } = useContext(AuthContext);

  if (Authstate.isAuth) {
    return children;
  } else {
  return <Navigate to={"/login"}/>
  }
};

export default PrivateRoute;
