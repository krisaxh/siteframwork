import { DecryptAES } from './signature'

export const validate = (username, password):Number => {
    let decrypted_user = DecryptAES(username)
    let decrypted_password = DecryptAES(password)
    if (require('../../db/database.json').users[decrypted_user]){
        if (decrypted_password == require('../../db/database.json').users[decrypted_user].password) {
            return require('../../db/database.json').users[decrypted_user].id
        }
    } else {
        return 0
    }
}