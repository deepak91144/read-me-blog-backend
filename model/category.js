const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
			trim: true,
		},
		description: {
			type: String,
			require: true,
			trim: true,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "user",
			require: true,
		},
	},
	{ timestamps: true }
);
const Category = mongoose.model("category", categorySchema);
module.exports = Category;
