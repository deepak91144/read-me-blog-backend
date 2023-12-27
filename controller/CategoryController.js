const categoryModel = require("../model/category");
const { validationResult } = require("express-validator");
exports.addCategory = async (req, res) => {
	try {
		// const errors = validationResult(req);
		// if (!errors.isEmpty()) {
		// 	return res.status(401).json(errors);
		// }
		const categoryDetails = req.body;
		console.log(categoryDetails);
		// const categoryExist = categoryModel.findOne({
		// 	title: categoryDetails.title,
		// });
		// categoryDetails.user = req.user._id;
		// if (categoryExist) {
		// 	return res.status(401).json({
		// 		message: "Category name already exist,try diffrent name",
		// 	});
		// }
		const category = new categoryModel(categoryDetails);
		const newCategory = await category.save();
		console.log(newCategory);
		if (newCategory) {
			return res.status(201).json({
				message: "New category created successfully",
				category: newCategory,
			});
		}
		return res.status(401).json({
			message: "something went wrong",
		});
	} catch (error) {
		return res.status(401).json(error);
	}
};

exports.fetchCategory = async (req, res) => {
	const categories = await categoryModel.find();
	console.log(categories);
	if (categories) {
		return res.status(200).json({
			message: "category successfully fethced",
			categories,
		});
	}
	return res.status(401).json({
		message: "category fethcing failed",
	});
};

exports.updateCategory = async (req, res) => {
	try {
		const { categoryId } = req.params;

		const categoryExist = await categoryModel.findOne({ _id: categoryId });

		if (categoryExist) {
			const updatedCategory = await categoryModel.findOneAndUpdate(
				{ _id: categoryId },
				req.body,
				{ new: true }
			);
			return res.status(203).json({
				message: "category updated",
				category: updatedCategory,
			});
		}
		return res.status(401).json({
			message: "category doesnt exist",
		});
	} catch (error) {
		return res.status(401).json(error);
	}
};
exports.deleteCategory = async (req, res) => {
	try {
		const { categoryId } = req.params;
		const deletedCategory = await categoryModel.findOneAndDelete({
			_id: categoryId,
		});
		return res.status(204).json();
	} catch (error) {
		return res.status(401).json(error);
	}
};
