const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const helper = require("../helpers");
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

router
  .route("/login")
  .get(async (req, res) => {
    //code here for GET
    res.status(200).render("login", {
      title: "Login",
      user_header: true,
      user_footer: true,
    });
  })
  .post(async (req, res) => {
    // if (req.session.user) {
    //   return res.redirect("/dashboard");
    // }

    const userPostData = req.body;

    try {
      if (!userPostData.email || !userPostData.password)
        throw "Username and Password Must be supplied";

      helper.checkEmail(userPostData.email);
      helper.checkPassword(userPostData.password);
    } catch (e) {
      res.status(e.code).render("login", {
        error: e.message,
        hasErrors: true,
        title: "Login",
        user_header: true,
        user_footer: true,
      });
      return;
    }

    try {
      userPostData.email = userPostData.email.trim();
      const { email, password } = userPostData;

      const ResultStatus = await users.checkUser(email, password);
      // console.log(ResultStatus.user_id);
      if (ResultStatus.authenticatedUser === true) {
        req.session.userdata = {
          email: userPostData.email,
          user_id: ResultStatus.user_id,
          name: ResultStatus.name,
        };
        console.log(req.session.userdata);
        // req.session.user_id = ResultStatus.user_id;
        // res.redirect("/dashboard");
        res.status(200).render("dashboard", {
          title: "Dashboard",
          user_header: true,
          user_footer: true,
        });
      }
    } catch (e) {
      if (e == "No User found!" || e == "Wrong Password! Try Again!") {
        res.status(404).render("login", {
          error: e,
          hasErrors: true,
          title: "Login",
          user_header: true,
          user_footer: true,
        });
      } else {
        res.status(500).json({ error: e.message });
      }
      return;
    }
  });

router
  .route("/register")
  .get(async (req, res) => {
    //code here for GET
    res.status(200).render("register", {
      title: "Register",
      user_header: true,
      user_footer: true,
    });
  })
  .post(async (req, res) => {
    const group_id = await users.getUserGroupByName("user");

    const userPostData = req.body;

    // try {
    //   if (!userPostData.usernameInput || !userPostData.passwordInput)
    //     throw "Username and Password Must be supplied";
    //   validation.CheckUsername(userPostData.usernameInput);
    //   validation.CheckPassword(userPostData.passwordInput);
    // } catch (e) {
    //   res.status(400).render("userRegister", {
    //     error: e,
    //     hasErrors: true,
    //     title: "User Register",
    //   });
    //   return;
    // }

    try {
      userPostData.firstname = userPostData.firstname.trim();
      userPostData.lastname = userPostData.lastname.trim();
      userPostData.address = userPostData.address.trim();
      userPostData.email = userPostData.email.trim();

      const {
        firstname,
        lastname,
        gender,
        dob,
        address,
        zipcode,
        cell,
        email,
        password,
      } = userPostData;

      const ResultStatus = await users.createUser(
        firstname,
        lastname,
        gender,
        dob,
        address,
        zipcode,
        cell,
        email,
        password,
        group_id._id
      );

      if (ResultStatus.insertedUser === true) {
        // res.redirect("/");
        res.status(200).render("userRegisterSuccess", {
          hasErrors: false,
          title: "User Registered Successfully",
          user_header: true,
          user_footer: true,
        });
      }
    } catch (e) {
      if (e == "Username Already Exist!") {
        res.status(400).render("register", {
          AlreadyExist: true,
          title: "Register",
          user_header: true,
          user_footer: true,
        });
      } else if (e.code === 500) {
        res.status(e.code).render("Error", {
          hasErrors: true,
          error: "Internal Server Error",
          title: "Error",
          user_header: true,
          user_footer: true,
        });
      } else {
        res.status(400).render("register", {
          AlreadyExist: false,
          BadInput: true,
          error: e.message,
          title: "Register",
          user_header: true,
          user_footer: true,
        });
      }
      return;
    }
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
    try {
      if (!data.email) {
        throw "No email id Provided";
      }
      let UserData = await users.getUserByEmail(data.email);
      if (UserData !== null) {
        //code here for GET
        res.status(200).render("verificationSuccess", {
          title: "Verification Success",
          user_header: true,
          user_footer: true,
        });
      } else {
        res.status(404).render("UserNotFound", {
          title: "User Not Found",
          user_header: true,
          user_footer: true,
        });
      }
    } catch (e) {
      res.status(500).render("forgotPassword", {
        title: "Forgot Password",
        user_header: true,
        user_footer: true,
      });
    }
  });

module.exports = router;
