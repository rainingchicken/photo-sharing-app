import { Button, FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { useCreateAPostMutation } from "../slices/postApiSlice";
import { toast } from "react-toastify";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const [createPostAPICall] = useCreateAPostMutation();

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
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          toast.dark("something went wrong cannot upload image");
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
      toast.warning("Something wento wrong cannot upload image");
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
      toast.dark("success post created");
    } catch (err) {
      toast.warning("Something went wrong. Cannot create post");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handlePostFormSubmit}>
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
      <Button type="submit" gradientDuoTone="purpleToBlue">
        Share!
      </Button>
    </form>
  );
};

export default PostForm;
