import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import "./userlist.scss";

export const Userlist = () => {
  const [users, setUsers] = useState([]);
  const UserCollection = query(collection(db, "users"));
  const [amount, setAmount] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const Users = await getDocs(query(UserCollection));
      setUsers(
        Users.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, []);

  const getPostAmount = async (id) => {
    const data = await getDocs(
      query(collection(db, "posts"), where("authorID", "==", id))
    );
    setAmount(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <section className="users-gallery">
      <div className="users-gallery__container">
        <div className="users-gallery__row">
          <h1 className="section__header">User Profile List</h1>
          <figure className="users-gallery__img--wrapper">
            {users &&
              users.length > 0 &&
              users.map((user) => {
                return (
                  <>
                    <div className="users-gallery--overlay">
                      <img
                        src={user.photoURL}
                        className="users-gallery--img"
                        alt=""
                        key={user.userID}
                      />
                      <div
                        className="users-gallery__about-me"
                        onClick={() => navigate(`/user/${user.userID}`)}
                      >
                        <div className="profile__name">{user.userName}</div>
                        <div className="profile__detail">{user.biography}</div>
                      </div>
                    </div>
                  </>
                );
              })}
          </figure>
        </div>
      </div>
    </section>
  );
};
