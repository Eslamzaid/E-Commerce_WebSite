const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE user_id = $1";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const addUser =
  "INSERT INTO users (name, email, isprem, password) VALUES ($1, $2, $3, $4)";
const deleteUser = "DELETE FROM users WHERE user_id = $1";
const updateUser = "UPDATE users SET name = $1, email = $2, isprem = $3 WHERE user_id = $4"


module.exports = {
  getUsers,
  getUserById,
  checkEmailExists,
  addUser,
  deleteUser,
  updateUser,
};
