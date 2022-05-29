const bffUrl = require('./bffUrl');
const axios = require('axios');

// const mockedUsers = [
//     {
//         name: 'eduardo',
//         id: 'aided',
//         email: 'eduardo@hotmail.com',
//         auth: 'ep',
//         enabled: true,
//         admin: false,
//         type: 'client'
//     }
// ]

const getUsers = async (page, userPerPage, filter = '') => {
    const users = await axios.get(`${bffUrl}/users`);
    const offset = (page - 1) * userPerPage;
    const filteredUsers = filter === '' ? users : users.filter(user => {
        return (user.name.toLowerCase().includes(filter.toLowerCase()) ||
                user.email.toLowerCase().includes(filter.toLowerCase()) ||
                user.id.toLowerCase().includes(filter.toLowerCase()));
    }); 
    return {users: filteredUsers.slice(offset, offset + userPerPage), total: filteredUsers.length};
}

module.exports = {
    getUsers
}