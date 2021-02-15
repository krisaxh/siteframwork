import dotenv from 'dotenv'
dotenv.config()
import crypto from 'crypto'


const privatekey = process.env.KEY


export const EncryptPBKDF2 = (text) => {
    return crypto.pbkdf2Sync(text, privatekey, 5000, 256, 'sha512').toString('hex')
}
