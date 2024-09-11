import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const allPosts = await Post.find({}).sort({ createdAt: -1 });
    if (allPosts) {
      res.status(200).json(allPosts);
    } else {
      res.status(404);
      throw new Error("Cannot find posts");
    }
  })
);

router.get(
  "/:_id",
  asyncHandler(async (req, res) => {
    const _id = req.params;
    const aPost = await Post.findById(_id);
    if (aPost) {
      res.status(200).json(aPost);
    } else {
      res.status(404);
      throw new Error("Cannot find the post");
    }
  })
);

export default router;
