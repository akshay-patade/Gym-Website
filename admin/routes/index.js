const users = require("./users");
const api = require("./api");
const admin = require("./admin");
const blogs = require("./blogs");
const product = require("./products");
const path = require("path");
const subscription = require("./subscription")
const blogCategory = require("./blogCategory")
const memberShip = require("./member")

const constructorMethod = (app) => {
    // app.use("/", users);
    app.use("/api", api);
    app.use("/admin", admin);
    app.use("/admin/blogs", blogs);
    app.use("/admin/products", product);
    app.use("/admin/subscription", subscription);
    app.use("/admin/blogCategorys", blogCategory);
    app.use("/admin/membership", memberShip);

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};

module.exports = constructorMethod;
