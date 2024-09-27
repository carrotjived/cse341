const router = require("express").Router();

const contactController = require("../controllers/contacts");

//Get all contact
router.get("/", contactController.getAll);

//Get one Contact by Id
router.get("/:id", contactController.getSingle);

//Create Contact
router.post("/", contactController.createContact);

//Put Contact
router.put("/:id", contactController.updateContact);

//Delete Contact
router.delete("/:id", contactController.deleteContact);

module.exports = router;
