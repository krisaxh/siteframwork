const validate = require("../src/database.ts");
const sha3 = require("crypto-js/sha3");
const aes = require("crypto-js/aes");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const login = (username, password) => {
	// Decryption logic
	// /Decryption logic
	const signature = fs.readFileSync("../signature.key", "utf8");
	const privatekey = fs.readFileSync("../private.key", "utf8");

	const id = validate(username, password)
	console.log(id)
	if (id != 0) {
		// valid user 
		// Encrypt both of the tokens [ SEVERE ]
		console.log(">0");
		// * username.length
		const userhash = sha3((id * username.length * Math.random() * 100)).toString();
		return jwt.sign({userid: id, userhash: aes.encrypt(JSON.stringify(userhash), privatekey).toString()}, signature);
	
	} else if (id == 0) {
		// invalid user
		console.log("=0");
		return;
	} else {
		console.log("<0");
		// XSS Attack;
		return;
	}
}

const refresh = (token) => {
	return require()
}

module.exports.login = login;