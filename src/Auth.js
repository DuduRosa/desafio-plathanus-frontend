module.exports = {
    saveToken(token) {
        sessionStorage.setItem('TOKEN',token);
        return sessionStorage.getItem('TOKEN');
    },

    getToken() {
        return sessionStorage.getItem('TOKEN');
    },

    removeToken() {
        sessionStorage.removeItem('TOKEN');
    }
}