import React, { useEffect } from "react";
import PostDisplayAll from "../components/PostDisplayAll";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate("/create");
  };

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <div>
      <h1 className="text-center">Dashboard</h1>
      <Button
        className="my-4 mx-auto"
        onClick={handleCreatePost}
        gradientDuoTone="purpleToBlue"
      >
        Create post
      </Button>
      <PostDisplayAll />
      <Footer />
    </div>
  );
};

export default Dashboard;
