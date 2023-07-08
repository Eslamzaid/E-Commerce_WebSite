const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');


const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: 
}))

app.use(express.static("D:/Coding/E-Commerce_WebSite/Front"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));


app.get("/", (req, res) => {
  res.sendFile(path.join("D:/Coding/E-Commerce_WebSite/Front/index.html"));

});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
