// نحمّلو المتغيرات متاع ملف .env
require("dotenv").config();

// نستوردو المكتبات اللي نحتاجوهم
const express = require("express");
const mongoose = require("mongoose");

// نصنعو التطبيق متاعنا
const app = express();

// هذا باش السيرفر يفهم الـ JSON اللي يجي في req.body
app.use(express.json());

// نربطو الـ routes متاع المصادقة
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// route تجريبية باش نتأكدو السيرفر يخدم
app.get("/", (req, res) => {
  res.json({ message: "API Mini-Projet تخدم مليح" });
});

// نقراو البورت و رابط قاعدة البيانات من .env
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// نتصلو بـ MongoDB، و كي ينجح الاتصال نشعلو السيرفر
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("تم الاتصال بـ MongoDB");
    app.listen(PORT, () => {
      console.log("السيرفر يخدم على البورت " + PORT);
    });
  })
  .catch((err) => {
    // كان صار مشكل في الاتصال نطبعو الغلطة
    console.error("مشكل في الاتصال بـ MongoDB :", err.message);
  });