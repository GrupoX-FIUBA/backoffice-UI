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
    const contents = (await axios.get(`${bffUrl}/metrics/logins`, {headers})).data;
    const epKeys = Object.keys(contents.manual);
    const fiKeys = Object.keys(contents.federated);
    const epValues = Object.values(contents.manual);
    const fiValues = Object.values(contents.federated);
    const dates = [];
    const ep = [];
    const fi = [];
    let i = 0;
    let j = 0;
    while(i < epKeys.length && j < fiKeys.length) {
        if(new Date(epKeys[i]) < new Date(fiKeys[j])){
            dates.push(epKeys[i])
            ep.push(epValues[i]);
            fi.push(0);
            i++;
        } else if(new Date(epKeys[i]) > new Date(fiKeys[j])){
            dates.push(fiKeys[j])
            fi.push(fiValues[j]);
            ep.push(0);
            j++;
        } else{
            dates.push(fiKeys[j])
            ep.push(epValues[i]);
            fi.push(fiValues[j]);
            i++;
            j++;
        }
    }
    while(i < epKeys.length) {
        dates.push(epKeys[i])
        ep.push(epValues[i]);
        fi.push(0);
        i++;
    }
    while(j < fiKeys.length) {
        dates.push(fiKeys[j])
        ep.push(0);
        fi.push(fiValues[j]);
        j++;
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