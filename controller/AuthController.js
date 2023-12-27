const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const userModel = require("../model/User");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils");
const { response } = require("express");
exports.signup = async (req, res) => {
	try {
		console.log("fewf");
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json(errors);
		}

		const userDetails = req.body;
		const emailExist = await userModel.findOne({ email: userDetails.email });

		if (emailExist) {
			return res.status(401).json({
				message: "Email Already Exist",
			});
		}

		const hashedPassword = await bcrypt.hash(userDetails?.password, 10);
		userDetails.password = hashedPassword;

		const user = userModel(userDetails);
		const newUser = await user.save();
		if (newUser) {
			const token = await jwt.sign({ id: newUser._id }, "shhhhhh");
			return res.status(201).json({
				message: "User added successfully",
				token,
				user: newUser,
			});
		}
	} catch (error) {
		return res.status(401).json({
			message: "Something went wrong",
		});
	}
};

exports.signin = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json(errors);
		}

		const userDetails = req.body;
		const emailExist = await userModel.findOne({ email: userDetails.email });
		console.log(emailExist);

		if (emailExist) {
			const passwordMatched = await bcrypt.compare(
				userDetails?.password,
				emailExist.password
			);
			if (passwordMatched) {
				const token = await jwt.sign({ id: emailExist._id }, "shhhhhh");
				return res.status(201).json({
					message: "user found",
					token,
					user: emailExist,
				});
			}
			return res.status(401).json({
				message: "invalid credential",
			});
		}
		return res.status(401).json({
			message: "invalid credential",
		});
	} catch (error) {
		return res.status(401).json({
			message: "Something went wrong",
		});
	}
};

exports.forgotPasword = async (req, res) => {
	const { email } = req.body;

	const emailExist = await userModel.findOne({ email: email });
	console.log(emailExist);
	if (emailExist) {
		const number = Math.random();
		const respo = await sendEmail(email, number);

		const updated = await userModel.findOneAndUpdate(
			{ _id: emailExist._id },
			{ forgotPasswordToken: number }
		);
		return res.status(201).json({
			message: "please open ypur email",
			userId: emailExist._id,
		});
	}
	return res.status(403).json({
		message: "something went wrong",
	});
};

exports.resetPassword = async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		req.body.password = hashedPassword;
		console.log("password", req.body.password);
		const updated = await userModel.findOneAndUpdate(
			{ _id: req.body.userId },
			{ password: req.body.password },
			{ new: true }
		);

		return res.status(201).json({
			message: "password reset successfully",
		});
	} catch (error) {
		return res.status(401).json(error);
	}
};
