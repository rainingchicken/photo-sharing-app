import { useParams } from "react-router-dom";
import PostDisplayPublic from "../components/PostDisplayPublic";
import Footer from "../components/Footer";

const SinglePostPublic = () => {
  const { _id } = useParams();
  return (
    <div>
      <PostDisplayPublic _id={_id} />
      <Footer />
    </div>
  );
};

export default SinglePostPublic;
