// نستوردو mongoose
const mongoose = require("mongoose");

// الـ schema متاع المشروع
const projectSchema = new mongoose.Schema({
  // اسم المشروع : لازم يكون موجود
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  // وصف المشروع
  description: {
    type: String,
    trim: true,
  },
  // صاحب المشروع : id متاع User (علاقة بين الـ collections)
  proprietaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // حالة المشروع : وحدة من هالقيم برك
  statut: {
    type: String,
    enum: ["en cours", "termine", "en pause"],
    default: "en cours",
  },
  // تاريخ الإنشاء
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

// نصدّرو الـ model
module.exports = mongoose.model("Project", projectSchema);