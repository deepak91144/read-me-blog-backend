const mongoose = require("mongoose");
const connectDb = () => {
	mongoose
		.connect(
			"mongodb+srv://dee911db:okAPyYgsg4s0Zi0e@cluster0.8wjsf.mongodb.net/",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)
		.then(() => {
			console.log("db connected");
		})
		.catch((error) => {
			console.log(error);
		});
};
module.exports = connectDb;
