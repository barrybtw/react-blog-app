import "./settings.scss";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./../../firebase/config";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const Settings = ({ isAuth }) => {
  const [user, setUser] = useState([]);
  const id = localStorage.getItem("id");
  const [displayName, setDisplayName] = useState(null);
  const [biography, setBiography] = useState(null);
  const [hiddenInput, setHiddenInput] = useState(false);
  const [message, setMessage] = useState(false);
  const [hiddenTextArea, setHiddenTextArea] = useState(false);
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

  const handleKeyPress = () => {
    updateProfileName();
    setHiddenInput(false);
  };

  const handleAreaKeyPress = () => {
    updateProfileBio();
    setHiddenTextArea(false);
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
          updateProfileImage(url);
        });
      }
    );
  };

  const updateProfileImage = async (url) => {
    const usersRef = doc(db, "users", id);
    await updateDoc(usersRef, {
      photoURL: url,
    })
      .then(() => {
        setMessage(true);
      })
      .catch((err) => {
        console.log("ERROR" + err);
      });
  };

  const updateProfileName = async () => {
    const usersRef = doc(db, "users", id);
    await updateDoc(usersRef, {
      userName: displayName,
    })
      .then(() => {
        setMessage(true);
      })
      .catch((err) => {
        console.log("ERROR" + err);
      });
  };

  const updateProfileBio = async () => {
    const usersRef = doc(db, "users", id);
    await updateDoc(usersRef, {
      biography: biography,
    })
      .then(() => {
        setMessage(true);
      })
      .catch((err) => {
        console.log("ERROR" + err);
      });
  };

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
              <strong className="text--purple">
                <h3
                  className="edit-profile__name click"
                  onClick={() => setHiddenInput(true)}
                >
                  {user.userName}
                </h3>
                {hiddenInput && (
                  <input
                    className="edit-profile__name--hidden"
                    onChange={(e) => setDisplayName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleKeyPress()}
                  />
                )}
              </strong>
              <p className="edit-profile__biography">
                <strong
                  className="text--purple click"
                  onClick={() => setHiddenTextArea(true)}
                >
                  Biography:{" "}
                </strong>{" "}
                {user.biography}
              </p>
              {hiddenTextArea && (
                <textarea
                  type="text"
                  name="text"
                  id="text"
                  className="edit-profile__biography--hidden"
                  placeholder="Begin typing..."
                  onChange={(e) => setBiography(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAreaKeyPress()}
                />
              )}
              {message && (
                <div className="edit-profile__message">
                  <h1 className="message">
                    Please refresh your screen to see the updates!
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
