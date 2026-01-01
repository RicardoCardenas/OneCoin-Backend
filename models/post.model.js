const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  images: [String],
  tags: [String],

  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likesCount: { type: Number, default: 0 },

  commentsCount: { type: Number, default: 0 },

  privacy: {
    type: String,
    enum: ["public", "friends", "private"],
    default: "public",
  },

  location: {
    name: String,
    coordinates: [Number],
  },
});

module.exports = mongoose.model("Post", PostSchema);
