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

// manager khw ychouf tous les projets m3a filtre, recherche w tri
exports.tousLesProjets = async (req, res) => {
  try {
    const { statut, search, sort, order } = req.query;

    // objet filtre yet3ammar ken bel paramètres eli jew
    const filtre = {};
    if (statut) filtre.statut = statut;

    // recherche texte f nom wela description
    if (search) {
      filtre.$or = [
        { nom: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // tri : ken bel champs eli autorisé, sinon dateCreation
    const champsTri = ["nom", "statut", "dateCreation"];
    const champ = champsTri.includes(sort) ? sort : "dateCreation";
    const sens = order === "desc" ? -1 : 1;

    const projets = await Project.find(filtre)
      .sort({ [champ]: sens })
      .populate("proprietaire", "nom login");
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// user ychouf ken projets mte3ou m3a filtre w tri
exports.mesProjets = async (req, res) => {
  try {
    const { statut, search, sort, order } = req.query;

    // l'id yji men token
    const filtre = { proprietaire: req.user.id };
    if (statut) filtre.statut = statut;

    if (search) {
      filtre.$or = [
        { nom: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const champsTri = ["nom", "statut", "dateCreation"];
    const champ = champsTri.includes(sort) ? sort : "dateCreation";
    const sens = order === "desc" ? -1 : 1;

    const projets = await Project.find(filtre).sort({ [champ]: sens });
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