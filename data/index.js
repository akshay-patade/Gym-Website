const productData = require("./products");
const blogData = require("./blogs");
const userData = require("./users");
const subscriptionPlansData = require("./subscriptionsPlans");
const orderData = require("./order");

module.exports = {
  products: productData,
  blogs: blogData,
  users: userData,
  subscriptions: subscriptionPlansData,
  order: orderData,
};
