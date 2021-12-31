import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./newblog.scss";
import { auth, db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { projectStorage } from "../../firebase/config";
import { GiCoffeeCup } from "react-icons/gi";
//ASSETS
import Rocket from "./../../assets/rocket.svg";
import Plane from "./../../assets/plane.svg";
export const NewBlog = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // Allowed file types
  const types = ["image/png", "image/jpeg"];
  // error if not correct file type
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();

  // Create a new post
  const createPost = async (event) => {
    event.preventDefault();
    if (title === "") return;
    if (text === "") return;

    const storageRef = projectStorage.ref(selectedFile.name);
    const postCollectionRef = collection(db, "posts");
    const url = await storageRef.getDownloadURL();
    setUrl(url);
    await addDoc(postCollectionRef, {
      title,
      post: text,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      image: url,
    });
    navigate("/");
  };

  //Recive and store file uploaded by user
  const fileSelectedHandler = (event) => {
    let selected = event.target.files[0];
    if (selected && types.includes(selected.type)) {
      setSelectedFile(event.target.files[0]);
      setError("");
    } else {
      setSelectedFile(null);
      setError("Please select an image file type (png or jpeg)");
    }
  };

  // Check if user is logged in
  useEffect(() => {
    if (!isAuth) navigate("/");
  }, []);

  return (
    <div className="new__blog--container">
      <img
        src={Rocket}
        alt="Rocket launching"
        className="absolute_rocket abs"
      />
      <img src={Plane} alt="Plane" className="absolute_plane abs" />
      <form className="new__blog--form">
        <h1 className="new__blog--form-title">
          <GiCoffeeCup />
          <span>New Blog</span>
        </h1>
        <div className="new__blog--form-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title..."
            className="new__blog--form-input"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="new__blog--form-field">
          <label htmlFor="text">Content</label>
          <textarea
            type="text"
            name="text"
            id="text"
            className="new__blog--form-input"
            placeholder="Message..."
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="new__blog--form-field">
          <label htmlFor="text">Upload Image</label>
          <input type="file" required={false} onChange={fileSelectedHandler} />
          <div className="newBlog__output">
            {error && <div className="newBlog__output-error">{error}</div>}
            {selectedFile && (
              <div className="newBlog__output-filename">
                {selectedFile.name}
              </div>
            )}
          </div>
        </div>
        <button onClick={createPost} className="new__blog--form-submit">
          Create Blog
        </button>
      </form>
    </div>
  );
};
