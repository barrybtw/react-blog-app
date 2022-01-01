import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./../../firebase/config";
import { auth } from "../../firebase/config";
import { db } from "../../firebase/config";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import Rocket from "./../../assets/rocket.svg";
import Plane from "./../../assets/plane.svg";
import { GrNote } from "react-icons/gr";

import "./newblog.scss";
import { useNavigate } from "react-router-dom";
let specialDate = new Date();
const dtfUS = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export const NewBlog = () => {
  const [progress, setProgress] = useState(0);
  const [isDisabled, setIsDisabled] = useState(0);
  const [isMissingContent, setIsMissingContent] = useState(false);
  const [isMissingTitle, setIsMissingTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  var audio = new Audio("/no.mp3");

  const start = () => {
    audio.volume = 0.09;
    audio.play();
    setIsMissingContent(true);
    setIsMissingTitle(true);
  };
  const formHandler = (e) => {
    e.preventDefault();
    if (isMissingContent || isMissingTitle || title === "" || desc === "") {
      start();
      return;
    }
    const file = e.target[2].files[0];
    uploadFile(file);
  };
  const uploadFile = (file) => {
    if (!file) {
      createNewBlog("", title, desc);
      return;
    } else {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            createNewBlog(url, title, desc);
          });
        }
      );
    }
  };
  const createNewBlog = async (url, title, desc) => {
    const postCollectionRef = collection(db, "posts");
    setIsDisabled(true);
    if (url === null) {
      await addDoc(postCollectionRef, {
        title,
        blogid: uuidv4(),
        post: desc,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        createdAt: new Date(),
        postTime: dtfUS.format(specialDate),
      });
    } else {
      await addDoc(postCollectionRef, {
        title,
        blogid: uuidv4(),
        post: desc,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        image: url,
        createdAt: new Date(),
        postTime: dtfUS.format(specialDate),
      });
    }
    navigate("/");
  };

  const handleChange = (e) => {
    let selected = e.target.files[0];
    setFile(selected);
  };
  return (
    <div className="new__blog--container">
      <img
        src={Rocket}
        alt="Rocket launching"
        className="absolute_rocket abs"
      />
      <img src={Plane} alt="Plane" className="absolute_plane abs" />
      <form className="new__blog--form" onSubmit={formHandler} id="my-form">
        <h1 className="new__blog--form-title">
          <GrNote />
          <span>New Blog</span>
        </h1>
        <div className="new__blog--form-field">
          <label htmlFor="title">Title</label>
          <textarea
            type="text"
            name="title"
            id="title"
            placeholder="Begin typing..."
            className="new__blog--form-input"
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.length >= 10) {
                setIsMissingTitle(false);
              } else {
                setIsMissingTitle(true);
              }
            }}
          />
          {isMissingTitle && (
            <div className="form__missing form__missing-title">
              <p>Requires 10 characters or more</p>
            </div>
          )}
        </div>
        <div className="new__blog--form-field">
          <label htmlFor="text">Content</label>
          <textarea
            type="text"
            name="text"
            id="text"
            className="new__blog--form-input"
            placeholder="Begin typing..."
            onChange={(e) => {
              setDesc(e.target.value);
              if (e.target.value.length >= 15) {
                setIsMissingContent(false);
              } else {
                setIsMissingContent(true);
              }
            }}
          />
          {isMissingContent && (
            <div className="form__missing form__missing-content">
              <p>Requires 15 characters or more</p>
            </div>
          )}
        </div>

        <div className="new__blog--form-field">
          <label htmlFor="text">Upload Image</label>
          <div className="new__blog--form-wrapper">
            <label className="new__blog--label">
              <input
                type="file"
                required={false}
                onChange={handleChange}
                hidden
              />
              <span className="new__blog--custom-btn">Choose Image</span>
            </label>
            <div className="new__blog--output">
              {file && <div>{file.name}</div>}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          className="new__blog--form-submit"
          form="my-form"
          id="inputbtn"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};
