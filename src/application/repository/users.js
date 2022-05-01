const mockedUsers = [
    {
        name: 'eduardo',
        id: 'aided',
        email: 'eduardo@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'sofia',
        id: '1copad',
        email: 'sofia@hotmail.com',
        auth: 'fi',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'lucia',
        id: 'lou2ad',
        email: 'lucia@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'federico',
        id: 'chipa',
        email: 'federico@hotmail.com',
        auth: 'ep',
        enabled: false, 
        admin: false,
        type: 'client'
    },
    {
        name: 'franco',
        id: 'erectu',
        email: 'franco@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'iñaki',
        id: 'erucpo',
        email: 'inaki@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'nicolas',
        id: 'eructo',
        email: 'nicolas@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'gonzalo',
        id: 'idgeneradorandom',
        email: 'gonzalo@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'profesor',
        id: 'niidea',
        email: 'profesor@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'eduardin',
        id: 'alieded',
        email: 'eduardin@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'sofiasa',
        id: '1copade',
        email: 'sofiasa@hotmail.com',
        auth: 'fi',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'luciandia',
        id: 'lou2ada',
        email: 'lucidia@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'federica',
        id: 'chipre',
        email: 'federica@hotmail.com',
        auth: 'ep',
        enabled: false, 
        admin: false,
        type: 'client'
    },
    {
        name: 'franca',
        id: 'arectu',
        email: 'franca@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'irvin',
        id: 'erosp',
        email: 'irvin@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'nicolasa',
        id: 'eructa',
        email: 'nicolasa@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'gonzala',
        id: 'idgassradorandom',
        email: 'gonzala@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
    {
        name: 'profesora',
        id: 'papalolo',
        email: 'profesora@hotmail.com',
        auth: 'ep',
        enabled: true,
        admin: false,
        type: 'client'
    },
]

const getUsers = async (page, userPerPage, filter = '') => {
    const users = mockedUsers;
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