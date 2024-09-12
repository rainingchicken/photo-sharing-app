import Footer from "../components/Footer";
import PostDisplay from "../components/PostDisplay";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { _id } = useParams();
  return (
    <div>
      <PostDisplay _id={_id} />
      <Footer />
    </div>
  );
};

export default SinglePost;
