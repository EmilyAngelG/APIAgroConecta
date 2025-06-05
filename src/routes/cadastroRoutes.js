const express = require("express");
const router = express.Router();
const cadastrosController = require("../controllers/cadastrosController");

router.get("/", cadastrosController.listAll);
router.get("/:id", cadastrosController.getId);
router.post("/", cadastrosController.create);
router.put("/:id", cadastrosController.update);
router.delete("/:id", cadastrosController.delete);

module.exports = router;
