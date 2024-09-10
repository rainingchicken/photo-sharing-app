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
      <Button onClick={handleCreatePost} gradientDuoTone="purpleToBlue">
        Create post
      </Button>
      <PostDisplayAll />
    </div>
  );
};

export default Dashboard;
