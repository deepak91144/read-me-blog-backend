const { validationResult } = require("express-validator");
const fs = require("fs");
const postModel = require("../model/Post");
const cloudinary = require("cloudinary");
const nodemailer = require("nodemailer");

exports.addPost = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(401).json(errors);
		}
		const postDetails = req.body;

		postDetails.user = req.user._id;

		const post = new postModel(postDetails);
		const newPost = await post.save();

		res.status(201).json({
			message: "post created successfully",
			post: newPost,
		});
	} catch (error) {
		res.status(401).json(error);
	}
};

exports.fetchPost = async (req, res) => {
	try {
		// const resp = await postModel.createIndex({ title: "text" });
		// return res.json(resp);
		const posts = await postModel.find({}).populate("category");

		return res.status(200).json({
			message: "posts fethced successfully",
			posts,
		});
	} catch (error) {
		return res.status(400).json(error);
	}
};
exports.singlePost = async (req, res) => {
	try {
		const { postId } = req.params;
		console.log("postId", req.params);
		const post = await postModel
			.findOne({ _id: postId })
			.populate("user")
			.populate("category");
		console.log("post", post);
		return res.status(200).json({
			messgae: "post fetch successfully",
			post,
		});
	} catch (error) {
		return res.status(401).json(error);
	}
};
exports.updatePost = async (req, res) => {
	const { postId } = req.params;

	// req.body.active = Boolean(req.body.active);
	// req.body.trending = Boolean(req.body.trending);
	const updatedPost = await postModel.findOneAndUpdate(
		{ _id: postId },
		req.body,
		{ new: true }
	);
	return res.status(201).json({
		message: "updated",
		post: updatedPost,
	});
};
exports.sendmail = async (req, res) => {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,

		auth: {
			user: "iamdj1111@gmail.com", // generated ethereal user
			pass: "qppijqlwaqudazve", // generated ethereal password
		},
	});
	const message = {
		from: '"probackend 👻" <iamdj1111@gmail.com>', // sender address
		to: "deepak_dibyajyoti@hotmail.com", // list of receivers
		subject: "subject", // Subject line
		text: "text", // plain text body
	};
	// send mail with defined transport object
	const resp = await transporter.sendMail(message);
	res.json(resp);
};
exports.deleteAPost = async (req, res) => {
	try {
		const { postId } = req.params;
		await postModel.findOneAndDelete({ _id: postId });
		return res.status(204).json();
	} catch (error) {
		return res.status(401).json(error);
	}
};
exports.fileUpload = async (req, res) => {
	console.log(req.files.photo);
	try {
		if (req.files) {
			let resp = await cloudinary.v2.uploader.upload(
				req.files.photo.tempFilePath,
				{
					folder: "post",
				}
			);
			return res.status(201).json({
				message: "image uploaded successfully",
				img: resp,
			});
			// postDetails.photos = {
			// 	id: res.public_id,
			// 	secure_url: res.secure_url,
			// };
		}
	} catch (error) {
		return res.status(401).json(error);
	}
};
