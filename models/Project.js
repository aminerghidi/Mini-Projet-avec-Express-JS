// nimportiw mongoose
const mongoose = require("mongoose");

// schema mta3 projet
const projectSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  proprietaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  statut: {
    type: String,
    enum: ["en cours", "termine", "en pause"],
    default: "en cours",
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

// nexportiw model
module.exports = mongoose.model("Project", projectSchema);