const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const product = data.products;

//Get all the products
router.route("/products").get(async (req, res) => {
    //code here for GET
    console.log("I am getting hit");
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

module.exports = router;