const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const blogs = data.blogs;


// Create a route to get all the blogs of a particular Category
router.route("/category/:id").get(async (req, res) => {

    try {

        let id = req.params.id;
        //Validate the id


        let blogsData = await blogs.getBlogByCategoryId(id);
        res.status(200).render("blog", {
            blogs: blogsData
        });

    }
    catch (e) {
        res.status(e.code).json(e.message);
    }
})

module.exports = router;
