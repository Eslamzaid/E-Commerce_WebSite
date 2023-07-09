const pool = require("../../database/dataDB");
const queries = require("./queries");

const getUser = (req, res) => {
  pool.query(queries.getUsers, (err, results) => {
    if (!err) res.status(200).json(results.rows);
    else throw err;
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
    if (results.rows.length) {
      res.send("Email already exists");
      return;
    }

    pool.query(
      queries.addUser,
      [name, email, isprem, password],
      (err, results) => {
        if (!err) res.status(201).send("User created successful");
        else throw err;
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
