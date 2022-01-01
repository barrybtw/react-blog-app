import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Navbar } from "./components/Nav/Navbar";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import { NewBlog } from "./components/NewBlog/NewBlog";
import { User } from "./pages/User/User";
import { Menu } from "./components/Menu/Menu";

export const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  console.log(isAuth);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    });
  };

  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} signUserOut={signUserOut} />
      <Menu isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/new" element={<NewBlog isAuth={isAuth} />} />
        <Route path="profile" element={<User />} />
      </Routes>
    </Router>
  );
};
