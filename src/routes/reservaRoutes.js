const express = require("express");
const router = express.Router();
const reservasController = require("../controllers/reservasController");

router.get("/", reservasController.listAll);
router.post("/filtro", reservasController.listFilter);
router.get("/:id", reservasController.getId);
router.post("/", reservasController.create);
router.put("/:id", reservasController.update);
router.delete("/:id", reservasController.delete);
router.put("/addAvaliacao/:id", reservasController.addAvaliacao);

module.exports = router;
