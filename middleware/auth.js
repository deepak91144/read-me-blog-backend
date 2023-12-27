const jwt = require("jsonwebtoken");
const userModel = require("../model/User");
exports.isSignedIn = async (req, res, next) => {
	try {
		if (!req.header("Authorization")) {
			res.status(401).json({
				message: "Authorization token missing",
			});
		}
		const token = req.header("Authorization").replace("Bearer ", "");
		console.log(token);
		if (!token) {
			return res.status(404).json({
				message: "login first",
			});
		}
		const decoded = jwt.verify(token, "shhhhhh");

		req.user = await userModel.findById(decoded.id);
	} catch (error) {}
	next();
};
