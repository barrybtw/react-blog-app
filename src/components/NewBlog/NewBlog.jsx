import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./newblog.scss";
import { auth, db, storage } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { GrNote } from "react-icons/gr";
//ASSETS
import Rocket from "./../../assets/rocket.svg";
import Plane from "./../../assets/plane.svg";
import { format } from "date-fns/esm";
export const NewBlog = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // Allowed file types
  const types = ["image/png", "image/jpeg"];
  // error if not correct file type
  const [error, setError] = useState(null);
  // const [imgUrl, setImgUrl] = useState(null);
  const navigate = useNavigate();

  console.log(auth.currentUser.uid);

  // Create a new post
  const createPost = async (event) => {
    event.preventDefault();
    if (title === "") return;
    if (text === "") return;
    let specialDate = new Date();
    const dtfUS = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log(dtfUS.format(specialDate));
    // if (imgUrl === null) return;
    // const storageRef = ref(storage(selectedFile.name));
    const postCollectionRef = collection(db, "posts");
    // const url = await storageRef.getDownloadURL();
    // setImgUrl(url);
    // console.log(url);
    await addDoc(postCollectionRef, {
      title,
      post: text,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      createdAt: new Date(),
      postTime: dtfUS.format(specialDate),
      // image: imgUrl,
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
          <GrNote />
          <span>New Blog</span>
        </h1>
        <div className="new__blog--form-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Begin typing..."
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
            placeholder="Begin typing..."
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