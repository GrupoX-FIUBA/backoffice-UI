const getUserMetricSignUps = async() => {
    return {
        "ep": 14,
        "fi": 2,
    }
}

const getUserMetricLogIns = async() => {
    return {
        'dates': ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05', '2022-01-06', '2022-01-07'],
        'ep': [10,10,10,20,30,40,30],
        'fi': [10,0,10,0,30,35,0],
    }
}

const getUserMetricBlocks = async() => {
    return {
        'enabled': 25,
        'disabled': 3,
    }
}

const getUserMetricPasswordRecoveries = async() => {
    return {
        'dates': ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05', '2022-01-06', '2022-01-07'],
        'values': [0,0,0,2,0,0,9],
    }
}

const getTransactionMetric = async() => {
    return {
        'months': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        'payment': [0,0,0,20,30],
        'raising': [0,0,0,0,30],
    }
}

module.exports = {
    getUserMetricSignUps,
    getUserMetricLogIns,
    getUserMetricBlocks,
    getUserMetricPasswordRecoveries,
    getTransactionMetric
}