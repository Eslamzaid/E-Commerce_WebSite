const { Router } = require("express");
const controller = require("./controllers");
const session = require("express-session");

const router = Router();

router.get("/register", controller.getUser);
router.post("/register", controller.addUser);
router.get("/login", controller.checkUser)
router.post("/login", controller.getBack)
router.get("/:user_id", controller.getUserById);
router.put("/:user_id", controller.updateUser);
router.delete("/:user_id", controller.deleteUser);

const router2 = Router();

router2.get("/", controller.shoppingPage);
router2.post("/addItem", controller.addItemToCart)

module.exports = { router, router2 };
