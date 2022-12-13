const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const product = data.products;
const blog = data.blogs;

//Get all the products
router.route("/products").get(async (req, res) => {
    //code here for GET
    let products;
    try {
        products = await product.getAllProducts();
    }
    catch (e) {
        res.status(e.code).json(e.message);
    }
    return res.status(200).json(products);
});

//Get the product by Id
router.route("/products/:id").get(async (req, res) => {

    res.render("product", {
        title: "Product",
        user_header: false,
        user_footer: true,
    })
    return products;
})

//Get the Blogs category 
router.route("/blogs/category").get(async (req, res) => {

    let blogs_category;
    try {
        blogs_category = await blog.getBlogCategory();
        return res.status(200).json(blogs_category);
    }
    catch (e) {

        return res.status(e.code).json(e.message);
    }
})

module.exports = router;