const express = require("express");
const router = express.Router();
const path = require("path");
const data = require('../data');
const subscription = data.subscription;

// Creating a route for blogs

router.route("/").post(async (req, res) => {
    try {
        let name = req.body.name;
        let membership_amount = Number(req.body.membership_amount);
        let duration = req.body.duration;
        let description = req.body.description;
        let subscriptions = await subscription.createSubscriptionPlan({ description: description, name: name, membership_amount: membership_amount, duration: duration });
        res.redirect('/admin/subscription');
    }
    catch (e) {
        console.log(e)
        res.render(`subscription/add`, { err: e });

    }
});
router.route("/update/:id").post(async (req, res) => {
    try {
        let plan_id = req.params.id;
        let name = req.body.name;
        let membership_amount = Number(req.body.membership_amount);
        let duration = req.body.duration;
        let description = req.body.description;
        let subscriptions = await subscription.updateSubscriptionPlan({ description: description, name: name, membership_amount: membership_amount, duration: duration, plan_id: plan_id });

        res.redirect('/admin/subscription');
    }
    catch (e) {
        res.render(`subscription/edit`, { err: e });
    }
});
router.route("/add-form").get(async (req, res) => {
    res.render(`subscription/add`);
})
router.route("/change-status/:id").patch(async (req, res) => {
    try {
        let plan_id = req.params.id;
        let status = req.body.status;
        let subscriptions = await subscription.updatesubscriptionPlanStatus(status, plan_id);
        res.status(200).send(subscriptions);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
router.route("/").get(async (req, res) => {

    try {
        let subscriptions = await subscription.getallsubscriptionPlan();

        res.render(`subscription/list`, { subscriptions: subscriptions });
    }
    catch (e) {
        res.status(500).render(`subscription/list`, { err: e });
    }


})
router.route("/:id").get(async (req, res) => {
    let subscriptions = await subscription.gesubscriptionPlanId(req.params.id);
    res.render(`subscription/edit`, { subscriptions: subscriptions });

    // res.send(subscriptions);

})

module.exports = router;


