const { validate } = require("../src/database.ts");
const sha3 = require("crypto-js/sha3");
const aes = require("crypto-js/aes");
const fs = require("fs");

const signature = "fafqwfqwfqwffqwfwqfqwf";
const privatekey = "vdejjilkvnrerberberbbtr";

module.exports = function login(user, pass) {

    const decrypted_user = Buffer.from(aes.decrypt(user, privatekey).toString(), "hex").toString("utf8");
    const decrypted_password = Buffer.from(aes.decrypt(pass, privatekey).toString(), "hex").toString("utf8");
    const username = decrypted_user.substring(1, decrypted_user.length - 1);
    const password = decrypted_password.substring(1, decrypted_password.length - 1);

    console.log(username);

    const id = validate(username, password)
    if (id > 0) {

        console.log(">0");

        const userhash = sha3((id * username.length * Math.random() * 100)).toString();
        return jwt.sign({ userid: id, userhash: aes.encrypt(JSON.stringify(userhash), privatekey).toString() }, signature, { expiresIn: '15s' });
    } else {

        console.log("=0");
        return;
    }
}