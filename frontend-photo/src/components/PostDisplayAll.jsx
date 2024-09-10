import { useEffect, useState } from "react";
import { useGetAllPostsMutation } from "../slices/postApiSlice";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

const PostDisplayAll = () => {
  const [posts, setPosts] = useState([]);
  const [getAllPostsAPICall, { isLoading }] = useGetAllPostsMutation();

  const fetchAllPosts = async () => {
    try {
      const res = await getAllPostsAPICall().unwrap();
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
              <Link to={`/posts/${post._id}`}>View</Link>
            </div>
          );
        })}
    </div>
  );
};

export default PostDisplayAll;
