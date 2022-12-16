const express = require("express");
const router = express.Router();
const path = require("path");
const data = require("../data");
const product = data.products;
const user = data.users;
const xss = require("xss");
const { users } = require("../data");

//Get all the products
router.route("/").get(async (req, res) => {

    try {
        //validating the id;
        let allProducts = await product.getAllProducts();
        res.status(200).render("products/products", {
            title: "Products",
            products: allProducts,
            user_header: true,
            user_footer: true
        })
    }

    catch (e) {
        res.status(e.code).render("products/productsNotFound", {
            title: "Not found",
            message: e.message,
            user_header: true,
            user_footer: true
        })
    }
})

// Get all the products by Name
router.route("/searchByName").post(async (req, res) => {

    try {

        let name = xss(req.body.search);
        //Checking to validate the id

        let getProductByName = await product.getProductByName(name);


        res.status(200).render("products/products", {

            title: "Product Found",
            products: getProductByName,
            user_header: true,
            user_footer: true
        })
    }
    catch (e) {
        res.status(e.code).render("products/productsNotFound", {
            title: "Not found",
            message: e.message,
            user_header: true,
            user_footer: true
        })
    }
})

// Get the product by id
router.route("/:id").get(async (req, res) => {

    try {
        let id = xss(req.params.id);
        //Getting the product by Particular Id
        let getProductById = await product.getProductById(id);

        //Get the all the users
        let getAllUsersName = await users.getAllUsersByName();

        //Create an array of object to store the name along with the comments;

        let usersWithComments;
        if (getProductById && getAllUsersName)
            usersWithComments = await users.getUserNameWithComments(getProductById, getAllUsersName);

        res.status(200).render("products/productDetail", {

            title: getProductById.name,
            product: getProductById,
            comments: usersWithComments,
            user_header: true,
            user_footer: true
        })
    }
    catch (e) {
        res.status(e.code).render("products/productsNotFound", {
            title: "Not found",
            message: e.message,
            user_header: true,
            user_footer: true
        })
    }
})

module.exports = router;