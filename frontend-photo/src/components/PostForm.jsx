import { Button, FileInput, Spinner } from "flowbite-react";
import { useState } from "react";
import { useCreateAPostMutation } from "../slices/postApiSlice";
import { toast } from "react-toastify";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useBeforeUnload, useBlocker } from "react-router-dom";
import { Alert } from "flowbite-react";

import { IoIosWarning } from "react-icons/io";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [image, setImage] = useState(null);
  const [clickedShare, setClickedShare] = useState(false);

  const [createPostAPICall, { isLoading }] = useCreateAPostMutation();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    try {
      if (!file) {
        toast.warning("Please select an image");
        return;
      }
      const storage = getStorage(app);
      const fileName = `${Date.now()}-${file.name}`;
      setFileName(fileName);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              toast.info("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          toast.error(
            "Cannot upload image. Make sure the image file size is less than 2MB"
          );
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage(downloadURL);
            console.log("File available at", downloadURL);
          });
        }
      );
    } catch (error) {
      toast.error("Something wento wrong cannot upload image");
      console.log(error);
    }
  };

  const handlePostFormSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title: title,
      image: image,
    };
    try {
      const res = await createPostAPICall(newPost).unwrap();
      console.log(res);
      toast.success("success post created");
      setClickedShare(true);
    } catch (err) {
      toast.error("Cannot create the post. Make sure to fill in all fields");
      console.log(err);
    }
  };

  //if user tries to leave route
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      image !== null &&
      !clickedShare &&
      currentLocation.pathname !== nextLocation.pathname
  );

  const handleLeavePage = () => {
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    console.log(fileName);
    deleteObject(storageRef)
      .then(() => {
        toast.info("Form discarded");
      })
      .catch((error) => {
        toast.error("Something went wrong. Cannot cancel form");
        console.log(error);
        return blocker.reset();
      });
    setImage(null);
    blocker.proceed();
    return blocker.state === null;
  };

  const handleCancel = () => {
    blocker.reset();
  };

  //if user refresh or use back button
  useBeforeUnload(() => handleLeavePage());

  return (
    <form onSubmit={handlePostFormSubmit}>
      {blocker.state === "blocked" ? (
        <>
          <Alert color="warning">
            <span className="font-medium">
              <IoIosWarning />
              Alert!
            </span>
            You have unsaved changes. Are you sure you want leave this page?
            <div>
              <button
                onClick={handleLeavePage}
                type="button"
                className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
              >
                Proceed
              </button>
              <button
                type="button"
                className="rounded-lg border border-cyan-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-cyan-700 hover:bg-cyan-800 hover:text-white focus:ring-4 focus:ring-cyan-300 dark:border-cyan-800 dark:text-cyan-800 dark:hover:text-white"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </Alert>
        </>
      ) : null}
      <input
        type="text"
        placeholder="Sunset at the beach..."
        onChange={handleTitleChange}
      />
      <FileInput type="file" accept="image/*" onChange={handleImageChange} />
      <Button onClick={handleUploadImage} gradientDuoTone="purpleToBlue">
        Upload image
      </Button>
      {image && (
        <img
          src={image}
          alt="upload image"
          className="w-full h-90 object-cover"
        />
      )}
      <Button disabled={isLoading} type="submit" gradientDuoTone="purpleToBlue">
        Share!
      </Button>
      {isLoading ? <Spinner aria-label="Sharing new post" size="xl" /> : <></>}
    </form>
  );
};

export default PostForm;
