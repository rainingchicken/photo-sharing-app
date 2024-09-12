import { useEffect } from "react";
import Footer from "../components/Footer";
import PostDisplayAllPublic from "../components/PostDisplayAllPublic";

const Browse = () => {
  useEffect(() => {
    document.title = "PhotoShare Browse";
  }, []);
  return (
    <div>
      <h1 className="text-center">Let's procrastinate!! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧</h1>
      <PostDisplayAllPublic />
      <Footer />
    </div>
  );
};

export default Browse;
