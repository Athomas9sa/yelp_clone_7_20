const express = require("express"),
  router = express.Router();

/* GET home page. */
router.get("/", async function (req, res) {
  res.redirect('/restaurants')
});

module.exports = router;
