import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const Post = mongoose.model("Post", ingredientSchema);
export default Post;
