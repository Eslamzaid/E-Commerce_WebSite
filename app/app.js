const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
require("dotenv").config();
const shoppyRoutes = require("./shoppy/routes");

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("D:/Coding/E-Commerce_WebSite/Front"));
app.set("view engine", "ejs");
app.use(morgan("tiny"));
app.use(cookieParser());

app.use("/api", shoppyRoutes);

var sessions;
app.get("/", (req, res) => {
  sessions = req.session;
  if (sessions.user_id) {
    res.send("Oh now our table");
  } else {
    res.render("D:/Coding/E-Commerce_WebSite/Front/index.ejs", {
      situation: "Register now to Order",
    });
  }
});

app.get("/about", (req, res) => {
  res.sendFile("D:/Coding/E-Commerce_WebSite/Front/about.html");
});

// app.get("/register", (req, res) => {
//   res.render("D:/Coding/E-Commerce_WebSite/Front/register.ejs", {
//     err: req.session.error || "",
//   });
// });

// app.post("/register", (req, res) => {
//   console.log(req.body);
//    else {
//     // Process the registration logic here
//     // ...
//     // If the registration is successful, you can clear the error message from the session
//     delete session.error;
//     res.redirect("/");
//   }
// });

app.listen(4000, () => {
  console.log("listening on port 4000");
});
