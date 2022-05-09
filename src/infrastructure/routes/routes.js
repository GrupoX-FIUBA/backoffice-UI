import React from 'react'
import MainPage from '../../application/pages/public/MainPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faChartColumn, faChartLine, faMusic, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import UserPage from '../../application/pages/private/UserPage';
import PrivatePage from '../../application/pages/private/PrivatePage';
import ContentPage from '../../application/pages/private/ContentPage';
import UserMetricPage from '../../application/pages/private/UserMetricPage';
import TransactionMetricPage from '../../application/pages/private/TransactionMetricPage';
import ContentMetricPage from '../../application/pages/private/ContentMetricPage';

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
    title: "Users",
    path: "/metrics/user",
    component: PrivatePage,
    children: UserMetricPage,
    icon: <FontAwesomeIcon icon={faChartLine}/>,
    type: 'metric'
  },
  {
    title: "Content",
    path: "/metrics/content",
    component: PrivatePage,
    children: ContentMetricPage,
    icon: <FontAwesomeIcon icon={faChartArea}/>,
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