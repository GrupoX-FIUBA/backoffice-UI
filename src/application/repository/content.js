const bffUrl = require('./bffUrl');
const axios = require('axios');

export const getContent = async (page, contentPerPage, filter = '', accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    const contents = (await axios.get(`${bffUrl}/songs?blockeds=true`, {headers})).data;
    const offset = (page - 1) * contentPerPage;
    const filteredContent = filter === '' ? contents : contents.filter(song => {
        return ((song.title && song.title.toLowerCase().includes(filter.toLowerCase())) ||
                (song.author && song.author.name && song.author.name.toLowerCase().includes(filter.toLowerCase())) ||
                (song.id && `${song.id}`.toLowerCase().includes(filter.toLowerCase())));
    }); 
    return {contents: filteredContent.slice(offset, offset + contentPerPage), total: filteredContent.length};
}

export const disableContent = async (songId, accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    await axios.patch(`${bffUrl}/songs/disable/${songId}`, {}, {headers});
}

export const enableContent = async (songId, accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    await axios.patch(`${bffUrl}/songs/enable/${songId}`, {}, {headers});
}

export const getSongUrl = async (songId, accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    return (await axios.get(`${bffUrl}/songs/uri/${songId}`, {headers})).data.uri;
}