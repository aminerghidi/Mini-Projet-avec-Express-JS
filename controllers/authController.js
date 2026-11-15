// nimportiw les bib wel model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// n9aydou utilisateur jdid
exports.register = async (req, res) => {
  try {
    const { nom, login, motDePasse, role } = req.body;

    // nverifiw les champs
    if (!nom || !login || !motDePasse) {
      return res.status(400).json({ message: "nom, login et motDePasse sont requis" });
    }

    // nchoufou ken login existe deja
    const existant = await User.findOne({ login });
    if (existant) {
      return res.status(400).json({ message: "Ce login existe deja" });
    }

    // hash du mdp 9bal ma nsajlouh
    const motDePasseHache = await bcrypt.hash(motDePasse, 10);

    // nasn3ou user w nsajlouh
    const user = await User.create({
      nom,
      login,
      motDePasse: motDePasseHache,
      role,
    });

    // naffichiw luser sans mdp
    res.status(201).json({
      message: "Utilisateur cree",
      user: { id: user._id, nom: user.nom, login: user.login, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { login, motDePasse } = req.body;

    // nlawjou 3al user bel login
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(401).json({ message: "Login ou mot de passe incorrect" });
    }

    // comparaison du mdp m3a mdp haché
    const valide = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!valide) {
      return res.status(401).json({ message: "Login ou mot de passe incorrect" });
    }

    // nasn3ou token fih id w role
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