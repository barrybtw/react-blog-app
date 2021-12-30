import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";

import { Home } from "./pages/Home/Home";
import { Navbar } from "./components/Nav/Navbar";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import { NewBlog } from "./components/NewBlog/NewBlog";
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
    <Router>
      <GlobalContext.Provider value={(isAuth, setIsAuth)}>
        <Navbar
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          signUserOut={signUserOut}
        />
        <Routes>
          <Route path="/*" element={<Home isAuth={isAuth} />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/new" element={<NewBlog isAuth={isAuth} />} />
        </Routes>
      </GlobalContext.Provider>
    </Router>
  );
};
