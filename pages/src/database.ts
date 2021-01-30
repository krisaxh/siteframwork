// Simple database reader
export const validate = (username, password) => {
    if (require('../../db/data.json').users[username]){
        return password == require('../../db/data.json').users[username].password;
    } else {
        return false;
    }
}