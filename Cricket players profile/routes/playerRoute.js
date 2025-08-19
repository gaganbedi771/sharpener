const express = require("express");
const playerController = require("../controllers/playerController");
const router = express.Router();

router.get("/", playerController.getAllPlayers);
router.get("/:id", playerController.getPlayerById);
router.post("/", playerController.addPlayer);
router.patch("/:id", playerController.editPlayerById);
router.delete("/:id", playerController.deletePlayerById);

module.exports = router;
