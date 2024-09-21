const router = require("express").Router();

// router.get("/", (req, res) => {
//   res.send("hello World");
// });

router.get("/contacts", require("./contacts"));

module.exports = router;
