const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
			trim: true,
		},
		email: {
			type: String,
			require: true,
			trim: true,
		},
		password: {
			type: String,
			require: true,
			trim: true,
		},
		forgotPasswordToken: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);
const User = mongoose.model("user", userSchema);
module.exports = User;
