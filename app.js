//Here is where you'll set up your server as shown in lecture code
const express = require("express");
const app = express();
const static = express.static(__dirname + "/node_modules/bootstrap/dist");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

app.use("/dist", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
