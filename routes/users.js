const express = require("express");
const router = express.Router();
const path = require("path");
//const index = require("../data");
//const people = index.people;

router.route("/").get(async (req, res) => {
  //code here for GET
  res.render("index", {
    title: "Welcome",
    user_header: true,
    user_footer: true,
    // product_data: [
    //   {
    //     id: "6369dc8cf932b955cbb795f7",
    //     name: "All Purpose Hoodies",
    //     description:
    //       "Adult Midweight Hoodie 50% Cotton 50% PolyDigitally Printed Graphic Washing instructions: Wash 30C. Wash inside out with like colors. Do not bleach, tumble dry low, do not iron. ",
    //     price: 200,
    //     category: "Hoodies",
    //     size: ["S", "M", "L"],
    //     overallrating: 12,
    //   },
    //   {
    //     id: "6369dc8cf932b955cbb795f7",
    //     name: "All Purpose Hoodies version 1",
    //     description:
    //       "Adult Midweight Hoodie 50% Cotton 50% PolyDigitally Printed Graphic Washing instructions: Wash 30C. Wash inside out with like colors. Do not bleach, tumble dry low, do not iron. ",
    //     price: 200,
    //     category: "Hoodies",
    //     size: ["S", "M", "L"],
    //     overallrating: 12,
    //   },
    //   {
    //     id: "6369dc8cf932b955cbb795f7",
    //     name: "All Purpose Hoodies version 2",
    //     description:
    //       "Adult Midweight Hoodie 50% Cotton 50% PolyDigitally Printed Graphic Washing instructions: Wash 30C. Wash inside out with like colors. Do not bleach, tumble dry low, do not iron. ",
    //     price: 200,
    //     category: "Hoodies",
    //     size: ["S", "M", "L"],
    //     overallrating: 12,
    //   },
    //   {
    //     id: "6369dc8cf932b955cbb795f7",
    //     name: "All Purpose Hoodies version 3",
    //     description:
    //       "Adult Midweight Hoodie 50% Cotton 50% PolyDigitally Printed Graphic Washing instructions: Wash 30C. Wash inside out with like colors. Do not bleach, tumble dry low, do not iron. ",
    //     price: 200,
    //     category: "Hoodies",
    //     size: ["S", "M", "L"],
    //     overallrating: 12,
    //   },
    // ],
  });
});

router.route("/login").get(async (req, res) => {
  //code here for GET
  res.render("login", {
    title: "Login",
    user_header: false,
    user_footer: true,
  });
});

router.route("/register").get(async (req, res) => {
  //code here for GET
  res.render("register", {
    title: "Register",
    user_header: false,
    user_footer: true,
  });
});

router.route("/product/:id").get(async (req, res) => {
  //code here for GET
  res.render("product", {
    title: "Product",
    user_header: false,
    user_footer: true,
  });
});

module.exports = router;
