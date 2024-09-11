import { useEffect, useState } from "react";
import {
  useDeleteAPostMutation,
  useGetAPostMutation,
} from "../slices/postApiSlice";
import { toast } from "react-toastify";
import { Button, Spinner } from "flowbite-react";

import { FaRegTrashAlt } from "react-icons/fa";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const PostDisplay = ({ _id: _id }) => {
  const [post, setPost] = useState(null);

  const navigate = useNavigate();

  const [getPostAPICall, { isLoading }] = useGetAPostMutation();
  const [deletePostAPICall] = useDeleteAPostMutation();

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

  const handleDelete = async () => {
    //delete image from firebase cloud
    let fileName;
    if (post) {
      fileName = post.image
        .split(".appspot.com/o/")
        .pop()
        .split("?alt=media&token")[0];
    }
    console.log(fileName);
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    deleteObject(storageRef)
      .then(() => {
        // toast.info("Post deleted");
      })
      .catch((error) => {
        toast.error("Something went wrong. Cannot delete post");
        console.log(error);
      });

    //delete from mongodb
    try {
      await deletePostAPICall(_id).unwrap();
      toast.info("Post deleted");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    navigate("/dashboard");
  };
  return (
    <div>
      {isLoading && <Spinner aria-label="loading the post" />}
      {post && (
        <>
          <Button
            className="mx-auto"
            onClick={handleDelete}
            gradientDuoTone="purpleToBlue"
          >
            <FaRegTrashAlt />
          </Button>
          <>
            {" "}
            <h1 className="text-center m-4">{post.title}</h1>
            <img src={post.image} alt={post.title} />
          </>
        </>
      )}
    </div>
  );
};

export default PostDisplay;
