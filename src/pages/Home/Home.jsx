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
    <div>
      {postLists.map((post) => {
        return (
          <div className="post" key={Math.random() * 100000}>
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <h6>@{post.author.name}</h6>
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
