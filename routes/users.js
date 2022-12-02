const express = require("express");
const router = express.Router();
const path = require("path");
//const index = require("../data");
//const people = index.people;

router.route("/").get(async (req, res) => {
  //code here for GET
  res.sendFile(path.resolve("views/homepage.html"));
});

module.exports = router;
