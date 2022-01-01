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
let specialDate = new Date();
const dtfUS = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export const NewBlog = () => {
  const [progress, setProgress] = useState(0);
  const [isDisabled, setIsDisabled] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[2].files[0];
    console.log("filefilefile");
    console.log(file);
    uploadFile(file);
  };
  const uploadFile = (file) => {
    if (!file) {
      createNewBlog("", title, desc);
      console.log("bich");
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
          console.log("wtf");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            console.log("ayy");
            createNewBlog(url, title, desc);
          });
        }
      );
    }
  };
  const createNewBlog = async (url, title, desc) => {
    const postCollectionRef = collection(db, "posts");
    if (url === null) {
      console.log("also worksdsadsdsadasdasdsa");
      await addDoc(postCollectionRef, {
        title,
        post: desc,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        createdAt: new Date(),
        postTime: dtfUS.format(specialDate),
      });
    } else {
      console.log("gets here");
      await addDoc(postCollectionRef, {
        title,
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
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="new__blog--form-field">
          <label htmlFor="text">Upload Image</label>
          <input type="file" required={false} />
          <div className="newBlog__output"></div>
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
