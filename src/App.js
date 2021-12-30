import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
export const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  console.log(isAuth);

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
