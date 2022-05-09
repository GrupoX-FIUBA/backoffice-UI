import { faChartArea } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import PageCard from '../../components/Common/PageCard'
import Tabs from '../../components/Common/tabs/Tabs'
import ByGenreMetric from '../../components/Metrics/ByGenre';
import BySubscriptionMetric from '../../components/Metrics/BySubscription';
import ByUserMetric from '../../components/Metrics/ByUser';
import NewContentMetric from '../../components/Metrics/NewContent';

export default function ContentMetricPage() {
    const [selectedMetric, setSelectedMetric] = useState(0);
    const [loading, setLoading] = useState(false);

    const availableMetrics = [
        'New Content',
        'By genre',
        'By subscription',
        'By user',
    ]

    const generateView = () => {
        if(selectedMetric === 0) {
            return <NewContentMetric setClickable={() => setLoading(false)}/>
        }
        if(selectedMetric === 1) {
            return <ByGenreMetric setClickable={() => setLoading(false)}/>
        }
        if(selectedMetric === 2) {
            return <BySubscriptionMetric setClickable={() => setLoading(false)}/>
        }
        if(selectedMetric === 3) {
            return <ByUserMetric setClickable={() => setLoading(false)}/>
        }
    }

  return (
    <PageCard information={{pageName: 'Content Metrics', pageIcon: faChartArea}}>
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
