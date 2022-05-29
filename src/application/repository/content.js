const bffUrl = require('./bffUrl');
const axios = require('axios');

const mockedContent = [
    {
        id: '1',
        name: 'Song 1',
        author: 'Author 1',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        status: 'Enabled'
    },
    {
        id: '2',
        name: 'Song 2',
        author: 'Author 2',
        status: 'Disabled'
    },
    {
        id: '3',
        name: 'Song 3',
        author: 'Author 3',
        status: 'Enabled'
    },
    {
        id: '4',
        name: 'Song 4',
        author: 'Author 4',
        status: 'Enabled'
    },
    {
        id: '5',
        name: 'Song 5',
        author: 'Author 5',
        status: 'Enabled'
    },
    {
        id: '6',
        name: 'Song 6',
        author: 'Author 6',
        status: 'Enabled'
    },
    {
        id: '7',
        name: 'Song 7',
        author: 'Author 7',
        status: 'Enabled'
    },
    {
        id: '8',
        name: 'Song 8',
        author: 'Author 8',
        status: 'Enabled'
    }
]

const getContent = async (page, contentPerPage, filter = '') => {
    const contents = mockedContent;
    const offset = (page - 1) * contentPerPage;
    const filteredContent = filter === '' ? contents : contents.filter(user => {
        return (user.name.toLowerCase().includes(filter.toLowerCase()) ||
                user.email.toLowerCase().includes(filter.toLowerCase()) ||
                user.id.toLowerCase().includes(filter.toLowerCase()));
    }); 
    return {contents: filteredContent.slice(offset, offset + contentPerPage), total: filteredContent.length};
}

module.exports = {
    getContent
}