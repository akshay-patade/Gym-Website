const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const product = data.products;
const xss = require("xss");

//Get all the products
router.route("/").get(async (req, res) => {

    try {
        //validating the id;
        let allProducts = await product.getAllProducts();
        res.status(200).render("products/products", {
            title: "Products",
            products: allProducts
        })
    }

    catch (e) {
        res.status(e.code).render("products/productsNotFound", {
            title: "Not found",
            message: e.message
        })
    }
})

// Get all the products by Name
router.route("/searchByName").post(async (req, res) => {

    try {

        let name = xss(req.body.search);
        //Checking to validate the name

        let productByName = await product.getProductByName(name);
        res.status(200).render("products/products", {

            title: "Product Found",
            products: productByName
        })
    }
    catch (e) {
        res.status(e.code).render("products/productsNotFound", {
            title: "Not found",
            message: e.message
        })
    }
})


module.exports = router;