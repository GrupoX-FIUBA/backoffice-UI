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
    // const headers = {
    //     Authorization: `Bearer ${accessToken}`
    // }
    // const contents = (await axios.get(`${bffUrl}/metrics/Logins`, {headers})).data;
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
    const deposits = (await axios.get(`${bffUrl}/metrics/deposits`, {headers})).data;
    const payments = (await axios.get(`${bffUrl}/metrics/payments`, {headers})).data;
    return {
        'days': Object.keys(deposits),
        'deposits': Object.values(deposits).map(d => d.amount),
        'payments': Object.values(payments).map(p => p.amount),
    }
}

module.exports = {
    getUserMetricSignUps,
    getUserMetricLogIns,
    getUserMetricBlocks,
    getUserMetricPasswordRecoveries,
    getTransactionMetric
}