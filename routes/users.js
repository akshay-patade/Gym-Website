const express = require("express");
const router = express.Router();
const path = require("path");
//const index = require("../data");
//const people = index.people;

router.route("/").get(async (req, res) => {
  //code here for GET
  res.render("index", {
    title: "Welcome",
    user_header: true,
    user_footer: true,
  });
});

module.exports = router;
