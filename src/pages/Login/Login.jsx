//React & Router-dom
import { FcGoogle } from "react-icons/fc";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//ContextAPI
import { GlobalContext } from "../../context/GlobalContext";
//Firebase
import { auth, provider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";

//scss file
import "./login.scss";

export const Login = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(false);

  const signInWithGoogle = () => {
    if (timer) return;
    setTimer(true);

    signInWithPopup(auth, provider).then((res) => {
      console.log(isAuth);
      setIsAuth(true);
      localStorage.setItem("isAuth", true);

      navigate("/");

      console.log(res);
    });

    setTimeout(() => {
      setTimer(false);
    }, 1000);
  };

  return (
    <section className="login">
      <div className="login__container">
        <div className="login__row">
          
        </div>
      </div>
    </section>
    // <div>
    //   {isAuth ? "Is logged on" : "Is not logged on"}
    //   <div>
    //     <FcGoogle />
    //   </div>
    //   <button onClick={signInWithGoogle} disabled={timer}>
    //     Sign In With Google...
    //   </button>
    // </div>
  );
};
