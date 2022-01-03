import "./settings.scss";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./../../firebase/config";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

export const Settings = ({ isAuth }) => {
  const [user, setUser] = useState([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const getUser = async () => {
      const userRef = doc(db, "users", id);
      const getUser = await getDoc(userRef).then((user) => {
        setUser(user.data());
      });
    };
    getUser(id);
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleChange = (e) => {
    let selected = e.target.files[0];
    console.log(selected);
  };

//   const uploadFile = (file) => {
//     const storageRef = ref(storage, `/files/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const prog = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(prog);
//       },
//       (err) => {
//         console.log(err);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//           createNewBlog(url, title, desc);
//         });
//       }
//     );
//   };

  return (
    <section id="edit-profile">
      <div className="edit-profile__container">
        <div className="edit-profile__row">
          <h1 className="section__header">Edit Profile</h1>
          <div className="edit-profile--info">
            <div className="edit-profile">
              <figure className="edit-profile__img--wrapper">
                <img className="edit-profile__img" src={user.photoURL} alt="" />
                <div className="edit-profile__overlay">
                  <div className="edit-profile--form-wrapper">
                    <label className="edit-profile--label">
                      <input
                        type="file"
                        required={false}
                        hidden
                        onChange={handleChange}
                      />
                      <span className="edit-profile--custom-btn">
                        <p className="click">Choose Image</p>
                      </span>
                    </label>
                  </div>
                </div>
              </figure>
              <strong class="text--purple">
                <h3 className="edit-profile__name click">{user.userName}</h3>
              </strong>
              <p className="edit-profile__biography">
                <strong class="text--purple click">Biography: </strong>{" "}
                {user.biography}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
