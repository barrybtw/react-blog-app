import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getDoc } from "firebase/firestore";

export const Blog = () => {
  const { blogid } = useParams();
  const [blog, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  {
    /* USEEFFECT, GET BLOG */
  }
  const docRef = doc(db, "posts", blogid);
  useEffect(() => {
    setBlog(getDoc(docRef).then((doc) => setBlog(doc.data())));
  }, []);
  console.log("BLOGOBJECT", blog);
  console.log("AUTHOR OBJECT", blog["author"]);
  return (
    <div>
      Blog
      {blog.title !== null && (
        <>
          <h1>{blog.title}</h1>
        </>
      )}
    </div>
  );
};
