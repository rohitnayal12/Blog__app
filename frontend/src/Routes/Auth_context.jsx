import React, { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [Authstate, setAuthstate] = useState({
    isAuth: false,
    token:null,
    user:null
  });

  return (
    <AuthContext.Provider value={{ Authstate, setAuthstate }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
