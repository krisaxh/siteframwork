//https://en.wikipedia.org/wiki/Access-control_list
import jwt from 'jsonwebtoken'
import aes from 'crypto-js/aes'
import crypto from 'crypto'

export const key = () => {
    return 'fwegertrhegewfewgarestrndytmnrgbrbabdfbfdbfbbbetbternetnternsrtnsat'
}

export const EncryptPBKDF2 = (text) => {
    return crypto.pbkdf2Sync(text, 'salt', 5000, 256, 'sha512').toString('hex')
}

export const EncryptAES = (text) => {
    return aes.encrypt(JSON.stringify(text), key()).toString()
}

export const DecryptAES = (text) => {
    let decrypted = Buffer.from(aes.decrypt(text, key()).toString(), "hex").toString("utf8")
    return decrypted.substring(1, decrypted.length-1)
}

export const JWTSign = (array, exp:boolean) => {
    if (exp) {
        return jwt.sign(array, key(), { expiresIn: "15s" })
    } else {
        return jwt.sign(array, key())
    }
    
}

export const JWTValidate = (token):boolean => {
    return jwt.verify(token, key(), (e) => {
        if (e) return false
        return true
    })
}

export const JWTDecode = (token) => {
    return jwt.decode(token)
}