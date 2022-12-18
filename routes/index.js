const users = require("./users");
const api = require("./api");
const admin = require("./admin");
const blogs = require("./blogs");
const products = require("./products");
<<<<<<< HEAD
const cart = require("./cart");
=======
const subscriptions = require("./subscriptions");
>>>>>>> 90e4f8950f8960b9a59e4567e1e6b3a53564e8ab
const path = require("path");

const constructorMethod = (app) => {
  app.use("/", users);
  app.use("/api", api);
  app.use("/admin", admin);
  app.use("/blogs", blogs);
  app.use("/products", products);
<<<<<<< HEAD
  app.use("/cart", cart);
=======
  app.use("/subscriptions", subscriptions);
>>>>>>> 90e4f8950f8960b9a59e4567e1e6b3a53564e8ab

  app.use("*", (req, res) => {
    res.redirect("/404");
  });
};

module.exports = constructorMethod;
