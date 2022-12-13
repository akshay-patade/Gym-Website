const express = require("express");
const router = express.Router();
const path = require("path");


// Creating a route for blogs
router.route("/:id").get(async (req, res) => {

    res.render("blog", {
        title: "Blog",
        user_header: false,
        user_footer: true,
    })
})

module.exports = router;


