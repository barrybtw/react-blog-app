import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import "./custom.scss";

export const Home = ({ isAuth }) => {
  const [postLists, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    };

    getPosts();
  }, []);

  const RenderPosts = () => (
    <div className="home-blog__list">
      {postLists.map((post) => {
        console.log(post);
        return (
          <div className="blog__container" key={Math.random() * 100000}>
            <div className="blog__content">
              <h1>{post.title}</h1>
              <div className="postTextContainer">{post.post} </div>
              <h6 className="blog__author">@{post.author.name}</h6>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <h1>Homepage</h1>
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
