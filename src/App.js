import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Navbar } from "./components/Nav/Navbar";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import { NewBlog } from "./components/NewBlog/NewBlog";
import { Blog } from "./pages/blogone/Blog";

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
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/new" element={<NewBlog isAuth={isAuth} />} />
        <Route path="/blog/:blogid" element={<Blog />}></Route>
      </Routes>
    </Router>
  );
};
