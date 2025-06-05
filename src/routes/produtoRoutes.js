const express = require("express");
const router = express.Router();
const produtosController = require("../controllers/produtosController");

router.get("/", produtosController.listAll);
router.post("/filtro", produtosController.listFilter);
router.get("/:id", produtosController.getId);
router.post("/", produtosController.create);
router.put("/:id", produtosController.update);
router.delete("/:id", produtosController.delete);

module.exports = router;
