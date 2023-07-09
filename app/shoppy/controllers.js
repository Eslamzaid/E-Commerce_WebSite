const { Session } = require("express-session");
const pool = require("../../database/dataDB");
const queries = require("./queries");
const helpers = require("./helpers");

const getUser = (req, res) => {
  // pool.query(queries.getUsers, (err, results) => {
  //   if (!err) res.status(200).json(results.rows);
  //   else throw err;
  // });
  console.log(req.session);
  res.render("D:/Coding/E-Commerce_WebSite/Front/register.ejs", {
    err: req.session.error || "",
  });
};

const getUserById = (req, res) => {
  const user_id = parseInt(req.params.user_id);
  pool.query(queries.getUserById, [user_id], (err, results) => {
    const noUser = !results.rows.length;
    if (noUser) {
      res.status(404).send("could not find user with id " + user_id);
      return;
    }
    if (!err) res.status(200).json(results.rows);
    else throw err;
  });
};

const addUser = (req, res) => {
  const { name, email, isprem, password } = req.body;
  // check if email exists
  pool.query(queries.checkEmailExists, [email], (err, results) => {
    const isNullVal = helpers.checkNotNull([name, email, password]);
    if (isNullVal[0]) {
      if (isNullVal[1] == 0)
        req.session.error =
          "Please fill out all fields, missing field (username)";
      else if (isNullVal[1] == 1)
        req.session.error = "Please fill out all fields, missing field (email)";
      else if (isNullVal[1] == 2)
        req.session.error =
          "Please fill out all fields, missing field (password)";
      else req.session.error = "Please fill out the fields correctly";
      res.redirect("/api/register");
      return;
    }
    const isProper = helpers.checkValid([email, password]);
    if (isProper[0]) {
      if (isProper[2] == 0) {
        req.session.error = isProper[1];
        res.redirect("/api/register");
        return;
      } else if (isProper[2] == 1) {
        req.session.error = isProper[1];
        res.redirect("/api/register");
        return;
      }
    }
    if (results.rows.length) {
      req.session.error =
        "The email you just typed " +
        email.slice(0, 5) +
        "...@gmail.com already exists";
      res.redirect("/api/register");
      return;
    }

    pool.query(
      queries.addUser,
      [name, email, isprem, password],
      async (err, results) => {
        if (!err) {
          const { rows } = await pool.query(queries.getUserByEmail, [email]);
          req.session.user_id = rows[0].user_id;
          delete req.session.error;
          res.status(201).send("User created successful");
        } else throw err;
      }
    );
  });
};

const deleteUser = (req, res) => {
  const user_id = req.params.user_id;
  pool.query(queries.getUserById, [user_id], (err, results) => {
    const noUser = !results.rows.length;
    if (noUser) {
      res.status(404).send("Could not find user with id " + user_id);
      return;
    }
    pool.query(queries.deleteUser, [user_id], (error, result) => {
      if (!error)
        res.status(200).send("There will be a place for you in shoppy");
      else throw error;
    });
  });
};

const updateUser = (req, res) => {
  const user_id = req.params.user_id;
  console.log(typeof user_id);
  const { name, email, isprem } = req.body;

  pool.query(queries.getUserById, [user_id], (err, results) => {
    const noUser = !results.rows.length;
    if (noUser) {
      res.status(404).send("Could not find user with id " + user_id);
      return;
    }

    pool.query(
      queries.updateUser,
      [name, email, isprem, user_id],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("User updated Successfully");
      }
    );
  });
};

module.exports = {
  getUser,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
};
