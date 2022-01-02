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
    <div className="users__page">
      <div className="users__grid">
        {users &&
          users.length > 0 &&
          users.map((user) => {
            return (
              <div
                className="profile"
                key={user.userID}
                style={{ fontFamily: "Nunito" }}
                onClick={() => {
                  navigate(`/user/${user.userID}`);
                }}
              >
                <img src={user.photoURL} alt="" className="profile__image" />
                <div className="profile__name">{user.userName}</div>
                <div className="profile__detail">{user.biography}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
