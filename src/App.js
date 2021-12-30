import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";
export const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  console.log(isAuth);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <GlobalContext.Provider value={(isAuth, setIsAuth)}>
        <Navbar />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route
            path="/login"
            element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route path="/posts" element={<h1>hi</h1>} />
        </Routes>
      </GlobalContext.Provider>
    </Router>
  );
};
