
const validate = (username, password) => {
	if (require("../db/database.json").users[username]) {
		if (password == require("../db/database.json").users[username].password) {
			return require("../db/database.json").users[username].id;
		}
	} else {
		return 0;
	}
}

module.exports.validate = validate;