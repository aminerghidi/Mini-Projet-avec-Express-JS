// nimportiw express w controller w middlewares
const express = require("express");
const {
  creerProjet,
  tousLesProjets,
  mesProjets,
  unProjet,
  modifierProjet,
  supprimerProjet,
} = require("../controllers/projectController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST /api/projects : ay user enregistré
router.post("/", authenticate, creerProjet);

// GET /api/projects : tout les projets
router.get("/", authenticate, authorize("manager"), tousLesProjets);

// GET /api/projects/mine : mes projets ( par id )
router.get("/mine", authenticate, mesProjets);

// GET /api/projects/:id
router.get("/:id", authenticate, unProjet);

// PUT /api/projects/:id
router.put("/:id", authenticate, modifierProjet);

// DELETE /api/projects/:id
router.delete("/:id", authenticate, supprimerProjet);

module.exports = router;