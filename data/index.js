const productData = require("./products");
const blogData = require("./blogs");
const userData = require("./users");
const subscriptionPlansData = require("./subscriptionsPlans");

module.exports = {
  products: productData,
  blogs: blogData,
  users: userData,
  subscriptions: subscriptionPlansData
};
