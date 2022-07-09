import React from 'react'
import MainPage from '../../application/pages/public/MainPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faChartLine, faClipboardList, faMusic, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import UserPage from '../../application/pages/private/UserPage';
import PrivatePage from '../../application/pages/private/PrivatePage';
import ContentPage from '../../application/pages/private/ContentPage';
import UserMetricPage from '../../application/pages/private/UserMetricPage';
import TransactionMetricPage from '../../application/pages/private/TransactionMetricPage';
import ServicePage from '../../application/pages/private/ServicePage';

const Routes = [
	{
    title: "Login",
    path: "/",
    component: MainPage,
    type: 'public'
  },
  {
    title: "User Management",
    path: "/users",
    component: PrivatePage,
    children: UserPage,
    icon: <FontAwesomeIcon icon={faUserFriends}/>,
    type: 'private'
  },
  {
    title: "Content Management",
    path: "/content",
    component: PrivatePage,
    children: ContentPage,
    icon: <FontAwesomeIcon icon={faMusic}/>,
    type: 'private'
  },
  {
    title: "Service List",
    path: "/service",
    component: PrivatePage,
    children: ServicePage,
    icon: <FontAwesomeIcon icon={faClipboardList}/>,
    type: 'private'
  },
  {
    title: "Users",
    path: "/metrics/user",
    component: PrivatePage,
    children: UserMetricPage,
    icon: <FontAwesomeIcon icon={faChartLine}/>,
    type: 'metric'
  },
  {
    title: "Transactions",
    path: "/metrics/transactions",
    component: PrivatePage,
    children: TransactionMetricPage,
    icon: <FontAwesomeIcon icon={faChartColumn}/>,
    type: 'metric'
  }
];

export default Routes;