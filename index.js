const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const fileupload = require("express-fileupload");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	fileupload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);
const connectDb = require("./config/db");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const categoryRouter = require("./routes/category");
connectDb();
app.use("/api/v1/", authRouter);
app.use("/api/v1/post/", postRouter);
app.use("/api/v1/category/", categoryRouter);
const cloudinary = require("cloudinary");
cloudinary.config({
	cloud_name: "dqnhpqvpf",
	api_key: "679542758529856",
	api_secret: "N3_7434s51xjhDfsFY0rxsDH-PU",
});

app.listen(8000, () => {
	console.log("app ruuiing at 8000");
});
