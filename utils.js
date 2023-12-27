const nodemailer = require("nodemailer");
exports.sendEmail = async (email, number) => {
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,

		auth: {
			user: "iamdj1111@gmail.com", // generated ethereal user
			pass: "joacjnzkkfrrtzea", // generated ethereal password
		},
	});
	const message = {
		from: '"probackend 👻" <iamdj1111@gmail.com>', // sender address
		to: email, // list of receivers
		subject: "subject", // Subject line
		html: `<a href='http://localhost:3000/reset-password/${number}'>click here to reset password</a>  `, // plain text body
	};
	// send mail with defined transport object
	const resp = await transporter.sendMail(message);
	return resp;
};
