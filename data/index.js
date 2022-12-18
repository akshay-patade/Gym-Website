const productData = require("./products");
const blogData = require("./blogs");
const userData = require("./users");
const subscriptionPlansData = require("./subscriptionsPlans");
const memberSubscriptionsData = require("./memberSubscription");
const memberData = require("./member");

module.exports = {
  products: productData,
  blogs: blogData,
  users: userData,
  subscriptions: subscriptionPlansData,
  memberSubscriptions: memberSubscriptionsData,
  members: memberData
};
