import crypto from 'crypto';;
import aes from 'crypto-js/aes';

const privatekey = "vdejjilkvnrerberberbbtr";

export const EncryptAES = (text) => {
	return aes.encrypt(JSON.stringify(text), privatekey).toString();
}
export const EncryptPBKDF2 = (text) => {
	return crypto.pbkdf2Sync(text, privatekey, 5000, 256, 'sha256').toString('hex');
}