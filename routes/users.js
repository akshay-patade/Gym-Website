const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const product = data.products;

//const index = require("../data");
//const people = index.people;

router.route("/").get(async (req, res) => {
  //code here for GET

  const products = await product.getAllProducts();

  res.render("index", {
    title: "Welcome",
    user_header: true,
    user_footer: true,
    product_data: products,
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

router.route("/product/:id").get(async (req, res) => {
  //code here for GET
  res.render("product", {
    title: "Product",
    user_header: false,
    user_footer: true,
  });
});

module.exports = router;
