import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Navbar } from "./components/Nav/Navbar";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import { NewBlog } from "./components/NewBlog/NewBlog";

import { ContextAPI } from "./context/GlobalContext";
import da from "date-fns/esm/locale/da/index.js";
export const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  console.log(isAuth);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    });
  };

  // Use signUserOut, setIsAuth as props
  // Import auth in the nav

  return (
    <ContextAPI>
      <Router>
        <Navbar
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          signUserOut={signUserOut}
        />
        <Routes>
          <Route path="/*" element={<Home isAuth={isAuth} />} />
          <Route path="/new" element={<NewBlog isAuth={isAuth} />} />
        </Routes>
      </Router>
    </ContextAPI>
  );
};
