const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      author: req.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username profileImage");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId }).populate("author", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(post, req.body, { updatedAt: new Date() });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLikes = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user.id;

    const index = post.likes.indexOf(userId);
    if (index === -1) {
      // No ha dado like -> agregar
      post.likes.push(userId);
    } else {
      // Ya dio like -> quitar
      post.likes.splice(index, 1);
    }

    post.likesCount = post.likes.length;
    await post.save();

    res.json({
      message: index === -1 ? "Like agregado" : "Like eliminado",
      likesCount: post.likesCount,
      likes: post.likes,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLikes = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("likes", "username email");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post.likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
