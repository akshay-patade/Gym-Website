const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const user = data.users;
const product = data.subscriptions;
const xss = require("xss");


// Buying Subscription
router.route("/").get(async (req, res) => {

    try {

        if (!req.session.userdata) {

            res.redirect("/login");
        }
        else {

            return res.status(200).render("subscriptions/buySubscriptions", {
                title: "Buy Subscriptions",
                user_header: true,
                user_footer: true,
                loggedIn: true,
                UserFullname: req.session.other.UserFullname,
                profileimage: req.session.other.profileimage,
            });
        }
    }
    catch (e) {

        return res.status(404).render("404");
    }
})

module.exports = router;

