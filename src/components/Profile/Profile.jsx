import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./profile.scss";
export const Profile = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getUser = async (id) => {
      const userRef = doc(db, "users", id);
      const getUser = await getDoc(userRef).then((user) => {
        setUser(user.data());
      });
    };
    getUser(id);
  }, []);
  return (
    <div className="profile__page">
      <div className="profile__card">
        <div className="profile__page-left">
          <div className="profile__page-left--content">
            <h1>Profile of {user.userName}</h1>
            <div className="profile__page-about">
              <div className="profile__page-about--mail">
                <span>Email:</span>
                <br />
                <span>{user.userMail}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="profile__page-right">
          <img src={user.photoURL} alt="" />
        </div>
      </div>
    </div>
  );
};
