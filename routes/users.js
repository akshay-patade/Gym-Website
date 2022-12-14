const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const blog_category = data.blogs;
const users = data.users;

router.route("/").get(async (req, res) => {
  //code here for GET

  //const products = await product.getAllProducts();

  //Get all the blogs category
  try {
    const blogCategoryId = await blog_category.getAllBlogCategories();
    res.status(200).render("index", {
      title: "Welcome",
      user_header: true,
      user_footer: true,
      blogCategoryId: blogCategoryId,
    });
  } catch (e) {
    res.status(e.code).json(e.message);
  }
});

router.route("/login").get(async (req, res) => {
  //code here for GET
  res.status(200).render("login", {
    title: "Login",
    user_header: true,
    user_footer: true,
  });
});

router.route("/register").get(async (req, res) => {
  //code here for GET
  res.status(200).render("register", {
    title: "Register",
    user_header: true,
    user_footer: true,
  });
});

router
  .route("/forgotPassword")
  .get(async (req, res) => {
    //code here for GET
    res.status(200).render("forgotPassword", {
      title: "Forgot Password",
      user_header: true,
      user_footer: true,
    });
  })
  .post(async (req, res) => {
    const data = req.body;
    // try {
    //   if (!data.email) {
    //     throw "No email id Provided";
    //   }
    //   UserData = await users.getUserByEmail(data.email);
    //   if (UserData) {
    //code here for GET
    res.status(200).render("confirmLinkSent", {
      title: "confirmation",
      user_header: true,
      user_footer: true,
      done,
    });
    //   }
    // } catch (error) {
    //   res.status(404).render("UserNotFound", {
    //     title: "User Not Found",
    //   });
    // }
  });

module.exports = router;
