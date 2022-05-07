import { faChartColumn } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import PageCard from '../../components/Common/PageCard'
import Transaction from '../../components/Metrics/Transaction'

export default function TransactionMetricPage() {
  return (
    <PageCard information={{pageName: 'Transaction Metrics', pageIcon: faChartColumn}}>
        <div className="mx-4 mt-5">
            <Transaction/>    
        </div>
    </PageCard>
  )
}
