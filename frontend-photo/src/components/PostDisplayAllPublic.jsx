import React, { useEffect, useState } from "react";
import { useGetAllPublicPostsMutation } from "../slices/publicPostApiSlice";
import { Link } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";

const PostDisplayAllPublic = () => {
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  const [
    getAllPublicPostsAPICall,
    { isLoading },
  ] = useGetAllPublicPostsMutation();

  const fetchAllPosts = async () => {
    try {
      const res = await getAllPublicPostsAPICall().unwrap();
      if (res.length < 5) {
        setShowMore(false);
      }
      setPosts(res);
    } catch (error) {
      toast.error("Cannot get posts");
    }
  };
  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await getAllPublicPostsAPICall(
        `startIndex=${startIndex}`
      ).unwrap();

      setPosts(res);

      if (res.length < 5) {
        setShowMore(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(`Cannot get posts`);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-8 ">
      {isLoading ? (
        <Spinner size="xxl" aria-label="loading all posts" />
      ) : (
        <>
          {posts &&
            posts.map((post) => {
              return (
                <Link key={post._id} to={`/allposts/${post._id}`}>
                  <div className="scale-100 z-10 transition-scale duration-200 hover:scale-105">
                    <img src={post.image} alt={post.title} />
                    <p>{post.title}</p>
                  </div>
                </Link>
              );
            })}
          <div>
            {showMore && (
              <Button className="mx-auto my-1" onClick={handleShowMore}>
                SHOW MORE
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostDisplayAllPublic;
