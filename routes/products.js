const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const product = data.products;

//Get the product by Id
router.route("/:id").get(async (req, res) => {

    console.log("It is getting hit");

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