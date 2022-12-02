const users = require("./users");
const admin = require("./admin");

const constructorMethod = (app) => {
  app.use("/", users);
  app.use("/admin", admin);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
