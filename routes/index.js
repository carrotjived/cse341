const express = require("express");
const router = express();

// router.get("/", (req, res) => {
//   res.send("hello World");
// });

router.get("/contacts", require("./contacts"));

module.exports = router;
