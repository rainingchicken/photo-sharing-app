import { useEffect, useState } from "react";
import { useGetAPostMutation } from "../slices/postApiSlice";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

const PostDisplayPublic = ({ _id: _id }) => {
  const [post, setPost] = useState(null);

  const [getPostAPICall, { isLoading }] = useGetAPostMutation();

  const fetchAPost = async () => {
    try {
      const res = await getPostAPICall(_id).unwrap();
      setPost(res);
    } catch (error) {
      toast.error("Cannot load post");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPost();
  }, []);

  return (
    <div>
      {isLoading && <Spinner aria-label="loading the post" />}
      {post && (
        <>
          <>
            <h1 className="text-center m-4">{post.title}</h1>
            <img src={post.image} alt={post.title} />
          </>
        </>
      )}
    </div>
  );
};

export default PostDisplayPublic;
