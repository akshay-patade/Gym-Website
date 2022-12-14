const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const product = data.products;

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
            message: "No Products Found. Sorry for the inconvenience. Please check after some time."
        })
    }
})

//Get the product by Id
router.route("/:id").get(async (req, res) => {



    try {

        //validating the id;
        let id = req.params.id;
        let product = await product.getProductById(id);
        res.status(200).render("product", {
            title: "Product",
            user_header: false,
            user_footer: false,
            product
        })
    }

    catch (e) {
        res.status(e.code).json(e.message);
    }
})

module.exports = router;