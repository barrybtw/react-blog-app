import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const ContextAPI = ({ children }) => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <GlobalContext.Provider value={(isAuth, setIsAuth)}>
      {children}
    </GlobalContext.Provider>
  );
};
