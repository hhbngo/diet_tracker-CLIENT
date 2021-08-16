export function logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expiresIn');
    return { type: 'AUTH_FALSE' };
};