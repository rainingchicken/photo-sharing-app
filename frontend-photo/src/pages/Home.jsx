import { useEffect } from "react";
import Hero from "../components/Hero";

const Home = () => {
  useEffect(() => {
    document.title = "PhotoShare Home";
  }, []);
  return (
    <div>
      <h1 className="text-center m-4">Welcome !!</h1>
      <Hero />
    </div>
  );
};

export default Home;
