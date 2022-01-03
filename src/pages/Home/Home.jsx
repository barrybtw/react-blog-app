import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import "./custom.scss";
import Campfire from "./../../assets/campfire.png";
import auroraImage from "./../../assets/aurora.png";
import aurora2 from "./../../assets/aur2.png";

export const Home = ({ isAuth }) => {
  const [postLists, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const postsCollectionRef = collection(db, "posts");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(
        query(query(postsCollectionRef, orderBy("createdAt", "desc")))
      );
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    };

    getPosts();
  }, []);
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    window.location.reload();
  };

  const BlogRender = () => {
    return (
      <div className="home-blog__list">
        {isAuth ? (
          <div className="welcome__back-div">
            <h1 className="welcome__back">
              Welcome {auth.currentUser.displayName}
            </h1>
            <img src={Campfire} alt="Campfire" className="welcome__back-img" />
          </div>
        ) : (
          <div className="welcome__back-div">
            <h1 className="welcome__back">Welcome to Cabin</h1>
            <img src={Campfire} alt="Campfire" className="welcome__back-img" />
          </div>
        )}
        {postLists.map((post) => (
          <div className="home__blog-container" key={post.id}>
            <div className="home__blog-aurora">
              {post.image ? (
                <>
                  <img
                    src={auroraImage}
                    alt="Aurora effects"
                    className="home__blog-aurora-img"
                  />
                  <img
                    src={post.image}
                    alt={`${post.authorName}' blog`}
                    className="home__blog-image"
                  />
                </>
              ) : (
                <>
                  <img
                    src={aurora2}
                    alt="Aurora effects"
                    className="home__blog-aurora-img"
                  />
                </>
              )}
            </div>

            <div className="home__blog-content">
              <div className="home__blog-content-top">
                <h1 className="home__blog-title">{post.title}</h1>
                <p>{post.post}</p>
              </div>
            </div>

            {isAuth && post.authorID === auth.currentUser.uid ? (
              <>
                <div className="home__blog-metadata-special">
                  <p>{post.authorName}</p>
                </div>
                <p
                  className="home__blog-delete click"
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  DELETE
                </p>
              </>
            ) : (
              <>
                <div className="home__blog-metadata-notspecial">
                  <p>{post.authorName}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="home__container">
      {isLoading ? (
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <BlogRender />
      )}
    </div>
  );
};
