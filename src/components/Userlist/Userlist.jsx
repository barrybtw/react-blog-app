import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {} from "firebase/firestore";

export const Userlist = () => {
  const [users, setUsers] = useState([]);
  const UserCollection = query(collection(db, "users"));
  useEffect(() => {
    const getUsers = async () => {
      const Users = await getDocs(query(UserCollection));
      setUsers(Users.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div>
      <h1>fasfsfdsaddsad</h1>
      {users && (
        <>
          {users.map((user) => {
            console.log(user.userName);
            return (
              <div key={user.id}>
                <h1>USER: {user ? user.userName : "hi"}</h1>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
