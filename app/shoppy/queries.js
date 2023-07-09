const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE user_id = $1";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const addUser =
  "INSERT INTO users (name, email, isprem, password) VALUES ($1, $2, $3, $4)";
const deleteUser = "DELETE FROM users WHERE user_id = $1";
const updateUser =
  "UPDATE users SET name = $1, email = $2, isprem = $3 WHERE user_id = $4";
const getUserByEmail = "SELECT user_id FROM users WHERE email = $1";
const checkUser = "SELECT * FROM users WHERE email = $1 AND password = $2";
const getUserInfo = "SELECT * FROM users WHERE user_id = $1";
const getAllClothes = "SELECT * FROM clothes";
module.exports = {
  getUsers,
  getUserById,
  checkEmailExists,
  addUser,
  deleteUser,
  updateUser,
  getUserByEmail,
  checkUser,
  getUserInfo,
  getAllClothes,
};
