const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const blog_category = data.blogs;

router.route("/").get(async (req, res) => {
  //code here for GET

  //const products = await product.getAllProducts();

  //Get all the blogs category
  try {
    const blogCategoryId = await blog_category.getBlogCategory();
    res.status(200).render("index", {
      title: "Welcome",
      user_header: true,
      user_footer: true,
      blogCategoryId: blogCategoryId
    });
  }

  catch (e) {

    res.status(e.code).json(e.message);
  }



});

router.route("/login").get(async (req, res) => {
  //code here for GET
  res.status(200).render("login", {
    title: "Login",
    user_header: false,
    user_footer: true,
  });
});

router.route("/register").get(async (req, res) => {
  //code here for GET
  res.status(200).render("register", {
    title: "Register",
    user_header: false,
    user_footer: true,
  });
});




module.exports = router;
