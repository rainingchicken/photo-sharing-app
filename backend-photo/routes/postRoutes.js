import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const allPosts = await Post.find({});
    res.status(200).json(allPosts);
  })
);

router.get(
  "/:_id",
  asyncHandler(async (req, res) => {
    const _id = req.params;
    const aPost = await Post.findById(_id);
    res.status(200).json(aPost);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, image } = req.body;
    const createdPost = await Post.create({ title, image });
    res.status(200).json(createdPost);
  })
);

router.patch(
  "/:_id",
  asyncHandler(async (req, res) => {
    const _id = req.params;
    await Post.findByIdAndUpdate(_id, req.body);
    const editedPost = await Post.findById(_id);
    res.status(200).json(editedPost);
  })
);

router.delete(
  "/:_id",
  asyncHandler(async (req, res) => {
    const _id = req.params;
    const deletedPost = await Post.findByIdAndDelete(_id);
    res.status(200).json(deletedPost);
  })
);

export default router;
