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
window.us = userService


function query(filterBy = {}) {
    const queryParams = new URLSearchParams(filterBy).toString();
    return httpService.get(`user?${queryParams}`);
}

function getById(userId) {
    return httpService.get(`user/${userId}`);
}

function login({ username, password }) {
    return httpService.post('auth/login', { username, password })
        .then(user => _setLoggedinUser(user));
}

function signup({ username, password, fullname, email, labels }) {
    const user = { username, password, fullname, email, labels ,score: 10000 }

    const savedUser = httpService.post('auth/signup', user)
    if (savedUser) return _setLoggedinUser(savedUser)

}

async function logout() {
    await httpService.post('auth/logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
        email: '', 
        // labels: [], 
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
    // const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, pref: user.pref, activities: user.activities };
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}