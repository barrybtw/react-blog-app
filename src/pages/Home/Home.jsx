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

export const Home = ({ isAuth }) => {
  const [postLists, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(
        query(postsCollectionRef, orderBy("createdAt", "desc"))
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
  const RenderPosts = () => (
    <div className="home-blog__list">
      {isAuth ? (
        <div className="welcome__back-div">
          <h1 className="welcome__back">
            Welcome {auth.currentUser.displayName}
          </h1>
          <img src={Campfire} alt="" className="welcome__back-img" />
        </div>
      ) : (
        <div className="welcome__back-div">
          <h1 className="welcome__back">Welcome to Cabin</h1>
          <img src={Campfire} alt="" className="welcome__back-img" />
        </div>
      )}
      {postLists.map((post) => {
        console.log(post.author.id);
        return (
          <div className="blog__container" key={post.id}>
            <div className="blog__content">
              <h1>{post.title}</h1>
              {post.image && (
                <img className="home__post--img" src={post.image} alt="" />
              )}
              <div className="postTextContainer">{post.post} </div>
              <div className="postMetaInfo">
                <h6 className="blog__author">@ {post.author.name}</h6>
                <h6>Posted {post.postTime}</h6>
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <div className="deletePost">
                    <button
                      class="noselect"
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      <div></div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="home__container">
      {isLoading ? (
        <div class="lds-spinner">
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
        <RenderPosts />
      )}
    </div>
  );
};
