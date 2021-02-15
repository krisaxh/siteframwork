const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");

const app = express();
const { login } = require("./api/authenticate.ts");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());

app.post("/api/login", (req, res) => {
	// Reject misues of API
	if (!req.body) {
		res.status(404).json();
	}
	const {username, password} = req.body;
	const token = login(username, password);
	if (token) {
		res.status(200).json({ auth_token: token });
	} else {
		console.log(token)
		res.status(401).json();
	}
});

app.listen(8000, (req, res) => {
	console.log("Runnin on porte 8 + 0*3")
});