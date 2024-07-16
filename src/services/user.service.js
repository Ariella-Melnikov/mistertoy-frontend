import { httpService } from './http.service.js';


export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
    getUsers,
};

const STORAGE_KEY_LOGGEDIN = 'user';
const BASE_URL = 'auth/'

window.us = userService

function getUsers() {
    return httpService.get(`user`)
}

function query(filterBy = {}) {
    const queryParams = new URLSearchParams(filterBy).toString();
    return httpService.get(`user?${queryParams}`);
}

function getById(userId) {
    return httpService.get(`user/${userId}`);
}

async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        if (user) {
            return _setLoggedinUser(user)
        }
    } catch (err) {
        console.log('Had issues in login', err)
        showErrorMsg('Cannot login')
    }
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname ,score: 10000 }

    try {
        const registeredUser = await httpService.post(BASE_URL + 'signup', user)

        if (registeredUser) {
            return _setLoggedinUser(registeredUser)
        }
    } catch (err) {
        console.log('Had issues in signup', err)
        showErrorMsg('Cannot sign up')
    }
}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.log('Had issues in logout', err)
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
        // labels: [], 
    };
}

// function updateUser(user) {
//     return httpService.put(`user/${user._id}`, user)
//         .then(updatedUser => {
//             if (getLoggedinUser()._id === updatedUser._id) {
//                 _setLoggedinUser(updatedUser);
//             }
//             return updatedUser;
//         });
// }

// function updateUserPreffs(userToUpdate) {
//     const loggedinUserId = getLoggedinUser()._id;
//     return getById(loggedinUserId)
//         .then(user => {
//             user = { ...user, ...userToUpdate };
//             return updateUser(user);
//         });
// }

// function addActivity(txt) {
//     const activity = { txt, at: Date.now() };
//     const loggedinUser = getLoggedinUser();
//     if (!loggedinUser) return Promise.reject('No loggedin user');
//     return getById(loggedinUser._id)
//         .then(user => {
//             if (!user.activities) user.activities = [];
//             user.activities.unshift(activity);
//             return updateUser(user);
//         });
// }

// function getDefaultPrefs() {
//     return { color: '#eeeeee', bgColor: "#191919", fullname: '' };
// }

function _setLoggedinUser(user) {
    // const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, pref: user.pref, activities: user.activities };
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}