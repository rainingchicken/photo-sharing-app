import React, { useEffect, useState } from "react";
import { useGetAllPublicPostsMutation } from "../slices/publicPostApiSlice";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";

const PostDisplayAllPublic = () => {
  const [posts, setPosts] = useState([]);
  const [
    getAllPublicPostsAPICall,
    { isLoading },
  ] = useGetAllPublicPostsMutation();

  const fetchAllPosts = async () => {
    try {
      const res = await getAllPublicPostsAPICall().unwrap();
      setPosts(res);
    } catch (error) {
      toast.error("Cannot get posts");
    }
  };
  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div>
      {isLoading && <Spinner aria-label="loading all posts" />}
      {posts &&
        posts.map((post) => {
          return (
            <div key={post._id}>
              <img src={post.image} alt={post.title} />
              <p>{post.title}</p>
              <Link to={`/allposts/${post._id}`}>View</Link>
            </div>
          );
        })}
    </div>
  );
};

export default PostDisplayAllPublic;
