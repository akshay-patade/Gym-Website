const express = require("express");
const router = express.Router();
const path = require("path");
//const index = require("../data");
//const people = index.people;

router.route("/").get(async (req, res) => {
  //code here for GET
  res.status(200).json({ error: "Website is working" });

});

router.route("/product").post(async (req, res) => {
  //code here for GET
});

module.exports = router;
