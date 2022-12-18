const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");

router.route("/").get(async (req, res) => {
  //code here for GET

  //const products = await product.getAllProducts();

  res.render("index", {
    title: "Welcome",
    user_header: true,
    user_footer: true,
  });
});

router.route("/login").get(async (req, res) => {
  //code here for GET
  res.render("login", {
    title: "Login",
    user_header: false,
    user_footer: true,
  });
});

router.route("/register").get(async (req, res) => {
  //code here for GET
  res.render("register", {
    title: "Register",
    user_header: false,
    user_footer: true,
  });
});



// Creating a route for blogs
router.route("/blog/:name").get(async (req, res) => {

  res.render("blog", {
    title: "Blog",
    user_header: false,
    user_footer: true,
  })
})

module.exports = router;
