// nsobou les config ta3 .env
require("dotenv").config();

// nimportiw lel bib
const express = require("express");
const mongoose = require("mongoose");

// creation ta3 l'application
const app = express();

// hedha bech serveur yefhem JSON eli yji f req.body
app.use(express.json());

// norbtou routes ta3 authentification
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

//norbtou routes mta3 les projets
const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);

// norbtou routes mta3 les tâches
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

// route nchoufou beha eli serveur ye5dem
app.get("/", (req, res) => {
  res.json({ message: "API Mini-Projet work" });
});

// na9raw port w lien base de données
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// nconnectiw b mongoDB w ki c bon n5admou serveur
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Le port est" + PORT);
    });
  })
  .catch((err) => {
    // ken saret mochkla n5arjou l'erreur
    console.error(" Probléme de connexion à MongoDB :", err.message);
  });