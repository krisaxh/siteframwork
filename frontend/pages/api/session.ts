export const getAuth = () => {
	return sessionStorage.getItem('AUTH_TOKEN').toString() || null;
}
export const getRefr = () => {
	return sessionStorage.getItem('REFR_TOKEN').toString() || null;
}
export const setSession = (auth, refr) => {
	sessionStorage.setItem('AUTH_TOKEN', auth);
	sessionStorage.setItem('REFR_TOKEN', refr);
}
export const removeSession = () => {
	sessionStorage.removeItem('AUTH_TOKEN');
	sessionStorage.removeItem('REFR_TOKEN');
}