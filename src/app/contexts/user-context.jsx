"use client";

import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({ isSignedIn: false });

export const UserContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const isSignedInStorage = localStorage.getItem("isSignedIn");
    setIsSignedIn(isSignedInStorage === "true");
  }, []);

  return (
    <UserContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
