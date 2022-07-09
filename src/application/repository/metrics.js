const bffUrl = require('./bffUrl');
const axios = require('axios');
const moment = require('moment')

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
    const contents = (await axios.get(`${bffUrl}/metrics/logins`, {headers})).data;
    const epKeys = Object.keys(contents.manual);
    const fiKeys = Object.keys(contents.federated);
    const dates = [];
    const ep = [];
    const fi = [];
    const date = (moment(epKeys[0]) < moment(fiKeys[0])) ? moment(epKeys[0]) : moment(fiKeys[0]);
    while (date <= moment(epKeys[epKeys.length - 1]) || date <= moment(fiKeys[fiKeys.length - 1])) {
        dates.push(date.format("YYYY-MM-DD"));
        ep.push((contents.manual[date.format("YYYY-MM-DD")]) ? contents.manual[date.format("YYYY-MM-DD")] : 0);
        fi.push((contents.federated[date.format("YYYY-MM-DD")]) ? contents.federated[date.format("YYYY-MM-DD")] : 0);
        date.add(1, 'days');
    }
    return {
        'dates': dates,
        'ep': ep,
        'fi': fi,
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