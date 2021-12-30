import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";

import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
export const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <GlobalContext.Provider value={(isAuth, setIsAuth)}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/posts" element={<h1>hi</h1>} />
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
};
