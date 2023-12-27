const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
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
		photos: [
			{
				id: { type: String, required: true },
				secure_url: { type: String, required: true },
			},
		],
		tags: [{ type: String }],
		count: {
			type: Number,
			default: 1,
		},
		active: {
			type: Boolean,
			require: true,
			default: false,
		},
		trending: {
			type: Boolean,
			require: true,
			trim: true,
			default: false,
		},
		category: {
			type: mongoose.Schema.ObjectId,
			ref: "category",
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "user",
		},
	},
	{ timestamps: true }
);
const Post = mongoose.model("post", postSchema);
module.exports = Post;
