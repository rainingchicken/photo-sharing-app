import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import { protect } from "../middleware/authMiddleware.js";

router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const user = req.user.id;
    const allPosts = await Post.find({ user }).sort({ createdAt: -1 });
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
  protect,
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

router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const user = req.user.id;
    const { title, image } = req.body;
    const createdPost = await Post.create({ title, image, user });
    if (createdPost) {
      res.status(200).json(createdPost);
    } else {
      res.status(404);
      throw new Error("Cannot create the post");
    }
  })
);

router.patch(
  "/:_id",
  protect,
  asyncHandler(async (req, res) => {
    const _id = req.params;
    await Post.findByIdAndUpdate(_id, req.body);
    const editedPost = await Post.findById(_id);
    if (editedPost) {
      res.status(200).json(editedPost);
    } else {
      res.status(404);
      throw new Error("Cannot update the post");
    }
  })
);

router.delete(
  "/:_id",
  protect,
  asyncHandler(async (req, res) => {
    const _id = req.params;
    const deletedPost = await Post.findByIdAndDelete(_id);
    if (deletedPost) {
      res.status(200).json(deletedPost);
    } else {
      res.status(404);
      throw new Error("Cannot delete the post");
    }
  })
);

export default router;
