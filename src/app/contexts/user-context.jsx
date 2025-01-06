"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({ user: null, accessToken: "" });

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const localToken = localStorage.getItem("accessToken");
    setAccessToken(localToken);
  }, []);

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
    if (accessToken !== "") {
      axios
        .get("http://localhost:3333/me", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((res) => {
          setAccessToken("");
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{
        user,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
