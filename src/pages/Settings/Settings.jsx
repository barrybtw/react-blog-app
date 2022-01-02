import "./settings.scss";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

export const Settings = ({ isAuth }) => {
  const [user, setUser] = useState([]);
  let id;
  if (auth.currentUser.uid !== null) {
    let id = auth.currentUser.uid
  }

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
          <div className="edit-profile--info">
            <div className="edit-profile">
              <figure className="edit-profile__img--wrapper">
                <img src="/" alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
