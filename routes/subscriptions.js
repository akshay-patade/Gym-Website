const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const users = data.users;
const members = data.members;
const subscriptions = data.subscriptions;
const memberSubscriptions = data.memberSubscriptions;
const xss = require("xss");
const { member } = require("../config/mongoCollections");


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

// Check Discount
router.route("/checkDiscount").post(async (req, res) => {

    try {

        let userId = req.session.userdata.user_id;
        let subscriptionPlanId = xss(req.body.subscriptionPlanId);

        let result = await memberSubscriptions.checkIfUserPresent(userId);
        let subscriptionInfo = await subscriptions.getSubscriptionPlanById(subscriptionPlanId);

        return res.status(200).json({
            result: result,
            actualPrice: subscriptionInfo.membership_amount
        })
    }
    catch (e) {

        return res.status(404).render("404");
    }
})

//Buy Membership
router.route("/buyMembership").post(async (req, res) => {

    try {

        let subscriptionPlanId = xss(req.body.subscriptionPlanId);

        let userId = req.session.userdata.user_id;

        //Create a member and store its member object
        let newMember = await members.createMember(userId);

        //Placing an order of membersubscription. If user is already a member and the duration is not completed we will store false
        let buyingSubscription = await memberSubscriptions.buyingMembership(newMember._id, userId, subscriptionPlanId);

        let url;
        if (buyingSubscription) {

            url = "/subscriptions/success";
        }

        else {
            await members.removeMemberById(newMember._id.toString());
            url = "alert";
        }

        return res.status(200).json({
            result: buyingSubscription,
            url: url
        });
    }
    catch (e) {

        return res.status(404).render("404");
    }
})

router.route("/success").get(async (req, res) => {

    res.status(200).render("subscriptions/subscriptionSuccess", {
        title: "Congratulations"
    })
})



module.exports = router;

