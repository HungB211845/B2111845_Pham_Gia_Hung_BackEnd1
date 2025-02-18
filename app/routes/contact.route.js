const express = require("express");
const contact = require("../controllers/contact.controller");

const router = express.Router();

router.post("/", contact.create);
router.get("/", contact.findAll);
router.get("/favorite", contact.findAllFavorite);
router.get("/:id", contact.findOne);
router.put("/:id", contact.update);
router.delete("/:id", contact.delete);
router.delete("/", contact.deleteAll);

module.exports = router;
