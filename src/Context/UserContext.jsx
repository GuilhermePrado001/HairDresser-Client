import React, { createContext, useState, useEffect } from "react";
import moment from "moment";
import AuthService from "../Services/Auth/AuthService";
moment.locale("pt-br");

export const UserContext = createContext();

export default function UserProvider({ children, settings }) {
  const [loggedUser, setLoggedUser] = useState([]);
  const [userConfig, setUserConfig] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (settings) {
      setUserConfig(settings);
    }
  }, [settings]);

  const getUserData = async () => {
    const authService = new AuthService();
    setLoggedUser(await authService.getUser());
  };

  const hasRole = (role) => {
    return loggedUser?.profile?.role?.includes(role);
  };

  return (
    <UserContext.Provider
      value={{
        userConfig,
        setUserConfig,

        loggedUser,
        hasRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
