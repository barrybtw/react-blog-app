import React, { useEffect, useState } from "react";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import "./custom.scss";

export const Home = ({ isAuth }) => {
  const [postLists, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(
        query(postsCollectionRef, orderBy("createdAt", "desc"))
      );
      console.log(data);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    };

    getPosts();
  }, []);
  const RenderPosts = () => (
    <div className="home-blog__list">
      {isAuth ? (
        <h1>Welcome back {auth.currentUser.displayName}!</h1>
      ) : (
        <h1>Welcome to Cabin!</h1>
      )}
      {postLists.map((post) => {
        return (
          <div className="blog__container" key={post.id}>
            <div className="blog__content">
              <h1>{post.title}</h1>
              {post.image && (
                <img className="home__post--img" src={post.image} alt="" />
              )}
              <div className="postTextContainer">{post.post} </div>
              <div>
                <h6 className="blog__author">@{post.author.name}</h6>
                <h6>Posted at {new Date(post.createdAt).toString()}</h6>
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
        <div className="middle">
          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
          <div className="bar bar4"></div>
          <div className="bar bar5"></div>
          <div className="bar bar6"></div>
          <div className="bar bar7"></div>
          <div className="bar bar8"></div>
        </div>
      ) : (
        <RenderPosts />
      )}
    </div>
  );
};
