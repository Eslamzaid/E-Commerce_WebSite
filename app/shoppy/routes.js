const { Router } = require("express");
const controller = require("./controllers");
const session = require("express-session");

const router = Router();

router.get("/register", controller.getUser);
router.post("/register", controller.addUser);
router.get("/:user_id", controller.getUserById);
router.put("/:user_id", controller.updateUser)
router.delete("/:user_id", controller.deleteUser)

module.exports = router;
