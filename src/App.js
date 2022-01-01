import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Navbar } from "./components/Nav/Navbar";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import { NewBlog } from "./components/NewBlog/NewBlog";
import { User } from "./pages/User/User";
import { Menu } from "./components/Menu/Menu";
import { Settings } from "./pages/Settings/Settings";

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
<<<<<<< HEAD
        <Route path="/profile" element={<User />} />
        <Route path="/settings" element={<Settings />} />
=======
        <Route path="profile" element={<User />} />
        <Route path="user/:id" element={<Profile />} />
<<<<<<< HEAD
>>>>>>> 419be32ac04c1fb011239fce4ef4ad57ae41d92c
=======
        <Route path="users" element={<Usersite />} />
>>>>>>> 0481468c3d3d32995015ab207e0957fe39c8fe3e
      </Routes>
    </Router>
  );
};
