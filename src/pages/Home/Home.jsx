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
            <img src={Campfire} alt="" className="welcome__back-img" />
          </div>
        ) : (
          <div className="welcome__back-div">
            <h1 className="welcome__back">Welcome to Cabin</h1>
            <img src={Campfire} alt="" className="welcome__back-img" />
          </div>
        )}
        {postLists.map((post) => (
          <div className="home__blog-container">
            <div className="home__blog-aurora">
              <img src={auroraImage} alt="" className="home__blog-aurora-img" />
              {post.image && (
                <img
                  src={post.image}
                  alt={`Image in blog of ${post.authorName}`}
                  className="home__blog-image"
                />
              )}
            </div>

            <div className="home__blog-content">
              <div className="home__blog-content-top">
                <h1 className="home__blog-title">{post.title}</h1>
                <p>{post.post}</p>
              </div>
            </div>
            <div className="home__blog-metadata">
              <p>Written by {post.authorName}</p>
            </div>
          </div>
        ))}
      </div>
    );
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
        return (
          <div className="blog__container" key={post.id}>
            <div className="blog__content">
              <h1 className="blog__content-title">{post.title}</h1>
              {post.image && (
                <div className="blog__post-picture--mask">
                  <img className="home__post--img" src={post.image} alt="" />
                </div>
              )}
              <div className="postTextContainer">{post.post} </div>
              <div className="postMetaInfo">
                <h6 className="blog__author">@ {post.authorName}</h6>
                <h6>Posted {post.postTime}</h6>
                {isAuth && post.authorID === auth.currentUser.uid && (
                  <div className="deletePost">
                    <button
                      className="noselect"
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
