// nimportiw model
const Project = require("../models/Project");

// nasn3ou machrou3 lay user m9ayed
exports.creerProjet = async (req, res) => {
  try {
    const { nom, description, statut } = req.body;

    if (!nom) {
      return res.status(400).json({ message: "Le nom du projet est requis" });
    }

 
    const projet = await Project.create({
      nom,
      description,
      statut,
      proprietaire: req.user.id,
    });

    res.status(201).json(projet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// manager khw ychouf les projets lkol
exports.tousLesProjets = async (req, res) => {
  try {
    const projets = await Project.find().populate("proprietaire", "nom login");
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// user ychouf ken les projets mte3ou
exports.mesProjets = async (req, res) => {
  try {
    const projets = await Project.find({ proprietaire: req.user.id });
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// nlawjou 3la projet bel ID
exports.unProjet = async (req, res) => {
  try {
    const projet = await Project.findById(req.params.id);
    if (!projet) {
      return res.status(404).json({ message: "Projet introuvable" });
    }
    res.json(projet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// modification ta3 projet ( propriétaire ou manager )
exports.modifierProjet = async (req, res) => {
  try {
    const projet = await Project.findById(req.params.id);
    if (!projet) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    //nverifiw moula lprojet
    const estProprietaire = projet.proprietaire.toString() === req.user.id;
    if (!estProprietaire && req.user.role !== "manager") {
      return res.status(403).json({ message: "Acces refuse" });
    }

    // nbadlou les champs lmawjoudin
    const { nom, description, statut } = req.body;
    if (nom !== undefined) projet.nom = nom;
    if (description !== undefined) projet.description = description;
    if (statut !== undefined) projet.statut = statut;

    await projet.save();
    res.json(projet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// nfas5ou projet ( propriétaire ou manager )
exports.supprimerProjet = async (req, res) => {
  try {
    const projet = await Project.findById(req.params.id);
    if (!projet) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    const estProprietaire = projet.proprietaire.toString() === req.user.id;
    if (!estProprietaire && req.user.role !== "manager") {
      return res.status(403).json({ message: "Acces refuse" });
    }

    await projet.deleteOne();
    res.json({ message: "Projet supprime" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};