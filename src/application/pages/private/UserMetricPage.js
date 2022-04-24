import { faChartColumn } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import PageCard from '../../components/Common/PageCard'
import Tabs from '../../components/Common/tabs/Tabs'
import Loader from '../../components/Loader/loader';
import BlockedsMetric from '../../components/Metrics/Blockeds';
import LogInsMetric from '../../components/Metrics/LogIns';
import PasswordRecoveriesMetric from '../../components/Metrics/Passwords';
import SignUpsMetric from '../../components/Metrics/SignUps';

export default function UserMetricPage() {
    const [selectedMetric, setSelectedMetric] = useState(0);
    const [loading, setLoading] = useState(false);

    const availableMetrics = [
        'Sign up\'s',
        'Log in\'s',
        'Blocked Users',
        'Password Recoveries',
    ]

    const generateView = () => {
        if(loading) {
            return <Loader/>
        }
        if(selectedMetric === 0) {
            return <SignUpsMetric/>
        }
        if(selectedMetric === 1) {
            return <LogInsMetric/>
        }
        if(selectedMetric === 2) {
            return <BlockedsMetric/>
        }
        if(selectedMetric === 3) {
            return <PasswordRecoveriesMetric/>
        }
    }

  return (
    <PageCard information={{pageName: 'User Metrics', pageIcon: faChartColumn}}>
        <div className="mx-4">
            <Tabs
            items={availableMetrics}
            selected={selectedMetric}
            setSelected={setSelectedMetric}
            clickable={!loading}
            />
        </div>
        <div className="mx-4 mt-5">{generateView()}</div>
    </PageCard>
  )
}
