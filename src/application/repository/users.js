const bffUrl = require('./bffUrl');
const axios = require('axios');

const getUsers = async (page, userPerPage, filter = '', accessToken) => {
    console.log(accessToken)
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    const users = (await axios.get(`${bffUrl}/users`, {headers})).data;
    const offset = (page - 1) * userPerPage;
    const filteredUsers = filter === '' ? users : users.filter(user => {
        return ((user.name && user.name.toLowerCase().includes(filter.toLowerCase())) ||
                (user.email && user.email.toLowerCase().includes(filter.toLowerCase())) ||
                (user.uid && user.uid.toLowerCase().includes(filter.toLowerCase())));
    }); 
    return {users: filteredUsers.slice(offset, offset + userPerPage), total: filteredUsers.length};
}

const blockUser = async (userId, accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    await axios.patch(`${bffUrl}/users/disable_status/${userId}?disabled=true`, {}, {headers});
}

const enableUser = async (userId, accessToken) => {
    const headers = {
        authorization: `Bearer ${accessToken}`
    }
    await axios.patch(`${bffUrl}/users/disable_status/${userId}?disabled=false`, {}, {headers});
}

const removeAdmin = async (userId, accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    await axios.patch(`${bffUrl}/users/admin_status/${userId}?admin=false`, {}, {headers});
}

const grantAdmin = async (userId, accessToken) => {
    const headers = {
        authorization: `Bearer ${accessToken}`
    }
    await axios.patch(`${bffUrl}/users/admin_status/${userId}?admin=true`, {}, {headers});
}

module.exports = {
    getUsers,
    blockUser,
    enableUser,
    removeAdmin,
    grantAdmin
}