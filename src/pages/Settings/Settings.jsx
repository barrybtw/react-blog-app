import "./settings.scss";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

export const Settings = ({ isAuth }) => {
  const [user, setUser] = useState([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const getUser = async () => {
      const userRef = doc(db, "users", id);
      const getUser = await getDoc(userRef).then((user) => {
        setUser(user.data());
      });
    };
    getUser(id);
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <section id="edit-profile">
      <div className="edit-profile__container">
        <div className="edit-profile__row">
            <h1 className="section__header">Edit Profile</h1>
          <div className="edit-profile--info">
            <div className="edit-profile">
              <figure className="edit-profile__img--wrapper">
                <img className="edit-profile__img" src={user.photoURL} alt="" />
                <div className="edit-profile__overlay">
                  <p className="edit-profile__text">Edit Profile</p>
                </div>
              </figure>
              <strong class="text--purple">
                <h3>{user.userName}</h3>
              </strong>
              <p className="edit-profile__biography">
                { user.biography }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
