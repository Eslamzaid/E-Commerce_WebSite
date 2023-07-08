const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");

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
