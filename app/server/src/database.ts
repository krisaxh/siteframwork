module.exports = function (username, password) {
    if (require('../db/database.json').users[username]){
        if (password == require('../db/database.json').users[username].password) {
            return require('../db/database.json').users[username].id;
        }
    } else {
        return 0;
    }
}
