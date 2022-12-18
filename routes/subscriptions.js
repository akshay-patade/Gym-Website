const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const users = data.users;
const subscriptions = data.subscriptions;
const xss = require("xss");


// Buying Subscription
router.route("/").get(async (req, res) => {

    try {

        if (!req.session.userdata) {

            res.redirect("/login");
        }
        else {

            //Get all the user Info and subscription info
            let userInfo = await users.getUserById(req.session.userdata.user_id);
            let subscriptionInfo = await subscriptions.getAllSubscriptionPlans();

            return res.status(200).render("subscriptions/buySubscriptions", {
                title: "Buy Subscriptions",
                user_header: true,
                user_footer: true,
                loggedIn: true,
                UserFullname: req.session.other.UserFullname,
                profileimage: req.session.other.profileimage,
                userInfo: userInfo,
                subscriptionInfo: subscriptionInfo
            });
        }
    }
    catch (e) {

        return res.status(404).render("404");
    }
})

module.exports = router;

