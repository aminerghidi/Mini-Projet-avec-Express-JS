// نستوردو المكتبات و الـ model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// تسجيل مستخدم جديد
exports.register = async (req, res) => {
  try {
    const { nom, login, motDePasse, role } = req.body;

    // نتأكدو الحقول الأساسية موجودة
    if (!nom || !login || !motDePasse) {
      return res.status(400).json({ message: "nom, login et motDePasse sont requis" });
    }

    // نشوفو كان الـ login مستعمل من قبل
    const existant = await User.findOne({ login });
    if (existant) {
      return res.status(400).json({ message: "Ce login existe deja" });
    }

    // نشفرو كلمة السر قبل ما نخزنوها
    const motDePasseHache = await bcrypt.hash(motDePasse, 10);

    // نصنعو المستخدم و نخزنوه
    const user = await User.create({
      nom,
      login,
      motDePasse: motDePasseHache,
      role,
    });

    // نرجعو الجواب بلا كلمة السر
    res.status(201).json({
      message: "Utilisateur cree",
      user: { id: user._id, nom: user.nom, login: user.login, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { login, motDePasse } = req.body;

    // نلقاو المستخدم بالـ login
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(401).json({ message: "Login ou mot de passe incorrect" });
    }

    // نقارنو كلمة السر مع الـ hash
    const valide = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!valide) {
      return res.status(401).json({ message: "Login ou mot de passe incorrect" });
    }

    // نصنعو الـ token فيه id و role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};