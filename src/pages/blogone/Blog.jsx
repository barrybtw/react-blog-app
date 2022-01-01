import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getDoc, query } from "firebase/firestore";

export const Blog = () => {
  const { blogid } = useParams();
  const [blog, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  {
    /* USEEFFECT, GET BLOG */
  }
  const docRef = doc(db, "posts", blogid);
  useEffect(() => {
    setBlog(getDoc(docRef).then((doc) => setBlog(doc.data(), doc.id)));
  }, []);
  console.log(blog);
  const check = Object.entries(blog);
  console.log("CHECK", check);
  return (
    <div>
      Blog
      {blog !== null && (
        <>
          <h1>{blog}</h1>
        </>
      )}
    </div>
  );
};
