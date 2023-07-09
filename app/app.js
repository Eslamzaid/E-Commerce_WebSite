const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
require("dotenv").config();
const shoppyRoutes = require("./shoppy/routes");

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("D:/Coding/E-Commerce_WebSite/Front"));
app.set("view engine", "ejs");
app.use(morgan("tiny"));
// app.use(cookieParser());

app.use("/api", shoppyRoutes.router);
app.use("/home", shoppyRoutes.router2);

var sessions;
app.get("/", (req, res) => {
  sessions = req.session;
  if (sessions.user_id) {
    res.redirect("/home");
  } else {
    res.render("D:/Coding/E-Commerce_WebSite/Front/index.ejs", {
      situation: "Register now to Order",
    });
  }
});

app.get("/about", (req, res) => {
  console.log(req.session.user_id);
  if (req.session.user_id) res.redirect("/home");
  else res.sendFile("D:/Coding/E-Commerce_WebSite/Front/about.html");
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
