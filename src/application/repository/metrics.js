const bffUrl = require('./bffUrl');
const axios = require('axios');

const getUserMetricSignUps = async(accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    const contents = (await axios.get(`${bffUrl}/metrics/signUps`, {headers})).data;
    return {
        "ep": contents.email_password,
        "fi": contents.federated,
    }
}

const getUserMetricLogIns = async(accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    const contents = (await axios.get(`${bffUrl}/metrics/Logins`, {headers})).data;
    return {
        'dates': ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05', '2022-01-06', '2022-01-07'],
        'ep': [10,10,10,20,30,40,30],
        'fi': [10,0,10,0,30,35,0],
    }
}

const getUserMetricBlocks = async(accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    const contents = (await axios.get(`${bffUrl}/metrics/blockeds`, {headers})).data;
    return {
        'enabled': contents.enabled,
        'disabled': contents.blocked,
    }
}

const getUserMetricPasswordRecoveries = async(accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    const contents = (await axios.get(`${bffUrl}/metrics/passwordResets`, {headers})).data;
    return {
        'dates': Object.keys(contents),
        'values': Object.values(contents),
    }
}

const getTransactionMetric = async(accessToken) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    }
    const contents = (await axios.get(`${bffUrl}/metrics/passwordResets`, {headers})).data;
    return {
        'months': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        'payment': [0,0,0,20,30],
        'raising': [0,0,0,0,30],
    }
}

// const getNewContentMetric = async() => {
//     return {
//         'dates': ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05', '2022-01-06', '2022-01-07'],
//         'values': [10,0,10,5,30,40,30],
//     }
// }

// const getByGenreMetric = async() => {
//     return {
//         "labels": ['pop', 'rock', 'jazz', 'alternative'],
//         "values": [12,11,10,15]
//     }
// }

// const getBySubscriptionMetric = async() => {
//     return {
//         "labels": ['regular', 'silver', 'gold'],
//         "values": [12,11,10]
//     }
// }

module.exports = {
    getUserMetricSignUps,
    getUserMetricLogIns,
    getUserMetricBlocks,
    getUserMetricPasswordRecoveries,
    getTransactionMetric,
    // getNewContentMetric,
    // getByGenreMetric,
    // getBySubscriptionMetric
}