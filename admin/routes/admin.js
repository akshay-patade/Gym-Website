const express = require("express");
const router = express.Router();
const path = require("path");
const { ObjectId } = require("mongodb");
const data = require("../data");
const users = data.users;

router.route("/").get(async (req, res) => {
    //code here for GET
    let count = await users.getDashboardCount();
    res.render(`admin/dashboard`, {
        count: count
    });
});
router.route("/product").post(async (req, res) => {
    //code here for GET
});

router.get("/login", async (req, res) => {
    res.render(`login/login`);
})
router.route("/login").post(async (req, res) => {
    //code here for GET
    try {
        let email = req.body.username;
        let password = req.body.password;
        let checkUser = await users.checkUser(email, password);
        let userId = ObjectId(checkUser._id).toString();
        req.session.userauth = { name: checkUser.first_name + ' ' + checkUser.last_name, email: checkUser.email, userId: userId, role: checkUser.role, mobile: checkUser.cell_no };
        // res.status(200).send(userId);
        res.redirect('/admin')

    } catch (e) {
        res.render(`login/login`, { err: e });
    }
});
router.post('/change-password', async (req, res) => {
    try {
        let userId = req.session.userauth.userId;
        let password = req.body.password;
        console.log(userId, password, '*--*-*')
        let updatedUser = await users.changeAdminPassword(userId, password);
        res.redirect('/admin')
    }
    catch (e) {
        //res.render(`login/login`, { err: e });
        console.log(e)
        res.status(500).render(`admin/profile`, { err: e });
    }
});

router.get('/all-user', async (req, res) => {
    try {
        let allUser = await users.getAllUser();
        res.status(200).render(`user/list`, { allUser: allUser });
    }
    catch (e) {
        res.status(500).render(`user/list`, { err: e });
    }
});

router.route("/change-status/:id").patch(async (req, res) => {
    try {
        let userId = req.params.id;
        let status = req.body.status;
        let user = await users.updateUserStatus(status, userId);

        res.status(200).send(user);
    }
    catch (e) {
        res.status(500).send(e);
    }
});

router.get('/logout', async (req, res) => {
    req.session.destroy(function (err) {
        console.log(err)
    })
    res.redirect('/admin/login');
});


router.get('/profile', async (req, res) => {
    let data = req.session.userauth;
    res.render('admin/profile',{userDetails:data});
});

module.exports = router;
