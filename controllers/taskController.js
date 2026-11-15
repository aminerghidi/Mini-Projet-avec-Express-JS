// nimportiw les models
const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");

// nasn3ou tâche jdida (ay user m9ayed)
exports.creerTache = async (req, res) => {
  try {
    const { titre, description, statut, deadline, projet } = req.body;

    if (!titre || !projet) {
      return res.status(400).json({ message: "titre et projet sont requis" });
    }

    // nverifiw ken projet existe
    const projetExiste = await Project.findById(projet);
    if (!projetExiste) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    // utilisateur assigné ma ne9rawhouch men body (manager khw y3ayen)
    const tache = await Task.create({ titre, description, statut, deadline, projet });
    res.status(201).json(tache);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// nlistiw les tâches m3a filtre, recherche w tri
exports.listerTaches = async (req, res) => {
  try {
    const { statut, projet, utilisateurAssigne, search, sort, order } = req.query;

    // objet filtre yet3ammar ken bel paramètres eli jew
    const filtre = {};
    if (statut) filtre.statut = statut;
    if (projet) filtre.projet = projet;
    if (utilisateurAssigne) filtre.utilisateurAssigne = utilisateurAssigne;

    // recherche texte f titre wela description ($regex, i = ma yfar9ch maj/min)
    if (search) {
      filtre.$or = [
        { titre: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // tri : les champs autorisé kahaw, sinon par défaut dateCreation
    const champsTri = ["deadline", "titre", "statut", "dateCreation"];
    const champ = champsTri.includes(sort) ? sort : "dateCreation";
    const sens = order === "desc" ? -1 : 1;

    const taches = await Task.find(filtre)
      .sort({ [champ]: sens })
      .populate("projet", "nom")
      .populate("utilisateurAssigne", "nom login");

    res.json(taches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// nbadlou tâche (statut, titre, description, deadline)
exports.modifierTache = async (req, res) => {
  try {
    const tache = await Task.findById(req.params.id);
    if (!tache) {
      return res.status(404).json({ message: "Tache introuvable" });
    }

    const { titre, description, statut, deadline } = req.body;
    if (titre !== undefined) tache.titre = titre;
    if (description !== undefined) tache.description = description;
    if (statut !== undefined) tache.statut = statut;
    if (deadline !== undefined) tache.deadline = deadline;

    // save() yverifi enum mta3 statut (todo/doing/done)
    await tache.save();
    res.json(tache);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// manager khw y3ayen tâche lel user
exports.affecterTache = async (req, res) => {
  try {
    const { utilisateurAssigne } = req.body;
    if (!utilisateurAssigne) {
      return res.status(400).json({ message: "utilisateurAssigne est requis" });
    }

    const user = await User.findById(utilisateurAssigne);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const tache = await Task.findById(req.params.id);
    if (!tache) {
      return res.status(404).json({ message: "Tache introuvable" });
    }

    tache.utilisateurAssigne = utilisateurAssigne;
    await tache.save();
    res.json(tache);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};