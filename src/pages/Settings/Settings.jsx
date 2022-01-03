import "./settings.scss";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./../../firebase/config";
import { useState, useEffect } from "react";
import { doc, getDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

export const Settings = ({ isAuth }) => {
  const [user, setUser] = useState([]);
  const id = localStorage.getItem("id");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const userRef = doc(db, "users", id);
      const getUser = await getDoc(userRef).then((user) => {
        setUser(user.data());
      });
    };
    getUser(id);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    uploadFile(file);
  };

  const uploadFile = (file) => {
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
            localStorage.setItem("updatedProfileImg", url);
        });
      }
    );
  };

//   const updateProfileImage = async (url) => {
//     const postCollectionRef = collection(db, "users");
//     // await addDoc(postCollectionRef, {
//     //     title,
//     //     blogid: uuidv4(),
//     //     post: desc,
//     //     authorID: auth.currentUser.uid,
//     //     authorName: auth.currentUser.displayName,
//     //     image: url,
//     //     createdAt: new Date(),
//     //     postTime: dtfUS.format(specialDate),
//     //   });
//   }

  return (
    <section id="edit-profile">
      <div className="edit-profile__container">
        <div className="edit-profile__row">
          <h1 className="section__header">Edit Profile</h1>
          <div className="edit-profile--info">
            <div className="edit-profile">
              <figure className="edit-profile__img--wrapper">
                <img className="edit-profile__img" src={localStorage.getItem("updatedProfileImg") !== null ? localStorage.getItem("updatedProfileImg") : user.photoURL} alt="" />
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
              <strong className="text--purple">
                <h3 className="edit-profile__name click">{user.userName}</h3>
              </strong>
              <p className="edit-profile__biography">
                <strong className="text--purple click">Biography: </strong>{" "}
                {user.biography}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
