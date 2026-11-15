// nimportiw express w controller w middlewares
const express = require("express");
const {
  creerTache,
  listerTaches,
  modifierTache,
  affecterTache,
} = require("../controllers/taskController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST /api/tasks : ay user m9ayed
router.post("/", authenticate, creerTache);

// GET /api/tasks
router.get("/", authenticate, listerTaches);

// PUT /api/tasks/:id : modification (statut...)
router.put("/:id", authenticate, modifierTache);

// PUT /api/tasks/:id/assign : manager khw
router.put("/:id/assign", authenticate, authorize("manager"), affecterTache);

module.exports = router;