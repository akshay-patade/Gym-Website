const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const { ObjectId } = require("mongodb");
const users = data.users;

router.route("/").get(async (req, res) => {
    //code here for GET

    //const products = await product.getAllProducts();

    res.render("index", {
        title: "Welcome",
        user_header: true,
        user_footer: true,
    });
});

// router.get("/login", async(req, res) => {
//   res.render(`login/login`);
// })

router.route("/login").get(async (req, res) => {
    //code here for GET
    try {
        let email = req.body.username;
        let password = req.body.password;
        let checkUser = await users.checkUser(email, password);
        console.log(checkUser);
        let userId = ObjectId(checkUser._id).toString();
        req.session.userauth = { name: checkUser.firstName + ' ' + checkUser.lastName, email: checkUser.email, user_id: userId, role: checkUser.role };
        // res.redirect('/');
    } catch (e) {
        res.render(`login/login`, { err: e });
    }
    // res.render("login", {
    //   title: "Login",
    //   user_header: false,
    //   user_footer: true,
    // });
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
