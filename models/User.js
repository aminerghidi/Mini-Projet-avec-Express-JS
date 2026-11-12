// نستوردو mongoose باش نعرفو الـ schema
const mongoose = require("mongoose");

// الـ schema متاع المستخدم
const userSchema = new mongoose.Schema({
  // الاسم : لازم يكون موجود
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  // login : لازم يكون موجود و ما يتعاودش
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // كلمة السر : تتخزن مشفرة بـ bcrypt
  motDePasse: {
    type: String,
    required: true,
  },
  // الدور : user ولا manager، و الافتراضي user
  role: {
    type: String,
    enum: ["user", "manager"],
    default: "user",
  },
  // تاريخ الإنشاء : ينحط وحدو
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

// نصدّرو الـ model باش نستعملوه في ملفات أخرى
module.exports = mongoose.model("User", userSchema);