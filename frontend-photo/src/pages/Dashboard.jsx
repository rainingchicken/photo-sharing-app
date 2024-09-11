import React from "react";
import PostDisplayAll from "../components/PostDisplayAll";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate("/create");
  };

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
    </div>
  );
};

export default Dashboard;
