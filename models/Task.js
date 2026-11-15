// nimportiw mongoose
const mongoose = require("mongoose");

// schema mta3 tâche
const taskSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  statut: {
    type: String,
    enum: ["todo", "doing", "done"],
    default: "todo",
  },
  deadline: {
    type: Date,
  },
  projet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  utilisateurAssigne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

// nexportiw model
module.exports = mongoose.model("Task", taskSchema);