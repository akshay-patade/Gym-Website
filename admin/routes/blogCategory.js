const express = require("express");
const router = express.Router();
const path = require("path");
const data = require('../data');
const blogCategory = data.blogcategory;

// Creating a route for blogs

router.route("/").post(async (req, res) => {
    try {
        let name = req.body.name;
        let description = req.body.description;
        let blogCategorys = await blogCategory.createBlogCategory(name,description);
        // res.status(200).send(blogCategorys);
        res.redirect('/admin/blogCategorys')

    }
    catch (e) {
        res.status(500).render(`blogCategory/add`, { err: e });
        // res.status(500).send(e);
    }
});

router.route("/").get(async (req, res) => {
    try {
        let blogCategorys = await blogCategory.getAllBlogCategory();
        // res.status(200).send(blogCategorys);
        res.render(`blogCategory/list`, { blogCategorys: blogCategorys });
    }
    catch (e) {
        res.status(500).render(`blogCategory/list`, { err: e });
    }
   

})

router.route("/delete/:id").get(async (req, res) => {
    try {
        console.log("test")
        let blog_Category_Id= req.params.id;
        let blogCategorys = await blogCategory.deleteBlogCategory(blog_Category_Id);
        // res.status(200).send(blogCategorys);
        res.redirect('/admin/blogCategorys')
    }
    catch (e) {
        res.status(500).send(e);
    }
   

})

router.route("/add-form").get(async (req, res) => {
    res.render(`blogCategory/add`);   
})

router.route("/update/:id").post(async (req, res) => {
    try {
        let blog_Category_Id= req.params.id;
        let name = req.body.name;
        let description = req.body.description;
        let blogCategorys = await blogCategory.updateBlogCategory(name,description,blog_Category_Id);

        // res.status(200).send(blogCategorys);
        res.redirect('/admin/blogCategorys');
    }
    catch (e) {
        console.log(e)
        // res.status(500).send(e);
    res.render(`blogCategory/edit`, { err:e });   

    }
});
router.route("/:id").get(async (req, res) => {
    let blogCategorys = await blogCategory.getBlogCategoryById(req.params.id);
    // res.send(blogCategorys);
    res.render(`blogCategory/edit`, { blogCategorys: blogCategorys });   
})



module.exports = router;


