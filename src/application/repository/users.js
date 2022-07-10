const bffUrl = require('./bffUrl');
const axios = require('axios');

export const getUsers = async (page, userPerPage, filter = '', accessToken) => {
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

export const disableUser = async (userId, accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    await axios.patch(`${bffUrl}/users/disable_status/${userId}?disabled=true`, {}, {headers});
}

export const enableUser = async (userId, accessToken) => {
    const headers = {
        authorization: `Bearer ${accessToken}`
    }
    await axios.patch(`${bffUrl}/users/disable_status/${userId}?disabled=false`, {}, {headers});
}

export const removeAdmin = async (userId, accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    await axios.patch(`${bffUrl}/users/admin_status/${userId}?admin=false`, {}, {headers});
}

export const grantAdmin = async (userId, accessToken) => {
    const headers = {
        authorization: `Bearer ${accessToken}`
    }
    await axios.patch(`${bffUrl}/users/admin_status/${userId}?admin=true`, {}, {headers});
}

export const verifyIfUserIsAdmin = async (accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    try{
        await axios.get(`${bffUrl}/user_is_admin`, {headers});
        return true;
    }catch(err){
        return false;
    }
}

export const payUser = async (accessToken, userId, amount) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    try{
        await axios.post(`${bffUrl}/payment`, {
            receiverId: `${userId}`,
            amountInEthers: `${amount}`,
        },
        {headers});
        return true;
    }catch(err){
        return false;
    }
}