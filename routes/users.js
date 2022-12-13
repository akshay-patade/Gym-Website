const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const product = data.products;

//const index = require("../data");
//const people = index.people;

router.route("/").get(async (req, res) => {
  //code here for GET

  //const products = await product.getAllProducts();

  res.render("index", {
    title: "Welcome",
    user_header: true,
    user_footer: true,
  });
});

router.route("/products").get(async (req, res) => {
  //code here for GET
  let products;
  try {
    products = await product.getAllProducts();
  }
  catch (e) {
    res.status(e.code).json(e.message);
  }
  return res.status(200).json(products);
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

//Filter the products by name
router.route("/product/:name").get(async (req, res) => {

  let products;
  try {

    let name = req.params.name;
    products = await getProductByName(name);
    res.status(200).json(products);
  }
  catch (e) {
    res.status(e.code).json({ error: e.message });
  }
  return products;
})

// Creating a route for blogs
router.route("/blog/:name").get(async (req, res) => {

  res.render("blog", {
    title: "Blog",
    user_header: false,
    user_footer: true,
  })
})

module.exports = router;
