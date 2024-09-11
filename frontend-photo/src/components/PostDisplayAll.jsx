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
    <div className="grid grid-cols-3 gap-4 p-8">
      {isLoading && <Spinner size="xxxl" aria-label="loading all posts" />}
      {posts &&
        posts.map((post) => {
          return (
            <div
              className="scale-100 z-10 transition-scale duration-200 hover:scale-105"
              key={post._id}
            >
              <Link to={`/posts/${post._id}`}>
                <img
                  className="w-full aspect-auto"
                  src={post.image}
                  alt={post.title}
                />
              </Link>
              <p>{post.title}</p>
              <Link to={`/posts/${post._id}`}>View</Link>
            </div>
          );
        })}
    </div>
  );
};

export default PostDisplayAll;
