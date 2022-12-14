const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const blogs = data.blogs;

//Get the Blogs category 
router.route("/").get(async (req, res) => {
    try {

        let blogs_category = await blogs.getAllBlogCategories();
        return res.status(200).render("blogs/blogsCategory", {
            title: "Blog Category",
            blogs_category: blogs_category
        });
    }
    catch (e) {

        return res.status(e.code).render("blogs/blogsNotFound", {
            title: "Blogs Not Found"
        });
    }
})


// Create a route to get a blog by id
router.route("/:id").get(async (req, res) => {

    try {
        let id = req.params.id;
        //Validate the id
        let blogData = await blogs.getBlogById(id);


        res.status(200).render("blogs/blogsData", {
            title: blogData.name,
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
        //Get the blogCategory name
        let name = await blogs.getBlogCategoryName(blogsData[0].blog_category_id);
        res.status(200).render("blogs/blogsList", {
            title: name,
            blogs: blogsData
        });
    }
    catch (e) {
        res.status(404).render("blogs/blogNotFound", {
            title: "BlogNotfound",
        })
    }
})

module.exports = router;
