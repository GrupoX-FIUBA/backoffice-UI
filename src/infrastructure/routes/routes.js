import React from 'react'
import MainPage from '../../application/pages/public/MainPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faHome, faMusic, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import UserPage from '../../application/pages/private/UserPage';
import PrivatePage from '../../application/pages/private/PrivatePage';
import ContentPage from '../../application/pages/private/ContentPage';
import UserMetricPage from '../../application/pages/private/UserMetricPage';

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
    icon: <FontAwesomeIcon icon={faChartColumn}/>,
    type: 'metric'
  }
];

export default Routes;