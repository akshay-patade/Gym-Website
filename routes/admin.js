const express = require("express");
const router = express.Router();
const path = require("path");
//const index = require("../data");
//const people = index.people;

router.route("/admin").get(async (req, res) => {
  //code here for GET
  res.status(200).json({ error: "Website is working" });
});

module.exports = router;