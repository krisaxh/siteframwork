
const validate = (userhash) => {
	if (require("../database.json").active[userhash]) {
		return 1;
	} else {
		return 0;
	}
}

module.exports.validate = validate;