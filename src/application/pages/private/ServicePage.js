import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import PageCard from '../../components/Common/PageCard';
import Iframe from 'react-iframe';


export default function ServicePage() {
    return (
        <>
    <PageCard information={{pageName: 'Service Management', pageIcon: faClipboardList}}>
        <div className="mx-4">
            <Iframe url="https://status.spotifiuby.com.ar/"
            width="100%"
            height="1250px"
            id="myId"
            className="myClassname"
            display="block"
            position="relative"/>
        </div>
    </PageCard></>);
}
