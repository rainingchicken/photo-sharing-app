import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import { useGetAPublicPostMutation } from "../slices/publicPostApiSlice";

const PostDisplayPublic = ({ _id: _id }) => {
  const [post, setPost] = useState(null);

  const [getPublicPostAPICall, { isLoading }] = useGetAPublicPostMutation();

  const fetchAPost = async () => {
    try {
      const res = await getPublicPostAPICall(_id).unwrap();
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
      {isLoading ? (
        <Spinner size="xxl" aria-label="loading the post" />
      ) : (
        <>
          {" "}
          {post && (
            <>
              <>
                <h1 className="text-center m-4">{post.title}</h1>
                <img src={post.image} alt={post.title} />
              </>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PostDisplayPublic;
