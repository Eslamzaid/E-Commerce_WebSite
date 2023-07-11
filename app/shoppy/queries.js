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
const getAllClothes10 = "SELECT * FROM clothes LIMIT 10";
const getTotalItems = "SELECT COUNT(*) FROM cart WHERE user_id = $1";
const addNewClothToCart =
  "INSERT INTO cart (clothes_id, user_id) VALUES ( (SELECT clothes_id FROM clothes WHERE name = $1), (SELECT user_id FROM users WHERE user_id = $2))";
const singleTotalItem =
  "SELECT clothes_id, COUNT(*) FROM cart GROUP BY clothes_id";

const toQuery = (arr, user_id = 60) => {
  let query = "INSERT INTO cart (clothes_id, user_id) VALUES ";

  for (let i = 0; i < arr.length; i++) {
    while (arr[i].count != 0) {
      query += `(${arr[i].item_id}, ${user_id}), `;
      arr[i].count -= 1;
    }
  }
  let lastIndex = query.lastIndexOf(",");
  if (lastIndex !== -1) {
    query = query.slice(0, lastIndex) + query.slice(lastIndex + 1).trim();
  }
  return query;
};

const checkOutQuery = (arr, user_id) => {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (!(arr[i].name in obj)) {
      obj[arr[i].name] = 0;
      for (let x = 0; x < arr.length; x++) arr[x].count = 1;
    } else {
      for (let x = 0; x < arr.length; x++) arr[x].count += 1;
      obj[arr[i].name] += 1;
    }
  }

  let result = [];
  for (let j in obj) {
    for (let h of arr) {
      if (j == h.name) {
        result.push(h);
        break;
      }
    }
  }
  const ourQuery = toQuery(result, user_id);
  return ourQuery;
};

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
  getTotalItems,
  addNewClothToCart,
  singleTotalItem,
  getAllClothes10,
  checkOutQuery,
};
