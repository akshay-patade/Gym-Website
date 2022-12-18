//Here is where you'll set up your server as shown in lecture code
const express = require("express");
const app = express();
const path = require("path");
const os = require('os');
const session = require('express-session');
const store = new session.MemoryStore();
var NedbStore = require('nedb-session-store')(session);
const public = express.static(__dirname + "/public");
const middleware = require('./middleware');
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const loginRoute = require('./routes/admin')


app.use("/public", public);
app.use(express.json());
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    store: new NedbStore({
        filename: path.join(os.tmpdir(), "thrift-session.db")
    })
}));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'handlebars')

const handlebarEngine = exphbs.create({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'handlebars',
    defaultLayout: 'index',
    partialsDir: `${__dirname}/views/partials`,
})

app.engine('handlebars', handlebarEngine.engine)
app.use(express.static('public'))
middleware(app);
app.use("/", loginRoute)
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
