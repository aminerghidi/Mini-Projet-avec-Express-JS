// nimportiw mongoose 
const mongoose = require("mongoose");

// schema ta3 user
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // MDP bcrypt
  motDePasse: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "manager"],
    default: "user",
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

// nexportiw model
module.exports = mongoose.model("User", userSchema);