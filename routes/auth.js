const express = require("express");

const router = express.Router();
const { check } = require("express-validator");
const {
	signup,
	signin,
	forgotPasword,
	resetPassword,
} = require("../controller/AuthController");
const { isSignedIn } = require("../middleware/auth");
const { route } = require("./category");

router.post(
	"/signup",
	[
		check("name", "name is empty").notEmpty(),
		check("email", "email is empty").isEmail(),
		check("password", "password is empty").notEmpty(),
	],
	signup
);
router.post(
	"/signin",
	[
		check("email", "email is empty").isEmail(),
		check("password", "password is empty").notEmpty(),
	],

	signin
);
router.post("/forgot-password", forgotPasword);
router.post("/reset-password", resetPassword);
module.exports = router;
