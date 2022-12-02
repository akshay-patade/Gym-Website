const express = require("express");
const router = express.Router();
const path = require("path");
//const index = require("../data");
//const people = index.people;

router.route("/").get(async (req, res) => {
  //code here for GET
  res.render("home/home", {
    title: "Welcome",
    curr_admin: true,
    footer: "<h1>I am footer</h1>",
    header: "<h1>I am header</h1>",
  });
});

module.exports = router;
