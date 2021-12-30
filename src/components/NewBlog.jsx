import { addDoc, collection } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { isAuth } = useContext(GlobalContext);
  const navigate = useNavigate();

  // Create a new post
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

  // Check if user is logged in
  useEffect(() => {
    if (!isAuth) navigate("/");
  }, []);

  return (
    <form>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="text">Content</label>
        <input
          type="text"
          name="text"
          id="text"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </form>
  );
};
