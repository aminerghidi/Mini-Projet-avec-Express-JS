// نستوردو mongoose
const mongoose = require("mongoose");

// الـ schema متاع الـ tâche
const taskSchema = new mongoose.Schema({
  // عنوان الـ tâche : لازم يكون موجود
  titre: {
    type: String,
    required: true,
    trim: true,
  },
  // وصف الـ tâche
  description: {
    type: String,
    trim: true,
  },
  // الحالة : todo ولا doing ولا done برك، و الافتراضي todo
  statut: {
    type: String,
    enum: ["todo", "doing", "done"],
    default: "todo",
  },
  // آخر أجل لإنجاز الـ tâche
  deadline: {
    type: Date,
  },
  // المشروع اللي تنتمي ليه الـ tâche : id متاع Project
  projet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  // المستخدم المعيّن : id متاع User، مش لازم (المانجر برك اللي يعيّن)
  utilisateurAssigne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // تاريخ الإنشاء
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

// نصدّرو الـ model
module.exports = mongoose.model("Task", taskSchema);