const express = require("express");
const bodyParser = require("body-parser");
const { PERMISSION, USER_TYPES } = require("../enum/enum.js");
const {
  authenticateToken,
  authPermission,
  authUserType,
} = require("../controller/middleware/authContoller.js");
const controller = require("../controller/userController");
const router = express.Router();
router.use(bodyParser.json());

router.get(
  "/",
  authenticateToken,
  authPermission(PERMISSION.READ),
  authUserType([USER_TYPES.ADMIN, USER_TYPES.REGISTERED]),
  controller.getAll
);

router.post("/auth", controller.authUser);

router.post(
  "/create",
  authenticateToken,
  authPermission(PERMISSION.WRITE),
  authUserType([USER_TYPES.ADMIN, USER_TYPES.REGISTERED]),
  controller.createUser
);

router.get("/:id", controller.getUserById);

router.put(
  "/update/:id",
  authenticateToken,
  authPermission(PERMISSION.UPDATE),
  authUserType([USER_TYPES.ADMIN, USER_TYPES.REGISTERED]),
  controller.updateUserById
);

router.delete(
  "/delete/:id",
  authenticateToken,
  authPermission(PERMISSION.DELETE),
  authUserType([USER_TYPES.ADMIN, USER_TYPES.REGISTERED]),
  controller.deleteUserById
);

router.get("/search", controller.searchUser);

module.exports = router;
