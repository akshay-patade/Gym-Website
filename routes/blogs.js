const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const blogs = data.blogs;

// Create a route to get a blog by id
router.route("/:id").get(async (req, res) => {

    try {

        let id = req.params.id;
        //Validate the id
        let blogData = await blogs.getBlogById(id);
        res.status(200).render("blogs/blogData", {
            title: "Blogs",
            blog: blogData
        });
    }
    catch (e) {
        res.status(e.code).json(e.message);
    }
})


// Create a route to get all the blogs of a particular Category
router.route("/category/:id").get(async (req, res) => {

    try {
        let id = req.params.id;
        //Validate the id
        let blogsData = await blogs.getBlogByCategoryId(id);
        res.status(200).render("blogs/blogList", {
            title: "Blogs",
            blogs: blogsData
        });
    }
    catch (e) {
        res.status(e.code).json(e.message);
    }
})


module.exports = router;
