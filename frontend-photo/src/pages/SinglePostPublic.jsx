import { useParams } from "react-router-dom";
import PostDisplayPublic from "../components/PostDisplayPublic";

const SinglePostPublic = () => {
  const { _id } = useParams();
  return (
    <div>
      <PostDisplayPublic _id={_id} />
    </div>
  );
};

export default SinglePostPublic;
