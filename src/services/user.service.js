import { httpService } from './http.service.js';

export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    updateUser,
    getEmptyCredentials,
    addActivity,
};

const STORAGE_KEY_LOGGEDIN = 'user';

function query(filterBy = {}) {
    const queryParams = new URLSearchParams(filterBy).toString();
    return httpService.get(`user?${queryParams}`);
}

function getById(userId) {
    return httpService.get(`user/${userId}`);
}

function login(credentials) {
    return httpService.post('auth/login', credentials)
        .then(user => _setLoggedinUser(user));
}

function signup(credentials) {
    return httpService.post('auth/signup', credentials)
        .then(user => _setLoggedinUser(user));
}

function logout() {
    return httpService.post('auth/logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN);
        });
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
}

function getEmptyCredentials() {
    return {
        fullname: 'Admin Adminov',
        username: 'admin',
        password: 'admin',
    };
}

function updateUser(user) {
    return httpService.put(`user/${user._id}`, user)
        .then(updatedUser => {
            if (getLoggedinUser()._id === updatedUser._id) {
                _setLoggedinUser(updatedUser);
            }
            return updatedUser;
        });
}

// function updateUserPreffs(userToUpdate) {
//     const loggedinUserId = getLoggedinUser()._id;
//     return getById(loggedinUserId)
//         .then(user => {
//             user = { ...user, ...userToUpdate };
//             return updateUser(user);
//         });
// }

function addActivity(txt) {
    const activity = { txt, at: Date.now() };
    const loggedinUser = getLoggedinUser();
    if (!loggedinUser) return Promise.reject('No loggedin user');
    return getById(loggedinUser._id)
        .then(user => {
            if (!user.activities) user.activities = [];
            user.activities.unshift(activity);
            return updateUser(user);
        });
}

// function getDefaultPrefs() {
//     return { color: '#eeeeee', bgColor: "#191919", fullname: '' };
// }

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, pref: user.pref, activities: user.activities };
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave));
    return userToSave;
}