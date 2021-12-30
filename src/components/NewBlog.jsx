import { addDoc, collection } from "firebase/firestore";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export const NewBlog = () => {
  const { title, text } = useContext(GlobalContext);
  const navigate = useNavigate();
  const createPost = async (event) => {
    event.preventDefault();
    if (title === "") return;
    if (text === "") return;

    const postCollectionRef = collection(db, "posts");
    await addDoc(postCollectionRef, {
      title,
      post: text,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  return <div></div>;
};
