const express = require("express");

//controllers
const userController = require("../controllers/user.controllers");
const authController = require("../controllers/auth.controller");

//Middleware
const userMiddleware = require("../middlewares/user.middleware");
const authMiddleware = require("../middlewares/auth.middlewares.js");

const router = express.Router();

router.use(authMiddleware.protect);

router.route("/").get(userController.findAll);
// .post(userMiddleware.validUser, userController.create);

router
  .route("/:id")
  .get(userMiddleware.validExistUser, userController.findOne)
  .patch(
    userMiddleware.validExistUser,
    authMiddleware.protectAccountOwner,
    userController.update
  )
  .delete(
    userMiddleware.validExistUser,
    authMiddleware.protectAccountOwner,
    userController.delete
  );

module.exports = router;
