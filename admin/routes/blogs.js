const express = require("express");
const router = express.Router();
const path = require("path");
const data = require('../data');
const blogs = data.blogs;
const blogCategory = data.blogcategory;

// Creating a route for blogs

router.route("/").post(async (req, res) => {
    try {
        // let user_id = req.body.user_id;
        let user_id = req.session.userauth.userId
        let blog_name = req.body.blog_name;
        let blog_category_id = req.body.blog_category_id;
        let description = req.body.description;
        let blog = await blogs.createBlog(user_id, blog_name, blog_category_id, description);

        // res.status(200).send(blog);
        res.redirect(`/admin/blogs`);
    }
    catch (e) {
        res.render(`blog/add`, { err: e });
        // res.status(500).send(e);
    }
});
router.route("/updpate/:id").post(async (req, res) => {
    try {
        let blog_id = req.params.id;
        let user_id = req.body.user_id;
        let blog_name = req.body.blog_name;
        let blog_category_id = req.body.blog_category_id;
        let description = req.body.description;
        let blog = await blogs.updateBlog(user_id, blog_name, blog_category_id, description, blog_id);

        // res.status(200).send(blog);
        res.redirect('/admin/blogs')
    }
    catch (e) {
        res.render(`blog/edit`, { err: e });
        // res.status(500).send(e);
    }
});
router.route("/change-status/:id").patch(async (req, res) => {
    try {
        let blog_id = req.params.id;
        let status = req.body.status;
        let blog = await blogs.updateBlogStatus(status, blog_id);

        res.status(200).send(blog);
    }
    catch (e) {
        console.log(e)
    }
});
router.route("/").get(async (req, res) => {


    try {
        let blog = await blogs.getallBlog();

        res.render(`blog/list`, { blog: blog });
    }
    catch (e) {
        res.status(500).render(`blog/list`, { err: e });
    }


})
router.route("/add-form").get(async (req, res) => {
    let blogCategorys = await blogCategory.getAllBlogCategory();
    res.render(`blog/add`, { blogCategory: blogCategorys });   
})
router.route("/:id").get(async (req, res) => {
    let blog = await blogs.getBlogById(req.params.id);
    let blogCategorys = await blogCategory.getAllBlogCategory();
    res.render(`blog/edit`, { blog: blog, blogCategory: blogCategorys });
})

module.exports = router;


