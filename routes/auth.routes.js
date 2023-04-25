const express = require("express");

// Middlewares
const validations = require("../middlewares/validations.middlewares");
const authMiddleware = require("../middlewares/auth.middlewares");

// Controllers
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", validations.createUserValidation, authController.signUp);

router.post("/login", validations.loginUserValidation, authController.login);

module.exports = router;
