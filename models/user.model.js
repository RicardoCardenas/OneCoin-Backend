const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["user", "admin"], default: "user" },
  bio: String,
  profileImage: String,
  coverImage: String,
  phone: String, // añadido
  rucEnterprise: String, // añadido

  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // amigos actuales
  friendsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // añadido: lista explícita de IDs

  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  settings: {
    notifications: { type: Boolean, default: true },
    privateAccount: { type: Boolean, default: false },
  },

  registrationDate: { type: Date, default: Date.now },
  lastLogin: Date,
});

module.exports = mongoose.model("User", UserSchema);
