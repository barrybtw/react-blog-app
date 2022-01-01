import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

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
      {users && <h1>Loaded</h1>}
    </div>
  );
};
