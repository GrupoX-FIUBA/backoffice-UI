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

const getNewContentMetric = async() => {
    return {
        'dates': ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05', '2022-01-06', '2022-01-07'],
        'values': [10,0,10,5,30,40,30],
    }
}

const getByGenreMetric = async() => {
    return {
        "labels": ['pop', 'rock', 'jazz', 'alternative'],
        "values": [12,11,10,15]
    }
}

const getBySubscriptionMetric = async() => {
    return {
        "labels": ['regular', 'silver', 'gold'],
        "values": [12,11,10]
    }
}

module.exports = {
    getUserMetricSignUps,
    getUserMetricLogIns,
    getUserMetricBlocks,
    getUserMetricPasswordRecoveries,
    getTransactionMetric,
    getNewContentMetric,
    getByGenreMetric,
    getBySubscriptionMetric
}