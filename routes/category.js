const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
	addCategory,
	fetchCategory,
	updateCategory,
	deleteCategory,
} = require("../controller/CategoryController");
const { isSignedIn } = require("../middleware/auth");
router.post(
	"/add",
	[
		check("title", "title is empty").notEmpty(),
		check("description", "description is empty").isLength({ min: 10 }),
	],

	addCategory
);
router.get("/", fetchCategory);
router.put("/update/:categoryId", isSignedIn, updateCategory);
router.delete("/delete/:categoryId", isSignedIn, deleteCategory);

module.exports = router;
