const productData = require("./products");
const blogData = require("./blogs");
const usersData = require("./user");
const blogCategoryData = require("./blogCategory");
const subscriptionPlanData = require('./subscription')
const memberShip = require('./member')

module.exports = {
    products: productData,
    blogs: blogData,
    users: usersData,
    blogcategory: blogCategoryData,
    products: productData,
    subscription: subscriptionPlanData,
    member: memberShip
};
