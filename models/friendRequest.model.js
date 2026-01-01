const mongoose = require("mongoose");

const FriendRequestSchema = new mongoose.Schema({
  accepted: { type: Boolean, default: false },

  userIdEmissor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  userIdReceiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FriendRequest", FriendRequestSchema);
