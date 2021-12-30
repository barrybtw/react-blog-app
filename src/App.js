import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";
export const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <GlobalContext.Provider value={(isAuth, setIsAuth)}>
      <Router>
        <Routes>
          <Route path="/" element={<h1>hi</h1>} />
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
};
