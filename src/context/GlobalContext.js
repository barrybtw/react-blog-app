import { createContext, useState } from "react";

const GlobalContext = createContext();
export const ContextAPI = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <GlobalContext.Provider value={(isAuthenticated, setIsAuthenticated)}>
      {children}
    </GlobalContext.Provider>
  );
};
