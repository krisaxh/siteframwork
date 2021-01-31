// Simple database reader
import aes from 'crypto-js/aes'
import signature from './signature'

export const validate = (username, password) => {
    let user = Buffer.from(aes.decrypt(username, signature()).toString(), "hex").toString("utf8")
    user = user.substring(1, user.length-1)

    if (require('../../db/database.json').users[user]){
        return password == require('../../db/database.json').users[user].password
    } else {
        return false
    }
}