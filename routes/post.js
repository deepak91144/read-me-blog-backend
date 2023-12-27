const express = require("express");
const {
	addPost,
	fetchPost,
	sendmail,

	updatePost,
	deleteAPost,
	singlePost,
	fileUpload,
} = require("../controller/PostController");
const { isSignedIn } = require("../middleware/auth");
const { check } = require("express-validator");

const router = express.Router();

router.post(
	"/add",
	[
		check("title", "title is empty").notEmpty(),
		check("description", "description is empty").notEmpty(),
	],
	isSignedIn,
	addPost
);
router.get("/", fetchPost);
router.delete("/delete/:postId", isSignedIn, deleteAPost);
router.get("/:postId", singlePost);
router.put("/update/:postId", isSignedIn, updatePost);
router.post("/sendmail", sendmail);
router.post("/fileupload", fileUpload);

module.exports = router;
